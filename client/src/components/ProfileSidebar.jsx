import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine, profile } from "../assets";
import { useAuth } from "../context/AuthContext";

export default function ProfileSidebar() {
  const { user, logout } = useAuth();

  const colapseFieldValues = [
    {
      title: "Name",
      value: user.username,
    },
    {
      title: "Email",
      value: user.email,
    },
  ];

  const [isColapsed, setIsColapsed] = useState(false);

  return (
    <div className="w-[380px] md:w-screen h-full px-5 py-6">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-black font-semibold text-2xl dark:text-white">
            My Profile
          </h1>

          <div
            onClick={logout}
            className="text-red-500 hover:text-red-600 cursor-pointer text-sm font-medium transition-colors duration-200"
          >
            Log out
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-3 my-10">
          <div className="relative">
            <img
              className="size-32 rounded-full object-cover border-4 border-border_light dark:border-border_dark shadow-lg"
              src={user.avatarUrl}
              alt={user.username}
            />
            <div className="absolute bottom-2 right-2 size-4 bg-accent rounded-full border-2 border-white dark:border-backgroundDark2"></div>
          </div>
          <p className="text-black font-semibold text-xl dark:text-white">
            {user.username}
          </p>

          <p className="text-center text-muted dark:text-slate-400 text-sm">
            {user.bio || "No bio yet"}
          </p>
        </div>

        <div className="about">
          <div
            className="about-card flex items-center justify-between py-3 px-4 rounded-lg bg-backgroundLight3 dark:bg-backgroundDark1 cursor-pointer dark:text-white shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => setIsColapsed(!isColapsed)}
          >
            <div className="text-md font-semibold">About</div>
            <div className="text-2xl">
              {isColapsed ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </div>
          </div>
          <div
            className={`colapse py-3 px-4 bg-white rounded-lg dark:bg-backgroundDark1 dark:text-white mt-1 transition-all duration-200 ${
              isColapsed ? "block h-fit" : "hidden h-0"
            }`}
          >
            {colapseFieldValues.map(({ title, value }, index) => (
              <div className="mb-5" key={index}>
                <p className="text-sm text-gray-500">{title}</p>
                <h5 className="text-base ">{value}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
