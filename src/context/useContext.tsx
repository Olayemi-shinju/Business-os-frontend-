import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { api } from "../utils/api";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "OWNER" | "STAFF";
  isActive: boolean;
  createdAt: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const refreshUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await api.get("get-data");

      if (result?.success && result?.data && !Array.isArray(result.data)) {
        setUser(result.data);
      } else {
        setUser(null);
      }
    } catch (err: unknown) {
      setUser(null);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
