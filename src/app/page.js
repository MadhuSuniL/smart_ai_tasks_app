"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/utils/auth";

import { LuLayoutDashboard, LuBrain, LuFileText } from "react-icons/lu";
import { TiUserOutline } from "react-icons/ti";

export default function HomePage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  const getUserName = () => {
    if (typeof window !== "undefined") {
      let user = JSON.parse(localStorage.getItem("user"));
      return user.first_name;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push("/signin");
    } else {
      setIsAuth(true);
    }
  }, []);

  const user = { username: "madhu_user" };

  if (!isAuth) return <div className="text-center p-10 text-gray-500">Redirecting...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Smart AI Tasks
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          Let AI simplify your day. Start your smart tasking journey below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <MenuCard
          title="Task Dashboard"
          subtitle="All tasks in one place"
          description="Filter, sort, and quickly create tasks. Prioritized by AI."
          href="/dashboard"
          Icon={LuLayoutDashboard}
        />
        <MenuCard
          title="Suggested Tasks"
          subtitle="AI-powered recommendations"
          description="Generate tasks from your contexts. Review and save or reject."
          href="/suggested"
          Icon={LuBrain}
        />
        <MenuCard
          title="Contexts"
          subtitle="Your ideas, notes, and messages"
          description="Add and manage context entries (e.g., email, WhatsApp)."
          href="/contexts"
          Icon={LuFileText}
        />
        <ProfileCard username={getUserName()} />
      </div>
    </div>
  );
}

function MenuCard({ title, subtitle, description, href, Icon }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(href)}
      className="cursor-pointer rounded-2xl p-6 shadow-md transition-all transform hover:scale-[1.02] duration-200
      bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10
      hover:shadow-pink-100 dark:hover:shadow-pink-900 group"
    >
      <div className="flex items-start gap-4 mb-3">
        <Icon className="text-4xl text-pink-500 group-hover:scale-110 transition-transform" />
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition">{title}</h3>
          <p className="text-sm text-pink-200">{subtitle}</p>
        </div>
      </div>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  );
}

function ProfileCard({ username }) {
  return (
    <div
      className="rounded-2xl p-6 shadow-md
      bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10"
    >
      <div className="flex items-start gap-4 mb-3">
        <TiUserOutline className="text-4xl text-pink-500" />
        <div>
          <h3 className="text-xl font-bold text-white">Profile</h3>
          <p className="text-sm text-pink-200">Logged in as user</p>
        </div>
      </div>
      <p className="text-sm text-white/70">
        Username: <span className="font-semibold text-pink-300">{username}</span>
      </p>
    </div>
  );
}
