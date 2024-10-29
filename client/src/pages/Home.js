import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playButtonClickedSound, playMenuOpenSound } from "../utils/soundUtils";
import { useCurrentDateTime } from "../utils/dateUtils";
import MainLayout from "../layout/MainLayout";
import NewPostForm from "../components/forms/NewPostForm";
import CommentsList from "../components/ui-elements/CommentsList";
import Cactus from "../components/ui-elements/Cactus";
import Header from "../layout/Header";
import "animate.css";

const Home = () => {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showEditError, setEditError] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { comments } = useSelector((state) => state.comment);

  const navigate = useNavigate();
  const currentDateTime = useCurrentDateTime();

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
        menuSound={playMenuOpenSound}
        playSound={playButtonClickedSound}
      />

      <NewPostForm
        currentUser={currentUser}
        buttonSound={playButtonClickedSound}
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
