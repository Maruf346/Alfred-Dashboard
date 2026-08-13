// Token storage keys
const ACCESS_KEY  = "alfred_access_token";
const REFRESH_KEY = "alfred_refresh_token";
const USER_KEY    = "alfred_user_cache";

export const getAccessToken  = (): string | null => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_KEY);

export const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthed = (): boolean => !!getAccessToken();

export const getCachedUser = (): AdminUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
};

export const setCachedUser = (user: AdminUser): void =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

// Keep type here so both api.ts and authContext can import it
export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  profile_picture: string | null;
  bio?: string | null;
  member_since?: string;
}
