function BgImage({url, children = "FaceDook"}) {
  return (
    <>
      <div className="col"
        style={{
          backgroundImage: "url(" + url + ")",
          backgroundAttachment: "fixed",
          padding: "100px 0px 75px 0px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          display: "block"
        }}
      >
        <h1 className="display-1 text-light text-center font-weight-bold logo">
          {children}
        </h1>
      </div>
    </>
  );
}

export default BgImage;
