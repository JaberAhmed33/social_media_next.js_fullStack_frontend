import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import {useRouter} from "next/router";
import { UserContext } from "../context";
import BgImage from "../components/cards/BgImage";


const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
      const { data } = await axios.post(`/register`,
        {
          name,
          password,
          email,
          secret,
        }
      );

      setName("");
      setPassword("");
      setEmail("");
      setSecret("");

      setOk(data.ok);
      setloading(false);
    } catch (err) {
      toast.error(err.response.data);
      setloading(false);
    }
  };

  state && state.token && router.push("/");

  return (
    <div className="container-fluid">
      <div className="row">
      <BgImage url={"../images/c6573d5a766e2b58f3ccee4b92636159.jpg"} children = {"Register"} />
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3 bg-light">

          <AuthForm
            handleSubmit = {handleSubmit}
            name = {name}
            setName = {setName}
            password = {password}
            setPassword = {setPassword}
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
            <p className="text-success">you have successfully registered.</p>
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          </Modal>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <p className="text-center">
            Already registered?{" "}
            <Link href={"login"} >Login</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;
