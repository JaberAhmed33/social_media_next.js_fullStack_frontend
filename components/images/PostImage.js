import {Image } from "antd";

function PostImage({ url, name }) {
  return (
    <div className="mt-3 text-center">
      <Image width={"50%"} src={url} alt={name} className=" rounded "/>
    </div>
  );
}

export default PostImage;
