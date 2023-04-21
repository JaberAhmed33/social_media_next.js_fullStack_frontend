import { Loading3QuartersOutlined } from "@ant-design/icons";

function ForgotPasswordForm(props) {
  const {
    newPassword,
    email,
    secret,
    loading,
    setNewPassword,
    setEmail,
    setSecret, 
    handleSubmit,
  } = props;

  
  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="form-group p-2">
          <small>
            <label className="text-muted">Your New Password</label>
          </small>
          <input
            value={newPassword}
            type="password"
            className="form-control"
            placeholder="Enter Your New Password"
            onChange={(e) => {
              setNewPassword(e.target.value);
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
          />
        </div>

   <>
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
    </>

        <div className="form-group p-2">
          <button
            disabled = {!newPassword || !email || !secret || loading}
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

export default ForgotPasswordForm;
