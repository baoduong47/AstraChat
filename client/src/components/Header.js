import Particles from "../components/Particle";
import { GiBroadsword } from "react-icons/gi";
import { HiMiniUserCircle } from "react-icons/hi2";
import Kupo from "../components/Kupo";
import MusicList from "../components/MusicList";
import AlertNotifications from "../components/AlertNotifications";
const Header = ({
  showError,
  showDeleteError,
  showSuccess,
  postSuccess,
  currentUser,
  currentDateTime,
  menuSound,
  playSound,
  showEditError,
}) => {
  return (
    <div className="ml-3 mt-2 relative flex justify-between items-center">
      <Particles count={40} />
      <AlertNotifications
        showError={showError}
        showDeleteError={showDeleteError}
        showSuccess={showSuccess}
        postSuccess={postSuccess}
        showEditError={showEditError}
      />
      <div
        className="inline-flex z-20 text-center items-center space-x-1 fixed animate__animated animate__fadeInLeft text-2xl"
        style={{ animationDelay: "0.5s", animationDuration: "1s" }}
      >
        <span>Welcome Back,</span>
        {currentUser ? (
          <span className="inline-flex items-center space-x-2">
            <HiMiniUserCircle
              style={{
                verticalAlign: "middle",
                marginRight: "1px",
                marginLeft: "5px",
                fontSize: "22px",
              }}
            />

            <div className="flex justify-center items-center gap-3">
              <span>{currentUser.firstname}</span>
              <span className="text-sm text-gray-700 mt-1">
                {currentDateTime.toLocaleString()}
              </span>
              <GiBroadsword size={18} />
            </div>

            <MusicList menuSound={menuSound} playSound={playSound} />
          </span>
        ) : (
          <span>Guest</span>
        )}
      </div>
      <Kupo currentUser={currentUser} currentDateTime={currentDateTime} />
    </div>
  );
};

export default Header;
