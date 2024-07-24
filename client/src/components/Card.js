import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";

const Card = ({ avatar, author, date, title, description }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border bg-white border-gray-300 rounded-lg box-border w-96 p-6 max-w-md mx-auto shadow-sm ">
      <div className="flex items-center justify-start ml-1">
        <Avatar
          src={avatar}
          alt={`Avatar of ${author}`}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col items-start justify-center ml-3">
          <div className="text-foreground font-medium text-lg">{author}</div>
          <div className="text-foregroundColor text-sm">{date}</div>
        </div>
      </div>
      <div className="text-start mt-4 text-foreground text-base dark:text-card-foreground">
        {description}

        <strong className="ml-2">#FinalFantasy #RPGLife</strong>
      </div>
      <div className="mt-4 border-t pt-4 dark:border-muted"></div>
      <div className="flex items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-crystalColor"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="2" x2="22" y1="12" y2="12" />
          <line x1="12" x2="12" y1="2" y2="22" />
          <path d="m20 16-4-4 4-4" />
          <path d="m4 8 4 4-4 4" />
          <path d="m16 4-4 4-4-4" />
          <path d="m8 20 4-4 4 4" />
        </svg>
        <div className="text-foregroundColor text-sm ml-3">12 likes</div>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="flex items-start">
          <Avatar
            src={avatar}
            alt={`Avatar of ${author}`}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="ml-3 flex flex-col">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@Link</div>
              <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                5 minutes ago
              </div>
            </div>
            <div className="text-start text-sm text-foreground dark:text-card-foreground mt-1">
              Awesome! Glad you were able to defeat the Demon Lord and collect
              the Materia shards. Enjoy your well-deserved rest in the Chocobo
              Meadows!
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <Avatar
            src={avatar}
            alt={`Avatar of ${author}`}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="ml-3 flex flex-col">
            <div className="flex items-center gap-2">
              <div className="font-semibold">@Link</div>
              <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                5 minutes ago
              </div>
            </div>
            <div className="text-start text-sm text-foreground dark:text-card-foreground mt-1">
              Congrats on your victory! Enjoy the Chocobo Meadows, you deserve
              it. Can't wait to hear more about your adventures.
            </div>
          </div>
        </div>
        <form className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            className=" w-full h-10 p-2 border bg-inputColor border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="h-10 bg-white border border-gray-300 text-black px-4 py-2  flex items-center justify-center rounded-lg hover:bg-inputColor focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Card;
