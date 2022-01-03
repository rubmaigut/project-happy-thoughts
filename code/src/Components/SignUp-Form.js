import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { user } from "../reducers/user";
import { createUser } from "../ServiceAPI/ApiServices";
import { useSelector } from "react-redux";

const SignUp = ({}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      history.push("/thoughts");
    }
  }, [accessToken]);

  const onSubmit = async () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emailRegex.test(email)) {
      const { userInfo, error400 } = await createUser(
        email,
        username,
        password
      );

      if (userInfo) {
        dispatch(user.actions.setUser(userInfo));
        history.push("/thoughts");
      } else {
        setError(error400);
        return error;
      }
    }
  };

  return (
    <main className="signup-form">
      <img className="logo" src="./assets/mind.svg" alt="happy-mind" />
      <h1>Happening now</h1>
      <h3>Create your Account</h3>
      <label>Email</label>
      <input
        type="text"
        className="input"
        placeholder="enter your email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>

      <label>Username</label>
      <input
        type="text"
        className="input"
        placeholder=""
        onChange={(e) => setUsername(e.target.value)}
        required
        value={username}
      ></input>

      <label>Password</label>
      <input
        type="password"
        className="input"
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      ></input>
      <Link to={"/signin"}>
        <button className="go-to-button">Go to Log In</button>
      </Link>
      <button onClick={onSubmit} className="enter-button">
        {" "}
        Enter
      </button>
    </main>
  );
};
export default SignUp;
