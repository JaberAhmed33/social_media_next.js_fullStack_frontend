import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { List } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from 'react-toastify';
import { imageAvatar } from "../../functions";

function Following() {
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      fetchFollowing();
    }
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleUnfollow = async (user) => {
    const { data } = await axios.put("/user-unfollow", {_id: user._id});

    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = data;
    localStorage.setItem("auth", JSON.stringify(auth));
    setState({...state, user: data});

    const filtered = people.filter((p) => p._id !== user._id);
    setPeople(filtered);

    toast.success(`Unfollowed ${user.name}`);

    }
  

  return (
    <div className="row col-md-8 offset-md-2">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={imageAvatar(user)}
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary cursor-pointer"
                  >
                    Unfollow
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <hr />
      <Link href={"/user/dashboard"} className="d-flex justify-content-center pt-5 h5">
        <RollbackOutlined />
      </Link>
    </div>
  );
}

export default Following;
