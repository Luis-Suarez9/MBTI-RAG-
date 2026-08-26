/**
 * accessToken.ts
 *
 * Short-lived, one-time access token for the /test-detail/[id] route.
 *
 * The token is stored as a plain (non-HttpOnly) browser cookie so that
 * Next.js Edge Middleware can read it and enforce access BEFORE the page
 * is rendered. The cookie is:
 *   - Scoped to path=/test-detail  (never sent to other routes)
 *   - SameSite=Strict              (no cross-site leakage)
 *   - max-age=10                   (expires in 10 seconds)
 *
 * The middleware consumes the cookie on the first valid request by setting
 * max-age=0 on the response, so a page refresh is also blocked.
 */

/**
 * Grant a one-time access token for a specific test-detail record.
 * Call this right before `router.push('/test-detail/<id>')`.
 */
export function grantTestDetailAccess(id: number): void {
  if (typeof document === 'undefined') return; // SSR safety
  document.cookie = `tda=${id}:${Date.now()}; max-age=10; path=/test-detail; SameSite=Strict`;
}

/**
 * Manually clear the access token (e.g. if navigation is cancelled).
 * The middleware also strips it automatically on the first successful pass.
 */
export function clearTestDetailAccess(): void {
  if (typeof document === 'undefined') return;
  document.cookie = 'tda=; max-age=0; path=/test-detail; SameSite=Strict';
}
