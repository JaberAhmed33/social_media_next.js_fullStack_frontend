import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { Card } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";
import Moment from "react-moment";
import { imageAvatar } from "../../functions";

const { Meta } = Card;

function Username() {
  const [state, setState] = useContext(UserContext);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      fetchUser();
    }
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/user/${router.query.username}`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (user) => {
    const { data } = await axios.put("/user-unfollow", { _id: user._id });

    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth", JSON.stringify(auth));
    setState({ ...state, user: data });

    const filtered = people.filter((p) => p._id !== user._id);
    setPeople(filtered);

    toast.success(`Unfollowed ${user.name}`);
  };

  console.log(user)

  return (
    <div className="row col-md-6 offset-md-3">
      <div className="pt-5 pb-5">
        <Card
         style={{
            width: "90%",
            margin: "auto"
          }}
         
        cover={<img src={user.image ? user.image.url : "../../images/c6573d5a766e2b58f3ccee4b92636159.jpg" } style={{
            height: "300px",
            margin: "auto",
            objectFit: "cover"
          }} alt={user.name} />}
        >

          <Meta 
           title={user.name}
           description={user.about ? user.about : (<p>not found description for you, {<Link href={"/user/profile/update"}>Update Profile</Link>}</p>)}
           avatar= {user && user.name && imageAvatar(user, 50)}
           />
          <p className="pt-2 text-muted">
            Joined <Moment fromNow>{user.createdAt}</Moment>
          </p>
          <div className="d-flex justify-content-between">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>

            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </Card>

        <Link
          href={"/user/dashboard"}
          className="d-flex justify-content-center pt-5"
        >
          <RollbackOutlined />
        </Link>
      </div>
    </div>
  );
}

export default Username;
