const env = process.env.REACT_APP_ENV;

let config = {
    baseURL: "http://localhost:3000"
}

if (env) {
    switch (env.toUpperCase()) {
        case "STAGE":
            config.baseURL = "Staging Environment";
            break;

        case "PRODUCTION":
            config.baseURL = "Production Environment";
            break;
    }
}

export default config;