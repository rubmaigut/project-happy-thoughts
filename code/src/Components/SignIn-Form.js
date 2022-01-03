import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory, } from "react-router-dom"
import { Link } from "react-router-dom";
import { existingUser} from "../ServiceAPI/ApiServices";
import { user } from "../reducers/user"
import { useSelector, } from "react-redux";

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ error ,setError]= useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      history.push("/thoughts");
    }
  }, [accessToken]);

  const onSubmitLogin = async()=>{
    const {userExist, error400} = await existingUser(username, password)

    if (userExist) {
      dispatch(user.actions.setUser(userExist))
        history.push("/thoughts")
    }else{
      setError(error400)
      return(error)
    }
  }

  return (
    <main className="signin-form">
      <img className="logo" src="./assets/mind.svg" alt="happy-mind" />
      <h3>Enter your information</h3>
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
      <Link to={"/signup"}>
        <button className="go-to-button">Go to Sign Up</button>
        </Link>
      <button onClick={onSubmitLogin} className="enter-button"> Enter</button>
    </main>
  );
};
  export default SignIn;