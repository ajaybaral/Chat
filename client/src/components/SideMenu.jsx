import React from "react";
import { User, MessageCircle, Search } from "lucide-react";
import { logo } from "../assets";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import { useAuth } from "../context/AuthContext";

export default function SideMenu({ activeLeftSidebar, setActiveLeftSidebar }) {
  const sideMenuOptions = [
    { Icon: User, name: "profile" },
    { Icon: MessageCircle, name: "recentChats" },
    { Icon: Search, name: "searchUser" },
  ];

  const { logout, user } = useAuth();

  return (
    <div className="side-menu h-full md:w-full md:h-[60px] md:px-4 w-[75px] flex flex-col items-center justify-between py-5 px-2 border-r border-border_light dark:border-border_dark dark:bg-backgroundDark1 bg-white md:flex-row">
      <div className="w-10 md:w-6">
        <img src={logo} alt="echochat" />
      </div>
      <div>
        <ul className="flex flex-col gap-10 md:gap-8 md:flex-row">
          {sideMenuOptions.map(({ Icon, name }, index) => (
            <li
              key={index}
              className={`text-3xl md:text-2xl cursor-pointer transition-all duration-200 ease-in-out rounded-lg p-2 md:p-1.5 ${
                name === activeLeftSidebar 
                  ? "bg-primary bg-opacity-20 dark:bg-primary dark:bg-opacity-30 text-primary"
                  : "text-text_dark_secondary dark:text-slate-400 hover:bg-backgroundLight3 dark:hover:bg-backgroundDark1"
              }`}
              onClick={() => setActiveLeftSidebar(name)}
            >
              <Icon size={28} strokeWidth={2} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-5 md:gap-4 flex-col md:flex-row items-center">
        <ThemeSwitchButton />
        <div>
          <div className="relative cursor-pointer" onClick={() => setActiveLeftSidebar("profile")}>
            <img
              className="size-10 md:size-8 rounded-full object-cover border-2 border-border_light dark:border-border_dark hover:opacity-80 transition-opacity"
              src={user.avatarUrl}
              alt={user.username}
            />
            <div className="absolute bottom-0 right-0 size-3 md:size-2.5 bg-accent rounded-full border-2 border-white dark:border-backgroundDark1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
