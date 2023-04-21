import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";
import Post from "../../components/cards/Post";
import { Modal } from "antd";
import CommentForm from "./../../components/forms/CommentForm"

function PostComment() {
    const [post, setPost] = useState({});
    const router = useRouter();
    const _id = router.query._id;
    const [comment, setComment] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState({});


    useEffect(() => {
        if(_id) fetchPost();
    }, [_id]);

    const fetchPost = async () => {
        try {
            const {data} = await axios.get(`/user-post/${_id}`);
            setPost(data);
        } catch (err) {
            console.log(err);
        }
    };

    const removeComment = async(postId, comment) => {

        const answer = window.confirm("Are You sure to Delete This comment?");

        if(!answer) return;
  
        await axios.put("/remove-comment", {postId, comment});

        fetchPost();
      }

      const handleDelete = async (post) => {
        try {
    
          const answer = window.confirm("Are You sure to Delete This Post?");
    
          if(!answer) return;
    
          await axios.delete(`/delete-post/${post._id}`);
          toast.error("Post is Deleted.");
          router.push("/user/dashboard")
      
        } catch (err) {
          console.log(err);
        }
      };
    
    
      const handleLike = async(_id) => {
        try {
          await axios.put("/like-post", {_id});
          fetchPost();

        } catch (err) {
          console.log(err);
        }
      }  
      
      const handleUnlike = async(_id) => {
        try {
          await axios.put("/unlike-post", {_id});
          fetchPost();

        } catch (err) {
          console.log(err);
        }
      }

      const handleComment = (post) => {
        setCurrentPost(post);
        setVisible(true);
      }
    
      const addComment = async (e) => {
        e.preventDefault();
    
        try {
          const {data} = await axios.put("/add-comment", {
            postId: currentPost._id,
            comment
          });
          
          setComment("");
          setVisible(false);
          fetchPost();
    
        } catch (err) {
          console.log(err)
        }
      }

    return ( 
    <>
       <div className="container-fluid bg-dark">
        <div className="row py-3 ichigo bg-defailt-image">
            <div className="col text-center">
                <h1>facedook</h1>
            </div>
        </div>

        <div className="container col-md-8 offset-md-2 pt-1">
                <Post post = {post} commentsCount = {100} removeComment = {removeComment} 
                handleDelete={handleDelete}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                handleComment = {handleComment}
                />
        </div>

       {!router.query.public ?
       
        ( <Link href={"/user/dashboard"} className="d-flex justify-content-center p-5">
            <RollbackOutlined />
        </Link>
        ):( <Link href={"/"} className="d-flex justify-content-center p-5">
        <RollbackOutlined />
        </Link>
        )
        }
       </div>
       
       <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={true}
        >
          <CommentForm 
            setComment = {setComment} 
            comment = {comment}
            addComment = {addComment}
          />

        </Modal>
       </>
     );
}

export default PostComment;