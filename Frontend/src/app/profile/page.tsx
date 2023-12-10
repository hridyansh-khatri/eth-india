"use client";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FFEED9]">
      <Profile />
    </main>
  );
}
