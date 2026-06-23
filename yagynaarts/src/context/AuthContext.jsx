import { createContext, useContext, useState, useCallback } from 'react';

const read = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const USERS_KEY = 'yagyna_users', SESSION_KEY = 'yagyna_session', ORDERS_KEY = 'yagyna_orders';
const safe = (u) => ({ name: u.name, email: u.email, joined: u.joined });

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const u = read(USERS_KEY).find((x) => x.email === email);
    return u ? safe(u) : null;
  });

  const register = useCallback(({ name, email, password }) => {
    email = (email || '').trim().toLowerCase();
    if (!name || !email || !password) return { ok: false, msg: 'All fields are required' };
    const list = read(USERS_KEY);
    if (list.some((u) => u.email === email)) return { ok: false, msg: 'An account with this email already exists' };
    const u = { name: name.trim(), email, password, joined: Date.now() };
    list.push(u); write(USERS_KEY, list);
    localStorage.setItem(SESSION_KEY, email); setUser(safe(u));
    return { ok: true, user: safe(u) };
  }, []);

  const login = useCallback((email, password) => {
    email = (email || '').trim().toLowerCase();
    const u = read(USERS_KEY).find((x) => x.email === email);
    if (!u || u.password !== password) return { ok: false, msg: 'Invalid email or password' };
    localStorage.setItem(SESSION_KEY, email); setUser(safe(u));
    return { ok: true, user: safe(u) };
  }, []);

  const logout = useCallback(() => { localStorage.removeItem(SESSION_KEY); setUser(null); }, []);

  const saveOrder = useCallback((order) => {
    const all = read(ORDERS_KEY);
    const email = (user && user.email) || 'guest';
    all.unshift({ email, date: Date.now(), status: 'Processing', ...order });
    write(ORDERS_KEY, all);
  }, [user]);

  const getOrders = useCallback(() => {
    const all = read(ORDERS_KEY);
    return user ? all.filter((o) => o.email === user.email || o.email === 'guest') : all;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, saveOrder, getOrders }}>
      {children}
    </AuthContext.Provider>
  );
}
