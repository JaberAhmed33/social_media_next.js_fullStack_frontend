import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Moment from "react-moment";
import parse from "html-react-parser";
import { Popover , Image } from "antd";
import { imageAvatar } from "../../functions/index";
import ChatBtns from "./ChatBtns";

function MessagesList({
  messages,
  handleDelete,
  handleLike,
  handleUnlike,
  isScrollDown,
}) {

  const scrollEle = useRef();

  let float = "start";

  useEffect(() => {

    if(isScrollDown) {
      scrollDown();
    }

  },[messages]);

  const scrollDown = () => {
    scrollEle.current.scrollBy(0, scrollEle.current.scrollHeight);
  };


  return (
    <>
     
      <div className="container scroll-comments" ref={scrollEle}>
       {messages && messages.map((message) => { 
       
       float === "start" ? float = "end" : float = "start";

        return (
         
          <div key={message._id} className= {`row d-flex justify-content-${float} align-items-center mb-3`}>
            <small className="text-center text-muted mb-2">
              <Moment fromNow>{message.createdAt}</Moment>
            </small>
            <div className="col-md-2">
            <Link href={`/user/${message.sendBy.username}`}> 
              {imageAvatar(message.sendBy, 30)}
              <p>{message.sendBy.name}</p>
            </Link>
            
            </div>
            
            
    
            <Popover content={<ChatBtns 
            handleDelete = {handleDelete} 
            message = {message} 
            handleLike = {handleLike} 
            handleUnlike = {handleUnlike}
            />}>
                <div className={`col-md-4 card mb-1 bg-light ${message.likes.length > 0 && "like-tag"}`} data-tag = {message.likes.length}>
                  <div className=" scroll-message">
                    <span>{parse(message.message)}</span>
                    <div className="text-center mb-1">
                      {message.image && message.image.url && (<Image width={96} src={message.image.url}/>)}
                    </div>
                  </div>
                </div>
            </Popover>
 
{/* 
            <Tooltip placement="top" Description={<ChatBtns handleDelete = {handleDelete} message = {message}/>} color = {'volcano'}>
              <div className="col-md-4 card mb-1 bg-light scroll-message">
                <span>{parse(message.message)}</span>
                <div className="text-center mb-1">
                  {message.image && message.image.url && (<Image width={96} src={message.image.url}/>)}
                </div>
              </div>
            </Tooltip> */}
            
        
          </div>
        )
      }
       )}
      </div>
    </>
  );
}

export default MessagesList;
