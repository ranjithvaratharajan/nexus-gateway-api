import * as admin from 'firebase-admin';
import * as path from 'path';

// Construct path to serviceAccountKey.json
// It is expected to be in the project root
const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');

const getCredentials = () => {
    // 1. Try environment variable (best for production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            return admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
        } catch (e) {
            console.error('Error parsing FIREBASE_SERVICE_ACCOUNT env var');
        }
    }

    // 2. Fallback to local file
    try {
        return admin.credential.cert(require(serviceAccountPath));
    } catch (e) {
        console.error('serviceAccountKey.json not found or invalid');
        return null;
    }
};

const credentials = getCredentials();

if (credentials) {
    try {
        admin.initializeApp({ credential: credentials });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

// Fallback to a proxy or notify if not initialized
export const db = admin.firestore();
