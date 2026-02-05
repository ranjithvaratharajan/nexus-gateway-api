import app from '../app';
import http from 'http';

const runVerification = async () => {
    const server = http.createServer(app);
    const port = 3001; // Use a different port for testing

    server.listen(port, async () => {
        console.log(`Test server running on port ${port}`);

        const baseUrl = `http://localhost:${port}/api/v1/flowminds`;

        try {
            // Test 1: Check Quota
            console.log('\n--- Test 1: Check Initial Quota ---');
            const quotaRes = await fetch(`${baseUrl}/quota`);
            const quota = await quotaRes.json();
            console.log('Quota:', quota);
            if (quota.remaining !== 50) throw new Error(`Expected 50 remaining, got ${quota.remaining}`);

            // Test 2: Consume Requests
            console.log('\n--- Test 2: Consume 50 Requests ---');
            // Mocking the behavior by directly calling generate 50 times
            // Note: Since we don't passed a real API key, the controller might fail, 
            // BUT the middleware runs BEFORE the controller. 
            // However, to trigger the middleware completely, simply hitting the endpoint is enough.
            // Even if it returns 500 or 401 later, the rate limiter middleware should have counted it.
            // Wait, middleware calls next() which goes to controller.
            // If controller errors out, the request is still counted because middleware incremented it before next().

            for (let i = 0; i < 50; i++) {
                const res = await fetch(`${baseUrl}/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: 'test' })
                });
                process.stdout.write('.');
            }
            console.log('\nDone consuming.');

            // Test 3: Check Quota again
            console.log('\n--- Test 3: Check Quota (Should be 0) ---');
            const quotaRes2 = await fetch(`${baseUrl}/quota`);
            const quota2 = await quotaRes2.json();
            console.log('Quota:', quota2);
            if (quota2.remaining !== 0) throw new Error(`Expected 0 remaining, got ${quota2.remaining}`);

            // Test 4: Verify 429
            console.log('\n--- Test 4: Verify 429 on 51st Request ---');
            const res429 = await fetch(`${baseUrl}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: 'test' })
            });
            console.log('Status:', res429.status);

            if (res429.status !== 429) {
                const body = await res429.json();
                console.log('Body:', body);
                throw new Error(`Expected 429, got ${res429.status}`);
            }
            console.log('Confirmed 429 response.');

            console.log('\n✅ VERIFICATION SUCCESSFUL');

        } catch (error) {
            console.error('\n❌ VERIFICATION FAILED:', error);
        } finally {
            server.close();
            process.exit(0);
        }
    });
};

runVerification();
