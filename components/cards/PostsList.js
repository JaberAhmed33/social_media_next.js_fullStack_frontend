import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Moment from "react-moment";
import parse from "html-react-parser";
import {
  HeartFilled,
  CommentOutlined,
  HeartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { imageAvatar } from "../../functions";
import Link from "next/link";
import Post from "./Post";

function PostList({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment
}) {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post 
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            removeComment = {removeComment}
            key={post._id}
            clickable = {true}
          />
         ))}
    </>
  );
}

export default PostList;
