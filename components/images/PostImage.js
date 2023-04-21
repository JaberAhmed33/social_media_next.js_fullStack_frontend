function PostImage({ url, name }) {
  return (
    <div className="mt-3 text-center">
      <img
        className="img-fluid rounded "
        src={url}
        alt={name}
      />
    </div>
  );
}

export default PostImage;
