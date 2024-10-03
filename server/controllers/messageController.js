const Message = require("../models/message");
const User = require("../models/user");

exports.sendMessage = async (req, res) => {
  const { recieverId, content } = req.body;

  try {
    const sender = await User.findById(req.user);
    const reciever = await User.findById(recieverId);

    if (!sender) return res.status(404).json({ message: "Sender not found" });
    if (!reciever)
      return res.status(404).json({ message: "Recipient not found" });

    const newMessage = new Message({
      sender: sender.id,
      reciever: reciever,
      read: false,
      content,
    });

    await newMessage.save();

    req.io.emit("receiveMessage", newMessage);

    res.status(200).json({ message: "Message sent successfully!", newMessage });
  } catch (error) {
    console.error("Error sending message: ", error);
    return res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
};

exports.getAllMessagesForUser = async (req, res) => {
  const userId = req.user;

  try {
    const messages = await Message.find({
      $or: [{ reciever: userId }, { sender: userId }],
    })
      .populate({ path: "sender", select: "firstname avatar title" })
      .sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching all messages for user: ", error);
    return res.status(500).json({
      message: "Error fetching all messages for user",
      error: error.message,
    });
  }
};

exports.getMessagesBetweenUsers = async (req, res) => {
  const { senderId, recieverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, reciever: recieverId },
        { sender: recieverId, reciever: senderId },
      ],
    }).sort({ timestamp: 1 });

    console.log("sender Id: ", senderId);
    console.log("reciever Id: ", recieverId);
    console.log("messages :", messages);

    await Message.updateMany(
      { sender: recieverId, reciever: senderId, read: false },
      { $set: { read: true } }
    );

    res.status(200).json(messages);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};

exports.getUnreadMessagesCount = async (req, res) => {
  const userId = req.user;

  console.log("userId :D", userId);

  try {
    const unreadCount = await Message.countDocuments({
      reciever: userId,
      read: false,
    });

    console.log("unreadCount", unreadCount);
    res.status(200).json({ unreadCount });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching unread messages count",
      error: error.message,
    });
  }
};

exports.getUnreadMessagesCounts = async (req, res) => {
  const userId = req.user;

  try {
    const users = await User.find();
    const unreadCounts = {};

    for (const user of users) {
      const count = await Message.countDocuments({
        reciever: userId,
        sender: user._id,
        read: false,
      });
      unreadCounts[user._id] = count;
    }

    res.status(200).json({ unreadCounts });
  } catch (error) {
    console.error("Error fetching unread messages counts", error);
    return res.status(500).json({
      message: "Error fetching unread messages counts",
      error: error.message,
    });
  }
};
