import React, { useState } from "react";
import { Link, Route, useHistory, } from "react-router-dom";
import {createUser, existingUser } from "../ServiceAPI/ApiServices";
import SignUp from "./SignUp-Form";
import SignIn from "./SignIn-Form";

const UserForm = () => {
  return (
    <main className="login">
      <div className="image-section">
      <img classname="happy-t" src="./assets/think-happy-thoughts.jpg" alt="happy-things"/>
      </div>

      <div className="user-section"> 
      <div className="new-user">
       <Link to={"/signup"}>
        <button className="signup-button">Sign Up</button>
        </Link>
      </div>

      <div className="existing-user">
        <Link to={"/signin"}>
        <button className="login-button"> Log in</button>
        </Link>
      </div>
      </div>
    </main>
  );
};
export default UserForm;
