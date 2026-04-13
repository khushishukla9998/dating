const Enum  = {

    STATUS: {
        ACTIVE: 1,
        INACTIVE: 0
    },

    IS_DELETED: {
        DELETED: 0,
        NOT_DELETED: 1
    },

    ACCOUNT_VERIFIED: {
        YES: 1,
        NO: 0
    },

    IS_REQUIRED: {
        YES: 1,
        NO: 0
    },
    LEAVE_STATUS: {
        APPROVED: 1,
        REJECTED: 2,
        PENDING: 0,
    },

    USER_STATUS: {
        ACTIVE: 1,
        BANNED: 0
    },
    // ACCOUNT_VERIFIED_STATUS: {
    //     PENDING: 0,
    //     VERIFIED: 1,
    //     REJECTED: 2
    // },

    STEP_VERIFIED_STATUS: {
        SUCCESS: 1,
        PENDING: 0
    },

    STEP_STATUS: {
        ACTIVE: 1,
        INACTIVE: 0
    },


    LEAVE_TYPE: {
        VACATION: 1,
        PERSONAL: 2
    },


    // APPOINTMENT_STATUS: {
    //     UPCOMING: 6,
    //     ONGOING: 5,
    // ...
    // }

    ROLE: {
        WOMEN: 'Women',
        MEN: 'Men',
        TRANS: 'Trans',
        UNSURE: 'Unsure',
    },
    RELATIONSHIP_STATUS: {
        SINGLE: 'Single',
        COMMITTED: 'Committed',
        MARRIED: 'Married',
        COMMITTED_BUT_LOOKING: 'Committed but Looking',
        MARRIED_BUT_LOOKING: 'Married but Looking',
    },
    CHILDREN_STATUS: {
        NO_KIDS_MIGHT_WANT: "Doesn't have kids but might want them",
        NO_KIDS_DONT_WANT: "Doesn't have kids and doesn't want them",
        HAS_KIDS_MIGHT_WANT: "Has kids and might want more",
        HAS_KIDS_DONT_WANT: "Has kids and doesn't want more",
        UNSURE: "Unsure"
    },
    PERSONA: {
        ANGEL: "Angel",
        DEMON: "Demon"
    },
    HOROSCOPE: {
        ARIES: "Aries",
        TAURUS: "Taurus",
        GEMINI: "Gemini",
        CANCER: "Cancer",
        LEO: "Leo",
        VIRGO: "Virgo",
        LIBRA: "Libra",
        SCORPIO: "Scorpio",
        SAGITTARIUS: "Sagittarius",
        CAPRICORN: "Capricorn",
        AQUARIUS: "Aquarius",
        PISCES: "Pisces"
    },
    SEXUAL_ORIENTATION: {
        STRAIGHT: "Straight",
        GAY: "Gay",
        LESBIAN: "Lesbian",
        BISEXUAL: "Bisexual",
        ASEXUAL: "Asexual",
        DEMISEXUAL: "Demisexual",
        PANSEXUAL: "Pansexual",
        QUEER: "Queer",
        QUESTIONING: "Questioning",
        AROMANTIC: "Aromantic"
    }

}
export default Enum