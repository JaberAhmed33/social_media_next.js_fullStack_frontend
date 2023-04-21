import { Loading3QuartersOutlined } from "@ant-design/icons";

function AuthForm(props) {
  const {
    name,
    password,
    email,
    secret,
    loading,
    setName,
    setPassword,
    setEmail,
    setSecret,
    handleSubmit,
    page,
    username,
    about,
    setUsername,
    setAbout
  } = props;

  return (
    <>
    
    <form onSubmit={handleSubmit}>

     {page === "profileUpdate" &&  
        <>
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Username</label>
          </small>
          <input
            value={username}
            type="text"
            className="form-control"
            placeholder="Enter Your Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        
        <div className="form-group p-2">
          <small>
            <label className="text-muted">About</label>
          </small>
          <input
            value={about}
            type="text"
            className="form-control"
            placeholder="Tell Us Something About You ..."
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
        </div>
        </>}
      
        

        {page !== "login" && <div className="form-group p-2">
          <small>
            <label className="text-muted">Your Name</label>
          </small>
          <input
            value={name}
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>}

        <div className="form-group p-2">
          <small>
            <label className="text-muted">Your Password</label>
          </small>
          <input
            value={password}
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="form-group p-2">
          <small>
            <label className="text-muted">Your Email</label>
          </small>
          <input
            value={email}
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled = {page === "profileUpdate"}
          />
        </div>

   {  page !== "login" &&   <>
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Select a Question</label>
          </small>
          <select className="form-control">
            <option>What your favourite color?</option>
            <option>What your favourite car?</option>
            <option>What your favourite anime?</option>
          </select>
        </div>

        <small className="form-text text-muted">
          You can use this to reset your password.
        </small>

        <div className="form-group p-2">
          <input
            value={secret}
            type="text"
            className="form-control"
            placeholder="Enter Your Answer Here"
            onChange={(e) => {
              setSecret(e.target.value);
            }}
          />
        </div>
        </>}

        <div className="form-group p-2">
          <button
            disabled={
            page === "profileUpdate" ? loading : 
            page === "login"
            ? !password || !email || loading
            : !name || !password || !email || !secret || loading}
            className="btn btn-info col-12"
          >
            {loading ? (
              <Loading3QuartersOutlined spin={true} className="py-1" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
