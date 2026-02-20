import cloudinary from "../config/cloudinary.js";
import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
      

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.error("Error in getAllContacts controller:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getMessagesByUserId=async (req,res)=>{
    try {
        const myId=req.user._id;
        const {id:userToChatId}=req.params;

        const message=await Message.find({$or:[{senderId:myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}]});

        res.json(200).json(message);

    } catch (error) {
        console.error("Error in getMessagesByUserId controller:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const sendMessages=async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadedResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadedResponse.secure_url;
        }

        const newMessage=new message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        })

        await newMessage.save();

        // todo:send the message in real time if user is online.

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in getMessagesByUserId controller:", error.message);
        res.status(500).json({ message: "Internal server error." });
    }
}