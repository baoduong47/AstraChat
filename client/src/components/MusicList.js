import { MdLyrics } from "react-icons/md";
import { useState, useRef, useEffect } from "react";

const MusicList = ({ menuSound, playSound }) => {
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicListVisible, setIsMusicListVisible] = useState(false);

  const musicListRef = useRef(null);

  const musicList = [
    {
      name: "Kingdom Hearts II - Twilight Town ",
      file: "/sounds/KH_TWILIGHT.mp3",
    },
    { name: "Final Fantasy 15 - Somnus", file: "/sounds/Somnus.mp3" },
    {
      name: "Final Fantasy 13 - The Promise",
      file: "/sounds/FF13_PROMISE.mp3",
    },
    {
      name: "Final Fantasy 7 - Aerith's Theme",
      file: "/sounds/FF7_AERITH.mp3",
    },

    {
      name: "Final Fantasy 7 - Jessie's Theme",
      file: "/sounds/FF7_JESSIE.mp3",
    },
    {
      name: "I Really Want to Stay At Your House - Rosa",
      file: "/sounds/Cyberpunk.mp3",
    },
  ];

  const toggleMusicList = () => {
    if (!isMusicListVisible) {
      playSound();
    }
    setIsMusicListVisible((prev) => !prev);
  };

  const handleMusicSelection = (music) => {
    menuSound();
    if (selectedMusic === music.name && currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (currentAudio) {
        currentAudio.pause();
      }
      const audio = new Audio(music.file);
      setSelectedMusic(music.name);
      setCurrentAudio(audio);
      setIsPlaying(true);
      audio.play();

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
    setIsMusicListVisible(false);
  };

  const handleClickOutside = (event) => {
    if (musicListRef.current && !musicListRef.current.contains(event.target)) {
      setIsMusicListVisible(false);
    }
  };

  useEffect(() => {
    if (isMusicListVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMusicListVisible]);

  return (
    <div className="flex gap-2 items-center">
      <MdLyrics
        className={`ml-2 mt-1 flex justify-center items-center cursor-pointer transition-colors hover:text-indigo-600 duration-200 ${
          isPlaying ? "text-indigo-600" : "text-gray-700"
        }`}
        size={24}
        onClick={toggleMusicList}
      />

      {isMusicListVisible && (
        <div
          ref={musicListRef}
          className="absolute transform p-2 translate-x-6 translate-y-28 mt-2 w-60 bg-white border rounded-lg shadow-lg overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          <ul className="py-1 text-sm">
            {musicList.map((music, index) => (
              <li
                key={music.name}
                className="cursor-pointer text-left px-4 py-2 text-black  hover:bg-gray-100 transition-colors duration-200 animate__animated animate__fadeInRight"
                style={{
                  animationDelay: `${(index + 1) * 0.1}s`,
                  animationDuration: "0.7s",
                }}
                onClick={() => handleMusicSelection(music)}
              >
                {music.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedMusic && (
        <p className="text-gray-500 text-sm">
          Playing:
          <span className="font-bold"> {selectedMusic}</span>
        </p>
      )}
    </div>
  );
};

export default MusicList;
