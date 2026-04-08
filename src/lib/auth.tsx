"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "./api";
import { setSentryUser, clearSentryUser } from "./sentry";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl: string | null;
  workspaceId: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    // Clear any legacy localStorage tokens from before httpOnly cookie migration
    api.clearLegacyToken();
    try {
      const me = await api.getMe();
      setUser(me);
      setSentryUser({ id: me.id, email: me.email });
    } catch {
      setUser(null);
      clearSentryUser();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async () => {
    // Cookie is already set by the API response; just fetch the user profile
    await fetchUser();
  };

  const logout = async () => {
    try {
      await api.logout(); // server revokes session + clears httpOnly cookie
    } catch {
      // Best-effort: clear local state even if the server call fails
    }
    setUser(null);
    clearSentryUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
