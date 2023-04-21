import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import BgImage from "../../components/cards/BgImage";
import parse from "html-react-parser";
import AdminRoute from "../../components/routes/AdminRoute";
import { List, Avatar } from 'antd';
import { imageAvatar } from "../../functions";

function Admin() {
  const [state, setState] = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleDelete = async (id) => {
    try {
      const answer = window.confirm("Are You sure to Delete This Post?");

      if (!answer) return;

      await axios.delete(`/admin/delete-post/${id}`);
      toast.error("Post is Deleted.");
      newsFeed();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row">
          <BgImage
            url={"../images/c6573d5a766e2b58f3ccee4b92636159.jpg"}
            children={"Admin"}
          />
        </div>
        
        <div className="row py-4">
          <div className="col-md-8 offset-md-2">
            {state.token && posts &&
              <List
              itemLayout="horizontal"
              dataSource={posts}
              renderItem={(post) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={imageAvatar(post.postedBy, 30)}
                    title={post.postedBy.name}
                    description={parse(post.content)}
                  />
                    {post.image && post.image.url && (<Avatar shape="square" size={64} src={post.image.url}/>)}
                    <button className="btn text-danger ms-5" onClick={() => handleDelete(post._id)}>Delete</button>
                </List.Item>
              )}
            />
            }
          </div>
        </div>
       
        
      </div>
    </AdminRoute>
  );
}

export default Admin;
