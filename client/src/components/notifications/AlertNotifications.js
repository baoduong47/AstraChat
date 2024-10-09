import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Alert from "@mui/material/Alert";

const AlertNotifications = ({
  showError,
  showDeleteError,
  showSuccess,
  postSuccess,
  showEditError,
  showProfanityError,
  showEmailError,
}) => {
  return (
    <AnimatePresence>
      {showError && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error">Post required, Kupo!</Alert>
        </motion.div>
      )}
      {showEmailError && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error">Email already exists, Kupo!</Alert>
        </motion.div>
      )}
      {showProfanityError && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error">{`That's not nice!! No profanity, Kupo. Let's try that again...`}</Alert>
        </motion.div>
      )}
      {showEditError && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error">
            You cannot edit someone else's post, Kupo!
          </Alert>
        </motion.div>
      )}
      {showDeleteError && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="error">
            You cannot delete someone else's post, Kupo!
          </Alert>
        </motion.div>
      )}
      {showSuccess && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="success">Successfully deleted comment, Kupo!</Alert>
        </motion.div>
      )}
      {postSuccess && (
        <motion.div
          className="fixed z-50 top-0 left-0 w-full flex justify-center mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Alert severity="success">Successfully posted comment, Kupo!</Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertNotifications;
