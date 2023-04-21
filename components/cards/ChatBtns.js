import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../routes/UserRoute";
import CreatemessageForm from "./../../components/forms/ChatForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "./PostsList";
import People from "./People";
import Link from "next/link";
import { Button } from "antd";
import CommentForm from "../forms/CommentForm";
import SearchBar from "../SearchBar";
import BgImage from "./BgImage";
import io from "socket.io-client";
import MessagesList from "./MessagesList";
import { DeleteOutlined, HeartOutlined, HeartFilled} from "@ant-design/icons";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
});

function ChatBtns({ handleDelete, message, handleLike, handleUnlike }) {
    const [state] = useContext(UserContext);

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-between">
          
          {state && message.likes.includes(state.user._id) ? (
                <HeartFilled
                  onClick={() => handleUnlike(message._id)}
                  className="h5 ichigo"
                />) 
              :(<HeartOutlined onClick={() => handleLike(message._id)} className="h5 ichigo"/>)
          }
          {state.user._id === message.sendBy._id && 
           (<DeleteOutlined onClick={() => handleDelete(message)} className="h5 text-danger"/>)}
        </div>
      </div>
    </>
  );
}

export default ChatBtns;
