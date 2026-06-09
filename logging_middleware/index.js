let authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ0YW5kb25rcmF0aXNoYUBnbWFpbC5jb20iLCJleHAiOjE3ODA5ODY5OTcsImlhdCI6MTc4MDk4NjA5NywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjU2MmE4NWZiLWJiYjgtNGRhMS1iODI5LTQ0ODUyMGJjMjE0OSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtyYXRpc2hhIHRhbmRvbiIsInN1YiI6IjkzZWU4YmIzLTY5ZWItNDgzNi1hZjc1LTk1OGQ2MjVhYWQzNiJ9LCJlbWFpbCI6InRhbmRvbmtyYXRpc2hhQGdtYWlsLmNvbSIsIm5hbWUiOiJrcmF0aXNoYSB0YW5kb24iLCJyb2xsTm8iOiIyMzAwMzIwMTAwMTI1IiwiYWNjZXNzQ29kZSI6ImNYdXFodCIsImNsaWVudElEIjoiOTNlZThiYjMtNjllYi00ODM2LWFmNzUtOTU4ZDYyNWFhZDM2IiwiY2xpZW50U2VjcmV0IjoiVVhCZ2ZXdG1iaFBrdUVLTSJ9.FWqZcL9j9b-NzEAl-zOUbKphwlUFDXeeCmTCAwrmVFQ';
export const setAuthToken = (token) => {
    authToken = token;
};
export const Log = async (stack, level, pkg, message) => {
    const payload = {
        stack,
        level,
        package: pkg,
        message
    };
    try {
        const res = await fetch('/api/proxy/evaluation-service/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            console.warn('Logging API failed:', res.status);
            console.log('Local log fallback:', payload);
        }
    }
    catch (err) {
        console.log('Log API fallback (network issue):', err instanceof Error ? err.message : String(err));
        console.log('Local log fallback payload:', payload);
    }
};
