"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "./types";

type StoredUser = User & { password: string };

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  register: (fullName: string, email: string, phone: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const USERS_KEY = "inja3d-users";
const SESSION_KEY = "inja3d-session";

function readUsers(): StoredUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  function register(fullName: string, email: string, phone: string, password: string) {
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "این ایمیل قبلاً ثبت شده است." };
    }
    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      phone,
      password,
    };
    writeUsers([...users, newUser]);
    const { password: _pw, ...publicUser } = newUser;
    setUser(publicUser);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
    return { ok: true };
  }

  function login(email: string, password: string) {
    const users = readUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      return { ok: false, error: "ایمیل یا رمز عبور اشتباه است." };
    }
    const { password: _pw, ...publicUser } = found;
    setUser(publicUser);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
    return { ok: true };
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, ready, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  return ctx;
}
