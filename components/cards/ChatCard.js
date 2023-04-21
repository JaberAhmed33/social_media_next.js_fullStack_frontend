import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import CreatemessageForm from "./../../components/forms/ChatForm";
import axios from "axios";
import { toast } from 'react-toastify';

import io from "socket.io-client";
import MessagesList from "./MessagesList";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
}); 

function ChatCard() {
  const [state] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);


  useEffect(() => {

      socket.on("new-message", () => {
        // setNewsFeed([...newsFeed,newMessage.data])
        getMesages();
      })

      if(state && state.token) {
        setIsScrollDown(true);
        getMesages();
      }   

  },[]);




  const messageSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.post("/create-message", { message, image });
      if (data.error) {
        toast.error(data.error);
      } else {
        
        getMesages();
        setIsScrollDown(true);
        toast.success("message send.");
        setMessage("");
        setImage({});
        socket.emit("new-message", data)
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {

      const {data} = await axios.post('/upload-image', formData);
      setImage({
        url: data.url,
        public_id: data.public_id
      });
      setUploading(false);
      toast.success("Uploaded Image Done.");
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  }

  const getMesages = async () => {

    try {

      const {data} = await axios.get(`/all-messages`);
      setMessages(data);

    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (message) => {
    try {
      const answer = window.confirm("Are You sure to Delete This Message?");

      if(!answer) return;

      await axios.delete(`/delete-message/${message._id}`);
      toast.error("Message is Deleted.");
      setIsScrollDown(false);
      socket.emit("new-message")
      getMesages();
  
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async(_id) => {
    try {
      await axios.put("/like-message", {_id});
      setIsScrollDown(false);
      socket.emit("new-message")
      getMesages();

    } catch (err) {
      console.log(err);
    }
  }  
  
  const handleUnlike = async(_id) => {
    try {
      await axios.put("/unlike-message", {_id});
      setIsScrollDown(false);
      socket.emit("new-message")
      getMesages();
      
    } catch (err) {
      console.log(err);
    }
  }

   

  // const mixedMessages = newsFeed.length > 0 ? newsFeed : messages;
  // console.log(mixedMessages);


  return (
    <>
      <div className="container-fluid">
        <div className="row py-3">
          <MessagesList messages={messages} 
          handleDelete = {handleDelete} 
          handleLike = {handleLike} 
          handleUnlike = {handleUnlike}
          isScrollDown = {isScrollDown}
          />

          <div className="col-md-12">
            <CreatemessageForm
              message={message}
              setMessage={setMessage}
              messageSubmit={messageSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatCard;
