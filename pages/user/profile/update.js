import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import AuthForm from "../../../components/forms/AuthForm";
import {useRouter} from "next/router";
import { UserContext } from "../../../context";
import { Loading3QuartersOutlined, CameraOutlined } from "@ant-design/icons";
import BgImage from "../../../components/cards/BgImage";

const ProfileUpdate = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setloading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if(state && state.user ){
    setUsername(state.user.username);
    setAbout(state.user.about);
    setName(state.user.name);
    setEmail(state.user.email);
    setImage(state.user.image);

    }
  },[state && state.user]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.put(`/profile-update`,
        {
          username,
          name,
          password,
          email,
          secret,
          about,
          image
        }
      );

      if(data.error){
        toast.error(data.error);
        setloading(false);
      }else{

        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));

        
        setState({...state, user: data});

        setOk(true);
        setloading(false);
      }
      
    } catch (err) {

      console.log(err);
      setloading(false);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {

      const {data} = await axios.post('/upload-image', formData);
      setImage({
        url: data.url,
        public_id: data.public_id
      });
      console.log(image)
      setUploading(false);
      toast.success("Uploaded Image Done.");
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <BgImage url={"../../images/c6573d5a766e2b58f3ccee4b92636159.jpg"} children = {"Profile"} />
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3 bg-light">

          <label className="cursor-pointer d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={50} src={image.url} className="mt-1" />
            ) : uploading ? (
              <Loading3QuartersOutlined className="h4" spin={true} />
            ) : (
              <CameraOutlined className="h4" />
            )}
            <input
              onChange={handleImage}
              type={"file"}
              hidden={true}
              accept={"images/*"}
            />
         </label>

          <AuthForm
            handleSubmit = {handleSubmit}
            name = {name}
            setName = {setName}
            username = {username}
            setUsername = {setUsername}
            password = {password}
            setPassword = {setPassword}
            email = {email}
            setEmail = {setEmail}
            secret = {secret}
            setSecret = {setSecret}
            about = {about}
            setAbout = {setAbout}
            loading = {loading}
            page= "profileUpdate"
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
            <p className="text-success">you have successfully updated your profile.</p>
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

export default ProfileUpdate;
