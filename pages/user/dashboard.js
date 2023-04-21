import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "./../../components/routes/UserRoute";
import CreatePostForm from "./../../components/forms/CreatePostForm";
import axios from "axios";
import { toast } from 'react-toastify';
import PostList from './../../components/cards/PostsList';
import People from '../../components/cards/People';
import Link from "next/link";
import { Modal, Pagination } from "antd";
import CommentForm from "./../../components/forms/CommentForm"
import SearchBar from "../../components/SearchBar";
import BgImage from "../../components/cards/BgImage";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
}); 

function DashboardHome() {
  const [state, setState] = useContext(UserContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);



  useEffect(() => {

    if(state && state.token) {
      newsFeed();
      findPeople();
    } 

  },[state && state.token, page]);

  useEffect(() => {
    try {
      axios.get("/total-posts")
      .then(({data}) => setTotalPosts(data));
    } catch (err) {
      console.log(err);
    }
  },[posts]);

  
  const newsFeed = async () => {

    try {

      const {data} = await axios.get(`/news-feed/${page}`);
      setPosts(data);
      
    } catch (err) {
      console.log(err);
    }
  }


  const findPeople = async () => {
    try {
      const {data} = await axios.get('/find-people');
      setPeople(data)
    } catch (err) {
      console.log(err);
    }
  }

  const postSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/create-post", { content, image });


      if (data.error) {
        toast.error(data.error);
      } else {

        newsFeed();
        setPage(1); 
        toast.success("Post created");
        setContent("");
        setImage({});
        socket.emit("new-post", data)
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

  const handleDelete = async (post) => {
    try {

      const answer = window.confirm("Are You sure to Delete This Post?");

      if(!answer) return;

      await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post is Deleted.");
      newsFeed();
  
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async(user) => {
    try {

      const {data} = await axios.put("/user-follow", {_id: user._id});

      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      
      setState({...state, user: data});

      const filtered = people.filter((p) => p._id !== user._id);

      setPeople(filtered);
      newsFeed();
      toast.success(`Following ${user.name}`);
  
    } catch (err) {
      console.log(err);
    }
  }

  const handleLike = async(_id) => {
    try {
      await axios.put("/like-post", {_id});
      newsFeed();
  
    } catch (err) {
      console.log(err);
    }
  }  
  
  const handleUnlike = async(_id) => {
    try {
      await axios.put("/unlike-post", {_id});
      newsFeed();
      
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
      newsFeed();

    } catch (err) {
      console.log(err)
    }
  }

  const removeComment = async(postId, comment) => {

    const answer = window.confirm("Are You sure to Delete This comment?");

    if(!answer) return;

    await axios.put("/remove-comment", {postId, comment});

    newsFeed();
  }

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row">
        <BgImage url={"../images/c6573d5a766e2b58f3ccee4b92636159.jpg"} children = {"News Feed"} />
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <PostList
              posts = {posts}
              handleDelete = {handleDelete} 
              handleLike = {handleLike}
              handleUnlike = {handleUnlike}
              handleComment = {handleComment}
              removeComment = {removeComment}
             />

             <Pagination
              current={page}
              defaultCurrent={1}
              total={Math.round((totalPosts / 2) * 10)}
              onChange={(value) => setPage(value)}
             />
             <br />
             <br />
          </div>
          
          <div className="col-md-4">
            <SearchBar />
            <br />
            {state && state.user && state.user.following && (
              <Link href={"/user/following"} className="h6">
                {state.user.following.length}{" "}
                following
              </Link>
            )}
            <People people={people} handleFollow={handleFollow}/>
          </div>
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

      </div>
    </UserRoute>
  );
}

export default DashboardHome;
