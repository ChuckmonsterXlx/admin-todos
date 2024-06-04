"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="flex items-center px-4 py-3 space-x-4 text-gray-600 rounded-md group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Wait a moment...</span>
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="flex items-center px-4 py-3 space-x-4 text-gray-600 rounded-md group"
      >
        <CiLogout />
        <span className="group-hover:text-gray-700">Login</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="flex items-center px-4 py-3 space-x-4 text-gray-600 rounded-md group"
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};
