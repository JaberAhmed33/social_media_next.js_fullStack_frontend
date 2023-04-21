import { useContext } from "react";
import { UserContext } from "../../context";
import { DeleteOutlined, HeartOutlined, HeartFilled} from "@ant-design/icons";



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
