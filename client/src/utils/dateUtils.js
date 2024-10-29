import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers, getCurrentUser } from "../redux/actions/userActions";
import { getComments } from "../redux/actions/commentAction";

export const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentUser());
    dispatch(getComments());

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return currentDateTime;
};

// - Expects message.timestamp
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
