import { ReactNode } from "react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface AuthProps {
  children: ReactNode;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = localStorage.getItem("LOGGED");
    if (!checkAuth) router.push("/");
  }, [router]);

  return <div>{children}</div>;
}
