import React from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@src/shared/config";
import Cookie from "cookie";

const AuthContext = React.createContext<{
  user: any;
  login: (params: { email: string; password: string }) => void;
  logout: () => void;
  error?: any;
  register: (user: {
    username: string;
    email: string;
    password: string;
  }) => void;
}>({} as any);

export const useAuthContext = () => {
  const autCtx = React.useContext(AuthContext);
  return autCtx;
};

const TokenContext = React.createContext(() => "" as string);

export const useToken = () => {
  const getToken = React.useContext(TokenContext);
  return getToken();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState(null);

  const router = useRouter();

  // Check if user is logged in
  const checkUserLoggedIn = React.useCallback(async () => {
    const res = await fetch(`${NEXT_URL}/api/user-auth`);

    if (res.ok) {
      const data = await res.json();
      getTokenRef.current = () => data.token;
      setUser(data.user);
    } else {
      setUser(null);
    }
  }, []);

  // Register user
  const register = React.useCallback(async (user: any) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: 'same-origin',
      body: JSON.stringify(user),
    });

    try {
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        getTokenRef.current = () => data.token;
        router.push("/account/dashboard");
      } else {
        setError(data.message);
        setError(null);
      }
    } catch (error) {
      setError(error?.message || "something went wrong");
      setError(null);
    }
  }, []);

  const getTokenRef = React.useRef(() => "" as string);

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "same-origin",
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      getTokenRef.current = () => data.token;
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/logout`, {
        method: "POST",
      });

      if (res.ok) {
        getTokenRef.current = () => "";
        setUser(null);
        router.push("/");
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      <TokenContext.Provider value={getTokenRef.current}>
        {children}
      </TokenContext.Provider>
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);
