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

  
            for (const s of user.steps || []) {
                if (!s?.value) continue;

                if (s.step === 1) {
                    myGender = s.value.role;
                    lookForGender = s.value.lookingFor;
                    relationship = s.value.relationshipStatus;
                }
                if (s.step === 2) {
                    country = s.value.country;
                    city = s.value.city;
                }
                if (s.step === 3) {
                    hobbies = s.value.hobbies || [];
                    interests = s.value.interests || [];
                }
                if (s.step === 4) handicap = s.value.handicap;
                if (s.step === 6) horoscope = s.value.horoscope;
                if (s.step === 7) availableForHiring = s.value.availableForHiring;
                if (s.step === 10) persona = s.value.whichOneAreYou;
            }

            const conditions: any[] = [];
            conditions.push({ _id: { $ne: user._id } });

            if (myGender || lookForGender) {
                const step1Query: any = { step: 1 };

                console.log("step1Query", step1Query)

                if (lookForGender) step1Query["value.role"] = lookForGender;
                if (myGender) step1Query["value.lookingFor"] = myGender;

                conditions.push({ steps: { $elemMatch: step1Query } });
            }
            if (hobbies.length > 0 || interests.length > 0) {
                const step3Query: any = { step: 3 };

                if (hobbies.length > 0) {
                    step3Query["value.hobbies"] = { $in: hobbies };
                }
                if (interests.length > 0) {
                    step3Query["value.interests"] = { $in: interests };
                }
                conditions.push({ steps: { $elemMatch: step3Query } });
            }


            if (handicap) {
                conditions.push({
                    steps: { $elemMatch: { step: 4, "value.handicap": handicap } }
                });
            }
            if (horoscope && HOROSCOPE_COMPATIBILITY[horoscope]) {
                const compatibleSigns = HOROSCOPE_COMPATIBILITY[horoscope];

                conditions.push({
                    steps: {
                        $elemMatch: {
                            step: 6,
                            "value.horoscope": { $in: compatibleSigns }
                        }
                    }
                });
            }
            if (persona) {
                conditions.push({
                    steps: {
                        $elemMatch: {
                            step: 10,
                            "value.whichOneAreYou": persona
                        }
                    }
                });
            }
         
            let matchesQuery :any;
            if(conditions.length === 0){
                matchesQuery = {_id:{$ne:user._id}}
            }
            else{
                matchesQuery ={
                    _id:{$ne:user._id},
                    $and:conditions
                };
            }

            console.log("Final Query:", JSON.stringify(matchesQuery, null, 2));
            const matches = await User.find(matchesQuery).select("fullName userName dob steps").lean();
            console.log("matches", matches);
            console.log("length", matches.length);
            const formattedMatches = matches.map((m) => {
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
                    steps: m.steps
                };
            });
            return commonUtils.sendSuccessResponse(req, res, appStrings.MATCHES_FETCHED_SUCCESSFULLY, formattedMatches);
    
    } catch (err: any) {
        return commonUtils.sendErrorResponse(req, res, err.message, null, 500);
    }
};
export default { homeScreen };
