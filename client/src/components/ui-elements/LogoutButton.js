import React from "react";

import { logout } from "../../utils/auth";

const LogoutButton = () => {
  return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
