import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import CreatePostForm from "../../../components/forms/CreatePostForm";
import UserRoute from "../../../components/routes/UserRoute";
import { toast } from 'react-toastify';


function Editpost() {
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [image, setimage] = useState({});
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { _id } = router.query;

  useEffect(() => {
    _id && fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      console.log(_id);

      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      setContent(data.content);
      setimage(data.image)
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/update-post/${_id}`, { content, image });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post updated");
        router.push("/user/dashboard");
      }

    } catch (err) {
      console.log(err);
    }
  };
 

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      setimage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
      toast.success("Uploaded Image Done.");
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row bg-image py-3">
          <div className="col text-center">
            <h1 className="text-light">Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </div>

        </div>
      </div>
    </UserRoute>
  );
}

export default Editpost;
