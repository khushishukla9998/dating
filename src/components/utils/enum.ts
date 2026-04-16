const Enum = {

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

    ADULT: {
        YES: 1,
        NO: 0
    },
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
    },

    INTRESTS: {
        Foodie: "Foodie Tour",
        BROADWY: "Broadway",
        FAISHION: "Fashion",
        SOCIAL: "Social Development",
        BOXING: "Boxing",
        SAKE: "Sake",
        CAFE: "Escape Cafe",
        ENV_PROTECTION: "Environmental Protection",
        REGGATON: "Reggaton",
        MAKEUP: "Makeup",
        SPORTS: "Motor Sports",
        PILATES: "Pilates",
        WERSTIING: "Wrestiing",
        GAMES: "Online Game",
        OUTING: "Working Out",
        KOREAN_FOOD: "Korean Food",
        DRAWIMG: "Drawing",
        PICKNICK: "Picnicking",
        MOTORCYCLE: "Motorcycles",
        VLOGGING: "Vlogging",
        DISNEY: "Disney",
        PIMMS: "Pimms",
        OTHER: "Other"
    },

    HOBBIES: {
        TREVELING: "Traveling",
        BUILDING: "Airplane Model Building",
        ART: "Art",
        BAKING: "Baking",
        DANCE: "Dance",
        ACTING: "Acting",
        LEARNING: "Learning",
        PHOTOGRAPHY: "Photography",
        BOXING: "Boxing",
        KNITTING: "Knitting",
        WRITTING: "Writing",
        GARDENING: "Gardening",
        COOCKING: "Cooking",
        OTHER: "Other"
    },
    HANDICAP: {
        YES: "yes",
        NO: "no"
    },

    ETHNICITY: {
        AFRICAN: "African",
        ASIAN: "Asian",
        EUROPEAN: "European",
        LATINO: "Hispanic/ Latino",
        MID_EASTERN: "Middle Eastern",
        AMERICAN: "Native American",
        ISLAMDER: "Pacific Islander",
        SOUTH_ASIAN: "South Asian",
        CAUCASIAN: "Caucasian",
        OTHER: "Other",
    },

    CATEGORY: {
        WEDDING: 'Wedding',
        BIRTHDAY: "Birthday",
        PARTIES: "Parties",
        CINEMA: 'Cinema',
        CONCERT: 'Concert',
        WALKING: 'Walking',
        DINNER: 'Dinner',
        COFFEE: "Coffee",
        CULTURAL_EVENTS: "Cultural event",
        EXHIBITION: 'Sports eventArt exhibition',
        MUSEUM: 'Museum',
        PARK: "Theme park",
        FESTIVAL: "Festival",
        ROAD_TRIP: "Road trip",
        SHOPPING: "Shopping trip",
        BEACH: "Beach or nature trip",
        WINE: "Wine tasting events",
        CHARITY: "Charity event",
        ADVENTURE: "Adventure sports",
        CLUB: "Book clubs or literary events",
        COOKING: "Cooking or baking classes",
        MEDIA: "Media ",
        TECHNOLOGY_EXHIBITION: "Science or technology exhibitions",
        SINGING_EVENTS: "Karaoke or singing events",
        NIGHT_GAMING: "Board game nights",
        TREVELING: 'Travel with me',
        CULTURAL_FOODS: "Cultural food or drink events",
        OTHER: "Other",
    },
    LIKE: {
        LIKE: 1,
        UNLIKED: 0
    },
    MATCHES: {
        MATCH: 1,
        UNMATCH: 0
    },
    VIEW: {
        VIEW: 1,
        UNVIEW: 0
    },
    PANIC_MODE: {
        ON: 1,
        OFF: 0
    },
    RESPONSE: {
        ACCEPT: 1,
        REJECT: 0
    },
    RATING_STATUS:{
        COMPLETED:1,
        NOT_COMPLETED:0
    }

}
export default Enum