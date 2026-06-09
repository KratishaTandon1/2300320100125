export declare const setAuthToken: (token: string) => void;
type StackType = 'backend' | 'frontend';
type LevelType = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type PackageType = 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' | 'handler' | 'repository' | 'route' | 'service' | 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';
export declare const Log: (stack: StackType, level: LevelType, pkg: PackageType, message: string) => Promise<void>;
export {};
