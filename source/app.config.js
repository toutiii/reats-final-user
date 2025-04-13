export default {
    expo: {
        name: "reats-final-users",
        slug: "reats-final-users",
        version: "0.1.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
            url: "https://u.expo.dev/81a0c325-ea81-4c9b-a0ae-51531b911375",
        },
        runtimeVersion: {
            policy: "appVersion",
        },
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.reats.finalusers",
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#FFFFFF",
            },
            package: "com.reats.finalusers",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        plugins: [
            "expo-secure-store"
        ],
        extra: {
            eas: {
                projectId: "81a0c325-ea81-4c9b-a0ae-51531b911375",
            },
            ENV: process.env.ENV,
            apiBaseUrl:
        process.env.EXPO_PUBLIC_PRODUCTION_API_BASE_URL ??
        process.env.EXPO_PUBLIC_STAGING_API_BASE_URL ??
        process.env.EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL,
            apiKeyBackend:
        process.env.PRODUCTION_API_KEY ??
        process.env.STAGING_API_KEY ??
        process.env.DEVELOPMENT_API_KEY,
            appOriginHeader: process.env.EXPO_PUBLIC_APP_ORIGIN,
        },
        newArchEnabled: true,
    },
};
