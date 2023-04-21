import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import { UserContext } from "../context";
import ForgotPasswordForm from './../components/forms/ForgotPasswordForm';


const ForgotPassword = () => {
  // const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setloading] = useState(false);
  const [state] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post(`/forgot-password`,
        {
          newPassword,
          email,
          secret,
        }
      );

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      }

      if (data.success){
        setNewPassword("");
        setEmail("");
        setSecret("");
  
        setOk(true);
        setloading(false);
      }
     
    } catch (err) {
      toast.error(err);
      setloading(false);
    }
  };

  state && state.token && router.push("/");

  return (
    <div className="container-fluid">
      <div className="row bg-image py-3 ">
        <div className="col text-center">
          <h1 className="text-light">Forgot Password</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3 bg-light">

          <ForgotPasswordForm
            handleSubmit = {handleSubmit}
            newPassword = {newPassword}
            setNewPassword = {setNewPassword}
            email = {email}
            setEmail = {setEmail}
            secret = {secret}
            setSecret = {setSecret}
            loading = {loading}
            page= "register"
          />

        </div>
      </div>

      <div className="row">
        <div className="col">
          <Modal
            title="congrats"
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p className="text-success">you have successfully reset your password.</p>
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          </Modal>
        </div>
      </div>


    </div>
  );
};

export default ForgotPassword;
