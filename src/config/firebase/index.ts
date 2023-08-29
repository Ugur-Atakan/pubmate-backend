import * as dotenv from 'dotenv';

dotenv.config();
const config = {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
  FIREBASE_PRIVATEKEY: process.env.FIREBASE_PRIVATEKEY!,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL!,
};

export default config;
