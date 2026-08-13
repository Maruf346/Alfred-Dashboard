import { getAccessToken, clearTokens } from "./auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  gender?: string;
  age?: number;
  location?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  interests?: string;
  budget?: string;
  subscription_plan?: string;
  provider?: string;
  profile_picture: string | null;
  is_active: boolean;
  is_admin: boolean;
}

export interface AdminProfile {
  id: string;
  full_name: string;
  email: string;
  profile_picture: string | null;
  bio: string | null;
  member_since: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    user: AdminUser;
  };
  success: boolean;
  message: string;
}

export interface ProfileResponse {
  data: AdminProfile;
  success: boolean;
  message: string;
}

export interface UpdateProfilePayload {
  full_name?: string;
  bio?: string;
}

export interface UpdateProfileMultipartPayload {
  full_name?: string;
  bio?: string;
  /** File selected by the user for upload */
  profile_picture?: File;
}

export interface UserListItem {
  id: string;
  full_name: string;
  email: string;
  profile_picture: string | null;
  provider: string;
  subscription_plan: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ─── Core request helper ──────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAccessToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    // Token expired or invalid — clear session and redirect to login
    clearTokens();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const json = await res.json();

  if (!res.ok) {
    // Surface the backend error message
    const msg =
      (json as { detail?: string })?.detail ??
      (json as { message?: string })?.message ??
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return json as T;
}

// ─── Auth endpoints ───────────────────────────────────────────────────────────

export async function adminLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  return request<LoginResponse>("/api/user/admin/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function adminLogout(refresh_token: string): Promise<void> {
  await request("/api/user/logout/", {
    method: "POST",
    body: JSON.stringify({ refresh_token }),
  });
}

// ─── Profile endpoints ────────────────────────────────────────────────────────

export async function getAdminProfile(): Promise<ProfileResponse> {
  return request<ProfileResponse>("/api/user/admin/profile/");
}

export async function updateAdminProfile(
  payload: UpdateProfilePayload
): Promise<ProfileResponse> {
  return request<ProfileResponse>("/api/user/admin/profile/", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/**
 * PATCH /api/user/admin/profile/ with multipart/form-data.
 * Used when the user selects a new profile picture file.
 * NOTE: Do NOT set Content-Type manually — the browser adds the correct
 * boundary when the body is a FormData instance.
 */
export async function updateAdminProfileMultipart(
  payload: UpdateProfileMultipartPayload
): Promise<ProfileResponse> {
  const token = getAccessToken();

  const form = new FormData();
  if (payload.full_name !== undefined) form.append("full_name", payload.full_name);
  if (payload.bio !== undefined)       form.append("bio", payload.bio);
  if (payload.profile_picture)         form.append("profile_picture", payload.profile_picture);

  const res = await fetch(`${BASE_URL}/api/user/admin/profile/`, {
    method: "PATCH",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });

  if (res.status === 401) {
    clearTokens();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const json = await res.json();
  if (!res.ok) {
    const msg =
      (json as { detail?: string })?.detail ??
      (json as { message?: string })?.message ??
      `Request failed with status ${res.status}`;
    throw new Error(msg);
  }

  return json as ProfileResponse;
}

// ─── Password endpoints ───────────────────────────────────────────────────────

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<{ success: boolean; message: string }> {
  return request<{ success: boolean; message: string }>("/api/user/password/change/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── Users endpoints ────────────────────────────────────────────────────────────

export async function getUsers(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  ordering?: string
): Promise<PaginatedResponse<UserListItem>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  if (search) params.append("search", search);
  if (ordering) params.append("ordering", ordering);

  return request<PaginatedResponse<UserListItem>>(`/api/user/admin/users/?${params.toString()}`);
}

// ─── Notification endpoints ───────────────────────────────────────────────────

export interface NotificationItem {
  id: string;
  notification_type: string;
  title: string;
  body: string;
  data: any;
  priority: string;
  is_read: boolean;
  read_at: string | null;
  websocket_pushed: boolean;
  websocket_success: boolean;
  created_at: string;
}

export async function getNotifications(
  page: number = 1,
  pageSize: number = 8
): Promise<PaginatedResponse<NotificationItem>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  return request<PaginatedResponse<NotificationItem>>(`/api/notification/admin/?${params.toString()}`);
}

export async function getUnreadNotificationCount(): Promise<{ unread_count: number }> {
  return request<{ unread_count: number }>("/api/notification/admin/unread-count/");
}

export async function markNotificationRead(id: string): Promise<NotificationItem> {
  return request<NotificationItem>(`/api/notification/admin/${id}/mark-read/`, {
    method: "POST",
  });
}

export async function markAllNotificationsRead(): Promise<{ message: string; count: number }> {
  return request<{ message: string; count: number }>("/api/notification/admin/mark-all-read/", {
    method: "POST",
  });
}

export async function clearReadNotifications(): Promise<{ message: string; deleted_count: number }> {
  return request<{ message: string; deleted_count: number }>("/api/notification/admin/clear-read/", {
    method: "DELETE",
  });
}
