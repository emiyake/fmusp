/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PORT: string;
  readonly VITE_HOST: string;
  readonly VITE_USE_SSL: string;
  readonly VITE_ENV: string;
  readonly VITE_NODE_ENV: string;
  readonly VITE_ENV_LOG: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_SSR_ASSETS_MAXAGE: string;
  readonly VITE_SSR_TIMEOUT: string;
  readonly VITE_GOOGLE_ANALYTICS_TRACKING_ID: string;
  readonly VITE_VAPID_PUBLIC_KEY: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
