const Message = require("../models/message");
const User = require("../models/user");

exports.sendMessage = async (req, res) => {
  const { recieverId, content } = req.body;

  try {
    const sender = await User.findById(req.user);
    const reciever = await User.findById(recieverId);

    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    } else if (!reciever) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    console.log("Sender: ", sender);
    console.log("Sender ID: ", sender.id);

    console.log("Reciever", reciever);
    console.log("Reciever ID: ", reciever.id);

    const newMessage = new Message({
      sender: sender.id,
      reciever: reciever,
      content,
    });

    await newMessage.save();

    res.status(200).json({ message: "Message sent successfully!", newMessage });
  } catch (error) {
    console.error("Error sending message: ", error);
    return res
      .status(500)
      .json({ message: "Error sending message", error: error.message });
  }
};

exports.getMessagesBetweenUsers = async (req, res) => {
  try {
    const messages = await Message.find({});

    console.log("messages", messages);
    res
      .status(200)
      .json({ message: "Message retrieved successfully", messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching messages", error: error.message });
  }
};
