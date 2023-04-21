
import Post from "./Post";

function PostList({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment
}) {
 
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
