import * as admin from 'firebase-admin';
import * as path from 'path';

// Construct path to serviceAccountKey.json
// It is expected to be in the project root
const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(require(serviceAccountPath))
    });
    console.log('Firebase Admin Initialized');
} catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
}

export const db = admin.firestore();
