const Login = () => {

  const google = () => {
    window.open('/auth/google/callback', '_self')
  }
  return (
    <div className="login">
      {/* <h1 className="loginTitle">Choose a Login Method</h1> */}
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src="" alt="google" />
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  )
}

export default Login;