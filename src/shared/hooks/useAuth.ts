import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-user', // clave de almacenamiento local
        }
    )
);

export function useAuth() {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = !!user;
    return { user, isAuthenticated, token: "" };
}
