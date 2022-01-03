import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UserForm = () => {
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (accessToken) {
      history.push("/thoughts");
    }
  }, [accessToken]);

    return (
    <main className="login">
      <div className="image-section">
      <img className="happy-t" src="./assets/think-happy-thoughts.jpg" alt="happy-things"/>
      </div>

      <div className="user-section"> 
      <img className="logo" src="./assets/mind.svg" alt="happy-mind"/>
      <h2>Join to Happy-Toughts today.</h2>
      <div className="new-user">
       <Link to={"/signup"}>
        <button className="signup-button">Sign Up</button>
        </Link>
      </div>

      <div className="existing-user">
        <Link to={"/signin"}>
        <button 
        className="login-button"> Log in</button>
        </Link>
      </div>
      </div>
    </main>
  );
};
export default UserForm;
