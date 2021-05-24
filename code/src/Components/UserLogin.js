import React, { useState } from "react";
import { useHistory, } from "react-router-dom";
import {createUser, existingUser } from "../ServiceAPI/ApiServices";

const UserLogin = ({ setUserExist }) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [userExistInput, setUserExistInput] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const [errorUserValidation, setErrorUserValidation]= useState(false);

  const submitNewUser = async (username) => {
    const { userCreated, error400 } = await createUser(username);
    setLengthError(error400);

    if (userCreated) {
      setUserExist(username);
      history.push("/thoughts")
    }else{
      setLengthError(true)
    }
  };

  const validateExistingUser = async (username) => {
    const userList = await existingUser(username);
    const userExist = userList.users.find((user) => user.username === username);

    if (userExist) {
      setUserExist(username);
      history.push("/thoughts")
    } else {
      setErrorUserValidation(true)
    }
  };

  return (
    <main className="login">
      <div className="login-header">
      <img classname="gif" src="./assets/happy-thoughts.gif" alt="happy-things"/>
      </div>
      <div className="new-user">
        <p className="paragrah"> Sign Up and send happy vibes</p>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="text-container"
          value={username}
        ></input>
        {lengthError ? <p>Something went wrong, please try again</p>: null}
        <div className="button">
          <button onClick={() => submitNewUser(username)} type="submit" className="send-button">
            Sign Up
          </button>
        </div>
      </div>

      <div className="existing-user">
        <p className="paragrah">Sign In with an existing user </p>
        <input
          type="text"
          onChange={(e) => setUserExistInput(e.target.value)}
          className="text-container"
          value={userExistInput}
        ></input>
          {errorUserValidation ? <p>The user was not found in the database</p>: null}
        <div className="button">
          <button
            onClick={() => validateExistingUser(userExistInput)}
            type="submit"
            className="send-button"
          >
            Log in
          </button>
        </div>
      </div>
    </main>
  );
};
export default UserLogin;
