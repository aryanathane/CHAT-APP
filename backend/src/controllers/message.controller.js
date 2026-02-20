import cloudinary from "../config/cloudinary.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    // get logged in user id from req.user set by protectRoute middleware
    const loggedInUserId = req.user._id;

    // fetch all users except the logged in user and exclude password field
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.error("Error in getAllContacts controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    // get logged in user id and the target user id from route params
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    // fetch all messages between the two users in both directions
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId }
      ]
    });

    res.status(200).json(messages);

  } catch (error) {
    console.error("Error in getMessagesByUserId controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const sendMessages = async (req, res) => {
  try {
    // extract text and image from request body and receiver id from route params
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // if image is provided upload it to cloudinary and get the secure url
    let imageUrl;
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    // create and save the new message document to the database
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: send the message in real time if user is online.

    res.status(201).json(newMessage);

  } catch (error) {
    console.error("Error in sendMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getCharPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all messages where the logged in user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId }
      ]
    });

    // extract unique chat partner ids by filtering out the logged in user id
    const chatPartnersIds = [
      ...new Set(
        messages.map(msg =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      )
    ];

    // fetch chat partner user details and exclude password field
    const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");

    res.status(200).json(chatPartners);

  } catch (error) {
    console.error("Error in getCharPartners controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};