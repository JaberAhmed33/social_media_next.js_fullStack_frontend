import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";
import { Avatar } from "antd";
import { CameraOutlined, Loading3QuartersOutlined } from "@ant-design/icons";

function CreatePostForm({
  content,
  setContent,
  postSubmit,
  handleImage,
  uploading,
  image,
}) {
  return (
    <div className="card">
      <div className="card-body bd-1">
        <form className="form-group">
          <QuillNoSSRWrapper
            className="form-control"
            placeholder="write something..."
            value={content}
            onChange={(e) => setContent(e)}
            theme="snow"
          ></QuillNoSSRWrapper>
        </form>
      </div>
      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary mt-1"
        >
          Post
        </button>
        <label className="cursor-pointer">
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
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
      </div>
    </div>
  );
}

export default CreatePostForm;
