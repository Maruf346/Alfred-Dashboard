import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
} from "./api";
import {
  setTokens,
  clearTokens,
  getRefreshToken,
  isAuthed,
  getCachedUser,
  setCachedUser,
  type AdminUser,
} from "./auth";

// ─── Context types ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(getCachedUser);
  const [isLoading, setIsLoading] = useState(false);

  // On mount, if we have a token but no user in cache, fetch the profile
  useEffect(() => {
    if (isAuthed() && !user) {
      getAdminProfile()
        .then((res) => {
          const u: AdminUser = {
            id: res.data.id,
            full_name: res.data.full_name,
            email: res.data.email,
            profile_picture: res.data.profile_picture,
            bio: res.data.bio,
            member_since: res.data.member_since,
          };
          setUser(u);
          setCachedUser(u);
        })
        .catch(() => {
          // Token invalid / expired — clear and let guard redirect
          clearTokens();
          setUser(null);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const res = await adminLogin(email, password);
        setTokens(res.data.access_token, res.data.refresh_token);
        const u: AdminUser = {
          id: res.data.user.id,
          full_name: res.data.user.full_name,
          email: res.data.user.email,
          profile_picture: res.data.user.profile_picture,
        };
        setUser(u);
        setCachedUser(u);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      try {
        await adminLogout(refresh);
      } catch {
        // Even if logout API fails, we still clear locally
      }
    }
    clearTokens();
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await getAdminProfile();
      const u: AdminUser = {
        id: res.data.id,
        full_name: res.data.full_name,
        email: res.data.email,
        profile_picture: res.data.profile_picture,
        bio: res.data.bio,
        member_since: res.data.member_since,
      };
      setUser(u);
      setCachedUser(u);
    } catch {
      // Silently fail — user data just stays stale
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
