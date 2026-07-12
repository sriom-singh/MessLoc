"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { AuthService } from "@/services/auth_service";

type User = {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin" | "messOwner";
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: {
        email: string;
        password: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            // Gets a new access token using the refresh cookie
              await AuthService.refresh();

            // Gets the logged-in user's details
            const { user } = await AuthService.me();

            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            await refreshUser();
        };
        initAuth();
    }, []);

    const login = async (credentials: {
        email: string;
        password: string;
    }) => {
        const data = await AuthService.login(credentials);

        setUser(data.user);
    };

    const logout = async () => {
        try {
            await AuthService.logout();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};