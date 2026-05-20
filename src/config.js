const getEnvironment = () => {
    switch (process.env.NEXT_PUBLIC_PROJECT_ENV) {
        case "production":
            return "production";
        case "staging":
            return "staging";
        case "development":
            return "development";
        default:
            return "development";
    }
};

const getAPIUrl = () => {
    switch (process.env.NEXT_PUBLIC_PROJECT_ENV) {
        case "production":
            return process.env.NEXT_PUBLIC_BASE_URL;
        case "staging":
            return process.env.NEXT_PUBLIC_BASE_URL;
        case "development":
            return process.env.NEXT_PUBLIC_BASE_URL;
        default:
            return process.env.NEXT_PUBLIC_BASE_URL;
    }
};

const config = {
    GET_ENVIRONMENT: getEnvironment(),
    BASE_URL: getAPIUrl(),
};

export default config;