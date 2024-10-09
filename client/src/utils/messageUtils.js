// utils/messageUtils.js
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return days > 1 ? `${days} days ago` : "1 day ago";
  }
};

export const groupMessagesBySender = (messages, currentUser, users) => {
  const filteredMessages = messages.filter(
    (message) => message.sender._id !== currentUser._id
  );

  return Object.values(
    filteredMessages.reduce((acc, message) => {
      const senderName = message.sender.firstname;
      const sender =
        users.find((user) => user._id === message.sender._id) || message.sender;

      if (
        !acc[senderName] ||
        new Date(acc[senderName].timestamp) < new Date(message.timestamp)
      ) {
        acc[senderName] = { ...message, sender };
      }
      return acc;
    }, {})
  );
};
