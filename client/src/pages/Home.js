import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getCurrentUser } from "../redux/actions/userActions";
import { getComments } from "../redux/actions/commentAction";
import MainLayout from "../components/MainLayout";
import { useNavigate } from "react-router-dom";
import NewPostForm from "../components/NewPostForm";
import CommentsList from "../components/CommentsList";
import "animate.css";
import Cactus from "../components/Cactus";
import Header from "../components/Header";

const Home = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showEditError, setEditError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  const playSound = () => {
    const audio = new Audio("/sounds/sao_menu.mp3");
    audio.play();
  };

  const buttonSound = () => {
    const audio = new Audio("/sounds/ff_select.mp3");
    audio.play();
  };

  const menuSound = () => {
    const audio = new Audio("/sounds/sao_menu_select.mp3");
    audio.play();
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCurrentUser());
    dispatch(getComments());

    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (showSuccess || postSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setPostSuccess(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess, postSuccess]);

  useEffect(() => {
    if (showError || showDeleteError || showEditError || showEditError) {
      const timer = setTimeout(() => {
        setEditError(false);
        setShowError(false);
        setShowDeleteError(false);
        setEditError(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showError, showDeleteError, showEditError]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log("Error: ", error);
    navigate("/login");
    return <p>Error: {error}</p>;
  }

  return (
    <MainLayout>
      <Header
        showError={showError}
        showDeleteError={showDeleteError}
        showEditError={showEditError}
        showSuccess={showSuccess}
        postSuccess={postSuccess}
        currentUser={currentUser}
        currentDateTime={currentDateTime}
        menuSound={menuSound}
        playSound={playSound}
      />

      <NewPostForm
        currentUser={currentUser}
        buttonSound={buttonSound}
        setShowError={setShowError}
        setPostSuccess={setPostSuccess}
      />

      <Cactus />
      <CommentsList
        setEditError={setEditError}
        comments={comments}
        setShowSuccess={setShowSuccess}
        setShowDeleteError={setShowDeleteError}
      />
    </MainLayout>
  );
};

export default Home;
