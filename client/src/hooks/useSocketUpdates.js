import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../utils/socket";

function useSocketUpdates(user) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    socket.on("userUpdated", (updatedUser) => {
      dispatch({
        type: "UPDATED_USER_SUCCESS",
        payload: updatedUser,
      });
    });

    return () => {
      socket.off("userUpdated");
    };
  }, [user, dispatch]);
}

export default useSocketUpdates;
