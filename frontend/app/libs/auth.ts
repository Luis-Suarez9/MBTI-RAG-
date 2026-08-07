// frontend/app/libs/auth.ts
import { AuthUser } from '@/types/AuthUser';
export type { AuthUser };

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5175';
const USER_KEY = 'mbti_user';

/**
 * Exchange a Google idToken with your Express backend. The backend stores the
 * JWT in an HttpOnly cookie; only the non-sensitive user profile is persisted.
 */
export async function loginWithGoogle(idToken: string): Promise<AuthUser> {
  const res = await fetch(`${BACKEND_URL}/api/users/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Google auth failed');
  }

  const data = await res.json();

  // Persist
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data.user as AuthUser;
}

/** Get the stored user object */
export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

/** Clear the server session cookie and the locally cached display profile. */
export async function logout(): Promise<void> {
  try {
    await fetch(`${BACKEND_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    localStorage.removeItem(USER_KEY);
  }
}

/** True if a locally cached profile exists. Protected API routes enforce the session cookie. */
export function isAuthenticated(): boolean {
  return !!getUser();
}
