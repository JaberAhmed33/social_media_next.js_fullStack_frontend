import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/authForm";
import {useRouter} from "next/router";
import { UserContext } from "../context";
import BgImage from "../components/cards/BgImage";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(false);
    const [state, setState] = useContext(UserContext);

    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setloading(true);
      try {
        const { data } = await axios.post(`/login`,
          {
            password,
            email,
          }
        );
  
        // setPassword("");
        // setEmail("");
        setloading(false);
        setState({
          user:data.user,
          token:data.token
        });

        window.localStorage.setItem("auth", JSON.stringify(data));

        router.push("/");

      } catch (err) {
        toast.error(err.response.data);
        setloading(false);
      }
    };
  
    
    state && state.token && router.push("/");

  
    return (
      <div className="container-fluid">
        <div className="row">
        <BgImage url={"../images/c6573d5a766e2b58f3ccee4b92636159.jpg"} children = {"Login"} />
        </div>
  
        <div className="row py-5">
          <div className="col-md-6 offset-md-3 bg-light">
  
            <AuthForm
              handleSubmit = {handleSubmit}
              password = {password}
              setPassword = {setPassword}
              email = {email}
              setEmail = {setEmail}
              loading = {loading}
              page= "login"
            />
  
          </div>
        </div>
  
        <div className="row">
          <div className="col">
            <p className="text-center">
              Not yet registered?{" "}
              <Link href={"register"} >Register</Link>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p className="text-center">
              <Link className="text-danger" href={"forgot-password"} >Forgot Password?</Link>
            </p>
          </div>
        </div>

      </div>
    );
}

export default Login;