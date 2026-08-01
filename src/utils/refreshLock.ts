// Currently not in use will look for it...
const inFlight = new Map<string, Promise<any>>();

/**
 * Ensures only ONE refresh runs per userId at a time.
 * NOTE: This is in-memory — works for a single Node process.
 * For serverless/multi-instance deployments, replace with a
 * distributed lock (Redis SETNX, etc.)
 */
export async function withRefreshLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
    if (inFlight.has(key)) {
        return inFlight.get(key)!;
    }

    const promise = fn().finally(() => {
        inFlight.delete(key);
    });

    inFlight.set(key, promise);
    return promise;
}
