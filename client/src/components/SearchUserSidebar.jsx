import React, { useRef } from "react";
import { BiSearch, profile } from "../assets";
import { limitChar } from "../utils";
import { getAvailableUsers } from "../api";
import { useChat } from "../context/ChatContext";

const SearchedUsersResultCard = ({ user }) => {
  const { setOpenAddChat, setNewChatUser } = useChat();

  const handleCreateChatClick = () => {
    setNewChatUser(user);
    setOpenAddChat(true);
  };

  return (
    <div className="flex justify-between p-4 my-2 rounded-lg bg-backgroundLight3 dark:bg-backgroundDark1 items-center w-full hover:shadow-sm transition-all duration-200">
      <div className="flex gap-2 items-center w-max">
        <div className="relative">
          <img
            className="size-10 rounded-full object-cover border-2 border-border_light dark:border-border_dark"
            src={user.avatarUrl}
            alt={user.username}
            loading="lazy"
          />
          <div className="absolute bottom-0 right-0 size-2.5 bg-accent rounded-full border-2 border-white dark:border-backgroundDark1"></div>
        </div>

        <div>
          <h3 className="font-semibold text-base text-text_dark_primary dark:text-slate-100">
            {user.username}
          </h3>
        </div>
      </div>
      <button
        onClick={handleCreateChatClick}
        className="bg-primary hover:bg-primary_hover text-white text-sm rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 ease-in-out shadow-sm hover:shadow-md font-medium"
      >
        + Create
      </button>
    </div>
  );
};

export default function SearchUserSidebar() {
  const searchInputRef = useRef();

  // useChat hook
  const { searchedUsers, setSearchedUsers } = useChat();

  const searchUsers = async () => {
    const { data } = await getAvailableUsers(searchInputRef.current.value);
    setSearchedUsers(data.data?.users || []);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUsers();
    }
    if (!searchInputRef.current.value.trim()) {
      setSearchedUsers(null);
    }
  };
  return (
    <div className="px-5 py-6 w-full h-full">
      <div className="top">
        <h1 className="text-black font-semibold text-xl dark:text-white">
          Search Users
        </h1>
        <div
          className="flex items-center gap-2 bg-backgroundLight3 dark:bg-backgroundDark1 dark:text-slate-300 px-4 py-3 rounded-lg my-5 border border-transparent focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200"
        >
          <div className="text-xl text-muted">
            <BiSearch />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none px-2 w-[90%] placeholder:text-muted"
            placeholder="Email or username..."
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <h1 className="text-black font-medium text-xl dark:text-white">
            {searchUsers?.length ? "Search Results" : ""}
          </h1>
          <div className="recentUserChats h-[calc(100vh-170px)] md:h-[calc(100vh-280px)] overflow-auto ">
            {!searchedUsers ? (
              <h2 className="text-center text-base dark:text-slate-400 text-muted mt-8">
                Search for friends to start a chat!
              </h2>
            ) : !searchedUsers.length ? (
              <h2 className="text-center text-xl text-slate-400">
                No users found{" "}
              </h2>
            ) : (
              searchedUsers?.map((user) => (
                <SearchedUsersResultCard key={user._id} user={user} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
