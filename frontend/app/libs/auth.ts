// frontend/app/libs/auth.ts
import { AuthUser } from '@/types/AuthUser';
export type { AuthUser };

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5175';
const TOKEN_KEY = 'mbti_token';
const USER_KEY = 'mbti_user';

/**
 * Exchange a Google idToken with your Express backend.
 * Returns the JWT + user object and persists them to localStorage.
 */
export async function loginWithGoogle(idToken: string): Promise<AuthUser> {
  const res = await fetch(`${BACKEND_URL}/api/users/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Google auth failed');
  }

  const data = await res.json();

  // Persist
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data.user as AuthUser;
}

/** Get the stored JWT (for attaching to API requests) */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
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

/** Clear session */
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/** True if a token is present in localStorage */
export function isAuthenticated(): boolean {
  return !!getToken();
}
