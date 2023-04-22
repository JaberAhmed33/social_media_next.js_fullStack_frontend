import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Moment from "react-moment";
import parse from "html-react-parser";
import PostsImage from ".././images/PostImage";
import {
  HeartFilled,
  CommentOutlined,
  HeartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { imageAvatar } from "../../functions";
import Link from "next/link";

function Post({
  post,
  commentsCount = 2,
  removeComment,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  clickable,
  postPublic
}) {
  const [state] = useContext(UserContext);
  const router = useRouter();

  return (
    <>
    {post && post.postedBy && 
    (<div key={post._id} className="card mt-5 mb-5" >
            <div className="card-header">
             

              <Link href={clickable ? `/user/${post.postedBy.username}` : "/login"}> 
                {imageAvatar(post.postedBy, 40)}
                {""}
                <span className="pt-2 ms-3 h5 ichigo">{post.postedBy.name}</span>
              </Link>
              
              <span className="pt-2 ms-3">
                <small className="text-muted">
                  <Moment fromNow>{post.createdAt}</Moment>
                </small>
              </span>
            </div>

            {clickable && !postPublic

            ?(<div className="card-body cursor-pointer" onClick={() => router.push(`/post/${post._id}`)}>
              {parse(post.content)}
              {post.image && (
                <PostsImage url={post.image.url} name={post.postedBy.name} />
              )}
            </div>)

           : clickable && postPublic

           ?(<div className="card-body cursor-pointer" onClick={() => state && state.user 
            ?router.push(`/post/${post._id}?public=true`)
            :router.push(`/login`)
          }>
              {parse(post.content)}
              {post.image && (
                <PostsImage url={post.image.url} name={post.postedBy.name} />
              )}
           </div>)
           
           :(<div className="card-body">
              {parse(post.content)}
              {post.image && (
                <PostsImage url={post.image.url} name={post.postedBy.name} />
              )}
           </div>)
           

            }


            <div className="card-footer">
              {state && !postPublic && post.likes.includes(state.user._id) ? (
                <HeartFilled
                  onClick={() => handleUnlike(post._id)}
                  className="h5 ichigo"
                />) 
              :!postPublic
              ?(<HeartOutlined onClick={() => handleLike(post._id)} className="h5 ichigo"/>)
              : (<HeartOutlined className="h5 ichigo"/>)
            }
              <small className="ms-1 text-muted">{`${post.likes.length} Likes`}</small>

              {!postPublic ?
                ( <CommentOutlined
                    onClick={() => handleComment(post)}
                    className="h5 ms-3"
                />
                ):( <CommentOutlined
                  className="h5 ms-3"
                  />)
              }

              <small className="ms-1 text-muted ">
                {" "}
                {post.comments.length}{" "}
                <span>Comments</span>
              </small>

              {state && state.user && !postPublic && state.user._id === post.postedBy._id && (
                <>
                 < DeleteOutlined
                    className="h6 float-end text-danger"
                    onClick={() => handleDelete(post)}
                  />
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="h6 me-3 text-muted float-end"
                  />
                </>
              )}
            </div>
           
            {post.comments && post.comments.length > 0 && (
              <ul className="list-group scroll-comments">
                {post.comments.slice(0, commentsCount).map((comment) => (
                  <li
                    className="list-group-item"
                    key={comment._id}
                  >
                    <div className="d-flex gustify-content-between align-items-center"
                    >
                      <div className="ms-2 me-auto">                   
                      {imageAvatar(comment.postedBy, 30)}
                
                      &nbsp;{comment.postedBy.name}
                      </div>

                      <span className="badge rounded-pill text-muted">
                        <Moment fromNow>{comment.createdAt}</Moment>
                      </span>

                      {state && state.user && !postPublic && state.user._id === comment.postedBy._id && (
                        <DeleteOutlined 
                          onClick={() => removeComment(post._id, comment)}
                          className="ps2 text-danger cursor-pointer"
                        />
                      )}
                    </div>

                    <div className="p-1 bg-comment"><p className=" mb-0 ms-5">{comment.text}</p></div>

                  </li>
                ))}
              </ul>
            )}

          </div>)}
    </>
  );
}

export default Post;
