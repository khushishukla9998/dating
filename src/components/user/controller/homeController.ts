import User from '../modal/userModal';
import { Request, Response } from 'express';
import Enum from '../../utils/enum';
import commonUtils from '../../utils/commonUtils';
import appStrings from '../../utils/appString';

const HOROSCOPE_COMPATIBILITY: Record<string, string[]> = {
    [Enum.HOROSCOPE.ARIES]: [Enum.HOROSCOPE.LEO, Enum.HOROSCOPE.SAGITTARIUS],
    [Enum.HOROSCOPE.TAURUS]: [Enum.HOROSCOPE.VIRGO, Enum.HOROSCOPE.CAPRICORN],
    [Enum.HOROSCOPE.GEMINI]: [Enum.HOROSCOPE.LIBRA, Enum.HOROSCOPE.AQUARIUS],
    [Enum.HOROSCOPE.CANCER]: [Enum.HOROSCOPE.SCORPIO, Enum.HOROSCOPE.PISCES],
    [Enum.HOROSCOPE.LEO]: [Enum.HOROSCOPE.ARIES, Enum.HOROSCOPE.SAGITTARIUS],
    [Enum.HOROSCOPE.VIRGO]: [Enum.HOROSCOPE.TAURUS, Enum.HOROSCOPE.CAPRICORN],
    [Enum.HOROSCOPE.LIBRA]: [Enum.HOROSCOPE.GEMINI, Enum.HOROSCOPE.AQUARIUS],
    [Enum.HOROSCOPE.SCORPIO]: [Enum.HOROSCOPE.CANCER, Enum.HOROSCOPE.PISCES],
    [Enum.HOROSCOPE.SAGITTARIUS]: [Enum.HOROSCOPE.ARIES, Enum.HOROSCOPE.LEO],
    [Enum.HOROSCOPE.CAPRICORN]: [Enum.HOROSCOPE.TAURUS, Enum.HOROSCOPE.VIRGO],
    [Enum.HOROSCOPE.AQUARIUS]: [Enum.HOROSCOPE.GEMINI, Enum.HOROSCOPE.LIBRA],
    [Enum.HOROSCOPE.PISCES]: [Enum.HOROSCOPE.CANCER, Enum.HOROSCOPE.SCORPIO]
};

const homeScreen = async (req: Request, res: Response) => {
    try {
        const userId = req.userId || req.body.userId;
        
        if (!userId) {
            return commonUtils.sendErrorResponse(req, res, appStrings.INVALID_USER_ID, null, 400);
        }

        const user = await User.findById(userId).lean();
        if (!user) {
            return commonUtils.sendErrorResponse(req, res, appStrings.USER_NOT_FOUND, null, 404);
        }

        let persona, handicap, myGender, lookForGender, relationship, horoscope, availableForHiring, country, city;
        let hobbies: string[] = [];
        let interests: string[] = [];

        // Extract user preferences based on filled steps
        for (const s of user.steps || []) {
            if (s.step === 1 && s.value) {
                myGender = s.value.role;
                lookForGender = s.value.lookingFor;
                // Ignored relationship for now or you can keep it mapping exactly
                relationship = s.value.relationshipStatus;
            }
            if (s.step === 2 && s.value) {
                country = s.value.country;
                city = s.value.city;
            }
            if (s.step === 3 && s.value) {
                hobbies = s.value.hobbies || [];
                interests = s.value.interests || [];
            }
            if (s.step === 4 && s.value) handicap = s.value.handicap;
            if (s.step === 6 && s.value) horoscope = s.value.horoscope;
            if (s.step === 7 && s.value) availableForHiring = s.value.availableForHiring;
            if (s.step === 10 && s.value) persona = s.value.whichOneAreYou;
        }

        const conditions: any[] = [
            { _id: { $ne: user._id } }
        ];

        // 1. Demon gets Demon, Angel gets Angel
        if (persona) {
            conditions.push({
                steps: { $elemMatch: { step: 10, "value.whichOneAreYou": persona } }
            });
        }

        // 2. Handicap gets other handicap people
        if (handicap) {
            conditions.push({
                steps: { $elemMatch: { step: 4, "value.handicap": handicap } }
            });
        }

        // 3 & 4. Cross-gender matching
        if (myGender || lookForGender) {
            const step1Query: any = { step: 1 };
            if (lookForGender) step1Query["value.role"] = lookForGender;
            if (myGender) step1Query["value.lookingFor"] = myGender;
            conditions.push({ steps: { $elemMatch: step1Query } });
        }

        // 5. Hobbies and interests should match at least one
        if (hobbies.length > 0) {
            conditions.push({ steps: { $elemMatch: { step: 3, "value.hobbies": { $in: hobbies } } } });
        }
        if (interests.length > 0) {
            conditions.push({ steps: { $elemMatch: { step: 3, "value.interests": { $in: interests } } } });
        }

        // 6. Horoscope compatibility
        if (horoscope && HOROSCOPE_COMPATIBILITY[horoscope]) {
            const compatibleSigns = HOROSCOPE_COMPATIBILITY[horoscope];
            conditions.push({
                steps: { $elemMatch: { step: 6, "value.horoscope": { $in: compatibleSigns } } }
            });
        }

        // 7. Hiring logic 
        // (Location filtering removed: country can be anywhere)
        if (availableForHiring) {
            // Add any other specific hiring logic here if needed
            // Currently, no location constraints apply.
        }

        // Find matches and select required fields
        const matchesQuery = conditions.length > 1 ? { $and: conditions } : conditions[0];
        const matches = await User.find(matchesQuery).select("fullName userName DOb steps").lean();

        // Format to show age, name, and basic details
        const formattedMatches = matches.map(m => {
            let age = null;
            if (m.DOb) {
                const diff = Date.now() - new Date(m.DOb).getTime();
                age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
            }
            return {
                _id: m._id,
                fullName: m.fullName,
                userName: m.userName,
                age: age,
                steps: m.steps // basic details stored in steps
            };
        });

        return commonUtils.sendSuccessResponse(req, res, appStrings.MATCHES_FETCHED_SUCCESSFULLY, formattedMatches);

    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};

export default { homeScreen };
