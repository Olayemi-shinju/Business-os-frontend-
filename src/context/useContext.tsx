
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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

export interface Category {
  id: string;
  name: string;
  description?: string | null;
}

interface UserContextType {
  user: User | null;
  category: Category[];
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  setUser: (user: User | null) => void;
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [category, setCategory] = useState<Category[]>([]);
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
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    try {
      const result = await api.get("get-catgory");

      if (result?.success && Array.isArray(result?.data)) {
        setCategory(result.data);
      } else {
        setCategory([]);
      }
    } catch (err: unknown) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    void refreshCategories();
  }, [refreshCategories]);

  return (
    <UserContext.Provider
      value={{
        user,
        category,
        loading,
        error,
        refreshUser,
        refreshCategories,
        setUser,
        setCategory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
