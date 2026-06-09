let authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrcmF0aXNoYS4yM2IwMTAxMjkzQGFiZXMuYWMuaW4iLCJleHAiOjE3ODA5OTAyMTMsImlhdCI6MTc4MDk4OTMxMywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjA4MzEyZDg5LWFhMTktNGJkOS04ODE5LTFmMWNiYTY5YmZjMCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtyYXRpc2hhIHRhbmRvbiIsInN1YiI6ImFmMzQwNDRiLTEyOGUtNGNmOC1hY2JjLWQzMmMwYzY4MDIzOSJ9LCJlbWFpbCI6ImtyYXRpc2hhLjIzYjAxMDEyOTNAYWJlcy5hYy5pbiIsIm5hbWUiOiJrcmF0aXNoYSB0YW5kb24iLCJyb2xsTm8iOiIyM2IwMTAxMjkzIiwiYWNjZXNzQ29kZSI6ImNYdXFodCIsImNsaWVudElEIjoiYWYzNDA0NGItMTI4ZS00Y2Y4LWFjYmMtZDMyYzBjNjgwMjM5IiwiY2xpZW50U2VjcmV0IjoiVWRicGpwTnRQeHNiU3lydiJ9.6GZFJXEt7TNo2u4zmqq735Fjrnkr2iiC66Uz-r-a-Iw';
export const setAuthToken = (token: string) => {
  authToken = token;
};
type StackType = 'backend' | 'frontend';
type LevelType = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type PackageType = 
  | 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' 
  | 'handler' | 'repository' | 'route' | 'service' // backend only
  | 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' // frontend only
  | 'auth' | 'config' | 'middleware' | 'utils'; // both
export const Log = async (
  stack: StackType,
  level: LevelType,
  pkg: PackageType,
  message: string
) => {
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
  } catch (err) {
    console.log('Log API fallback (network issue):', err instanceof Error ? err.message : String(err));
    console.log('Local log fallback payload:', payload);
  }
};
