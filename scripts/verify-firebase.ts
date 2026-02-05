import { db } from '../src/config/firebase';

async function verifyConnection() {
    console.log('Testing Firebase connection...');
    try {
        const collections = await db.listCollections();
        console.log('✅ Successfully connected to Firestore!');
        console.log('Collections found:', collections.map(c => c.id).join(', ') || 'None (Database is empty)');
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Failed to connect to Firebase.');
        console.error('Error details:', error.message);
        console.log('\nPossible causes:\n1. serviceAccountKey.json is missing or invalid.\n2. Firestore API is not enabled in Google Cloud Console.\n3. Internet connection issues.');
        process.exit(1);
    }
}

verifyConnection();
