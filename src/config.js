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

const DEFAULT_API_BASE_URL = "http://localhost:4000";

const getAPIUrl = () =>
    process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL;
const config = {
    GET_ENVIRONMENT: getEnvironment(),
    BASE_URL: getAPIUrl(),
};

export default config;