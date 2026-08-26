/**
 * middleware.ts  —  Next.js Edge Middleware
 *
 * Protects /test-detail/[id] with a short-lived, one-time access token.
 *
 * The token (cookie name: "tda") is set by the browser via accessToken.ts
 * immediately before router.push() is called from:
 *   - /modules-test  (Submit Results button)
 *   - /result-history (VIEW DETAIL button)
 *
 * Validation rules:
 *   1. The "tda" cookie must exist.
 *   2. Its value must be "<id>:<issuedAtMs>".
 *   3. The id in the cookie must match the :id segment of the URL.
 *   4. The token must have been issued within the last 10 seconds.
 *
 * On a valid token  → allow the request and STRIP the cookie (max-age=0)
 *                     so that a page refresh is also blocked.
 * On an invalid token → redirect to "/" (home page).
 *
 * No authentication is checked here — non-authenticated users are fully
 * supported so they can view their own freshly-computed result.
 */

import { NextRequest, NextResponse } from 'next/server';

const TOKEN_MAX_AGE_MS = 10_000; // 10 seconds — matches cookie max-age

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Extract the numeric id from /test-detail/<id>
  const match = pathname.match(/^\/test-detail\/(\d+)/);
  if (!match) {
    // Should never happen given the matcher config, but fail-safe.
    return NextResponse.redirect(new URL('/', request.url));
  }
  const urlId = match[1]; // string

  // Check if user is authenticated (session cookie present).
  // Authenticated users don't need a one-time token; backend strictly checks record ownership.
  const hasSession =
    Boolean(request.cookies.get('mbti_session')?.value) ||
    Boolean(request.cookies.get('__Host-mbti_session')?.value);

  if (hasSession) {
    return NextResponse.next();
  }

  // For non-authenticated (guest) users, require a valid short-lived tda cookie
  const tda = request.cookies.get('tda')?.value ?? '';

  // Validate format: "<id>:<issuedAtMs>"
  const parts = tda.split(':');
  const cookieId = parts[0];
  const issuedAt = Number(parts[1]);

  const isValid =
    parts.length === 2 &&
    cookieId === urlId &&
    !isNaN(issuedAt) &&
    Date.now() - issuedAt <= TOKEN_MAX_AGE_MS;

  if (!isValid) {
    // Unauthorised direct navigation — bounce to home.
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Token is valid: allow through and consume it so refresh is blocked.
  const response = NextResponse.next();
  // Strip the cookie on the response (browser will delete it).
  response.cookies.set('tda', '', {
    path: '/test-detail',
    maxAge: 0,
    sameSite: 'strict',
  });
  return response;
}

export const config = {
  // Only run this middleware on /test-detail/<numeric-id> paths.
  matcher: ['/test-detail/:id*'],
};
