import { useEffect, useState } from "react";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export const useAuth = () => {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Call a protected route; must return 200 if logged in
    fetch("https://localhost:8080/me", { credentials: "include" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // or whatever your backend returns
          setStatus("authenticated");
        } else {
          setUser(null);
          setStatus("unauthenticated");
        }
      })
      .catch(() => {
        setUser(null);
        setStatus("unauthenticated");
      });
  }, []);

  return {
    status, // "loading" | "authenticated" | "unauthenticated"
    user, // user data if available
    isLoggedIn: status === "authenticated",
  };
};
