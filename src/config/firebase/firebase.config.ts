import config from '.';
import firebaseAdmin from 'firebase-admin';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    projectId: config.FIREBASE_PROJECT_ID,
    clientEmail: config.FIREBASE_CLIENT_EMAIL,
    privateKey: config.FIREBASE_PRIVATEKEY,
  }),
  storageBucket: 'gs://pubmatedb.appspot.com/',
});

const firebaseMessaging = firebaseAdmin.messaging(firebaseAdmin.app());
export const bucket = firebaseAdmin.storage().bucket();
export default firebaseMessaging;
