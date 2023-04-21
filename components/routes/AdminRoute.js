import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../../context";

const AdminRoute = ({ children }) => {
  const [ok, setOk] = useState(false);
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    state && state.token && getCurrntAdmin();
  }, [state && state.token]);

  const getCurrntAdmin = async () => {
    try {
      const { data } = await axios.get(`/current-admin`);

      if (data.ok) setOk(true);
    } catch (err) {
        console.log(err);
        router.push("/");
    }
  };

  process.browser && state === null && setTimeout(() => {
    getCurrntUser();
  },1000)

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-primary p-5"
    ></SyncOutlined>
  ) : (
    <>
        { children }
    </>
  );
};

export default AdminRoute;