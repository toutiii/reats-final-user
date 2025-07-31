export const ENV = process.env.ENV;

export const apiBaseUrl =
  ENV === "production"
      ? process.env.EXPO_PUBLIC_PRODUCTION_API_BASE_URL
      : ENV === "staging"
          ? process.env.EXPO_PUBLIC_STAGING_API_BASE_URL
          : process.env.EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL;

export const apiKeyBackend =
  ENV === "production"
      ? process.env.EXPO_PUBLIC_PRODUCTION_API_KEY
      : ENV === "staging"
          ? process.env.EXPO_PUBLIC_STAGING_API_KEY
          : process.env.EXPO_PUBLIC_DEVELOPMENT_API_KEY;

export const appOriginHeader = "customer";

export const port = process.env.EXPO_PUBLIC_DEVELOPMENT_API_PORT;