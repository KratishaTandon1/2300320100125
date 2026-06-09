// This token will be updated later with the real one
let authToken = 'cXuqht';

export const setAuthToken = (token: string) => {
  authToken = token;
};

// Allowed values based on constraints
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
    const res = await fetch('http://4.224.186.213/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // just log locally if API fails (like 401)
      console.warn('Logging API failed:', res.status);
      console.log('Local log fallback:', payload);
    }
  } catch (err) {
    console.error('Error calling log API:', err);
    console.log('Local log fallback:', payload);
  }
};
