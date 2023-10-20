"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../utils/apiClient";
import { User } from "../types/user";
import { DataFormProps } from "../hooks/useForm";

type userProviderProps = {
  children: React.ReactNode;
};

type UserContextProps = {
  user: User | undefined;
  localLogin: (
    event: React.SyntheticEvent,
    values: { email: string; password: string }
  ) => Promise<void>;

  signup: (
    event: React.SyntheticEvent,
    values: Pick<DataFormProps, "email" | "password">
  ) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  createUserProfile: (
    event: React.SyntheticEvent,
    values: Omit<User, "id">
  ) => Promise<{ error: string } | undefined>;
  getProfile: () => Promise<void>;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<userProviderProps> = ({ children, ...props }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  async function localLogin(e: React.SyntheticEvent, values: any) {
    e.preventDefault();
    const { email, password } = values;
    const response = await apiClient("auth/login/local", {
      data: { email, password },
      method: "POST",
      rawResponse: true,
    });

    const data = await response.json();
    if (response.status === 401) {
      return data.data;
    }
    setUser({
      ...data.data.user,
      bot: false,
    });

    if (data.data.user.username) {
      router.push("/feed");
    } else if (data.data.user) {
      router.push("/create-profile");
    }
    return data.data;
  }

  async function signup(e: React.SyntheticEvent, values: DataFormProps) {
    e.preventDefault();
    const { email, password } = values;

    const response = await apiClient("auth/signup", {
      data: { email, password },
      method: "POST",
    });

    if (response.message === "success") {
      router.push("/check-email");
    }
  }

  async function verifyEmail(token: string) {
    const response = await apiClient(`auth/verify-email/?token=${token}`);
    return response;
  }

  async function logout() {
    await apiClient("auth/logout", { method: "POST" });
    localStorage.removeItem("user");
  }

  async function getProfile(withEtag: boolean = false) {
    const response = await apiClient("profile/preview", {
      ...(withEtag && { etag: "userProfileETag" }),
    });
    return response;
  }

  async function createUserProfile(
    e: React.SyntheticEvent,
    values: Omit<User, "id">
  ) {
    e.preventDefault();
    const { username, affinity } = values;

    const side = ["Rebellion", "Republic"].includes(affinity!)
      ? "Light Side"
      : "Dark Side";
    const response = await apiClient("profile/create-profile", {
      data: { username, affinity, side },
      rawResponse: true,
      method: "POST",
    });

    if (response.ok) {
      //@ts-ignore
      const updatedUser: User = {
        ...user,
        username: username,
        affinity,
        side: side,
        profilePic: user?.profilePic,
      };

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      return { error: "Couldn't create the profile. Try again." };
    }
  }

  useEffect(() => {
    async function getUserData() {
      // let userData = await getProfile(true);
      let userData = await getProfile(); // caching mechanism in futur branch
      console.log({ userData });
      if (userData) {
        setUser((prev) => (prev = { ...prev, ...userData.user }));
      }
    }
    if (!user) {
      getUserData();
    }
  }, [user]);
  console.log("USER DATA", user);

  const value = {
    user,
    localLogin,
    logout,
    signup,
    verifyEmail,
    createUserProfile,
    getProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUser(): UserContextProps {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within userContext");
  }
  return context;
}

export default UserProvider;
