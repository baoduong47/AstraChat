const Kupo = ({ currentUser, currentDateTime }) => {
  const getGreeting = () => {
    const hours = currentDateTime.getHours();
    if (hours < 12) {
      return "Good Morning";
    } else if (hours < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  return (
    <div className="right-32 mr-28 mt-72 fixed">
      <div
        className="inline-flex flex-col items-center animate__animated animate__backInRight"
        style={{ animationDelay: "0.5s", animationDuration: "2s" }}
      >
        <img
          src="/images/kupo.png"
          alt="Kupo"
          className="w-20 h-auto mr-32 mb-2 animate-fly"
        />

        <div className="absolute animate-fly -top-20 -right-3 w-32 bg-white border border-gray-300 rounded-lg p-2 shadow-lg kupo-bubble">
          {currentUser ? (
            <p className="text-xs text-gray-700">
              {getGreeting()}, {currentUser.firstname}! Welcome to Wisteria! May
              your adventures here be filled with magic and wonder, kupo!
            </p>
          ) : (
            <p className="text-xs text-gray-700">
              {getGreeting()}, Kupo! Welcome to Wisteria! May your adventures
              here be filled with magic and wonder, kupo!
            </p>
          )}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-white border-l-transparent border-r-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Kupo;
