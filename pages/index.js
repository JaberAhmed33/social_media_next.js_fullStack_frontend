import { useState, useEffect, useContext } from "react";
import BgImage from "../components/cards/BgImage";
import axios from "axios";
import Post from "../components/cards/Post";
import Head from 'next/head';
import io from "socket.io-client";
import ChatIcon from "../components/images/ChatIcon";
import { UserContext } from "../context/index"

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
  reconnection: true,
}); 

const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [posts, setPosts] = useState([]);
  const [state] = useContext(UserContext);

  useEffect(() => {
    socket.on("new-post", (newPost) => {
      setNewsFeed([
        newPost,
        ...posts,
      ]);
    })
    getPosts()
  }, []);

//make header dynamic (vedio course #43)
  const head = () => (
    <Head>
        <title>FaceDook - A social network by Jaber Ahmed inspired by Code With Ramy </title>
        <meta name="description" content="A social network by Jaber Ahmed" />
        <meta property="og:description" content="A social network by Jaber Ahmed" />
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="FaceDook"/>
        <meta property="og:url" content="http://facedook.com"/>
        <meta property="og:image:secure_url" content="http://facedook.com/images/logo.png"/>
    </Head>

  );

   async function getPosts() {
       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/posts`);
       setPosts(data);
    }

  const mixedPosts = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
    {head()}
    <div className="container-fluid">
        <div className="row">
          <BgImage url={"../images/c6573d5a766e2b58f3ccee4b92636159.jpg"} />
        </div>
      </div>

      <div className="container">
        <div className="row pt-5">
          {mixedPosts.map((post) => (
            <div key={post._id}  className="col-md-4" >
              <Post post={post} clickable = {true} postPublic = {true}/>
            </div>
          ))}
        </div>
      </div>
      {state && state.token && <ChatIcon />}
    </>
  );
};

// export async function getServerSideProps() {
//   //not dynamic url
//   const { data } = await axios.get("http://localhost:7000/api/posts");
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }

export default Home;
