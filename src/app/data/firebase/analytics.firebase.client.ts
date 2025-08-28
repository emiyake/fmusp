import {
  type AnalyticsSettings,
  type CustomParams,
  initializeAnalytics,
  logEvent as logFirebaseEvent,
  setUserId as setFirebaseUserId,
  setUserProperties as setFirebaseUserProperties,
} from 'firebase/analytics';
import { firebaseApp } from './firebase.client';
import { formatName, formatParams } from './firebase.mapper';

const EVENT_NAME_MAX_LENGTH = 40;

const EVENT_PARAM_MAX_LENGTH = { name: 40, value: 100 };
const USER_PROPERTIES_MAX_LENGTH = { name: 24, value: 36 };

const analyticsSettings: AnalyticsSettings = {
  config: {
    send_page_view: false,
  },
};

const client = initializeAnalytics(firebaseApp, analyticsSettings);

const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  const name = formatName(eventName, EVENT_NAME_MAX_LENGTH);
  const params = eventParams && formatParams(eventParams, EVENT_PARAM_MAX_LENGTH);

  logFirebaseEvent(client, name, params);
};

const setUserId = (id: string | null) => {
  setFirebaseUserId(client, id);
};

const setUserProperties = (eventProperties: CustomParams) => {
  const properties = formatParams(eventProperties, USER_PROPERTIES_MAX_LENGTH);

  setFirebaseUserProperties(client, properties);
};

export const firebaseAnalyticsClient = {
  client,
  logEvent,
  setUserId,
  setUserProperties,
};
