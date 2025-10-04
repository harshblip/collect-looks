// context/AuthContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    user: { id: string; username: string; role?: string } | null;
    accessToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

interface AuthProvider {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider = ({ children }: AuthProvider) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

    const login = (token: string) => {
        setAccessToken(token);

        // decode minimal info from JWT payload
        const decoded: any = jwtDecode(token);
        setUser({
            id: decoded.id,
            emai: decoded.email,
            username: decoded.username,
        });
    };

    const logout = () => {
        setAccessToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);