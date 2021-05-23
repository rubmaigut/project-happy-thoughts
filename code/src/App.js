import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserLogin from "./Components/UserLogin";
import PostThoughts from "./Components/Post-Thoughts";
import GetLastPost from "./Components/GetLast-Post";
import {
  fecthData,
  postLikes,
  postThoughts,
} from "./ServiceAPI/ApiServices";

export const App = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [userlogged, setUserLogged] = useState("");
  const [sendMessage, setSendMessage] = useState("");
 

  const submitMessage = async (sendMessage, username) => {
    const { messageSent, error400 } = await postThoughts(sendMessage, username);
    setLengthError(error400);

    if (messageSent) {
      getThoughts();
      setSendMessage("");
    }
  };
  
   const getThoughts = async () => {
    const apiMessage = await fecthData();
    setMessages(apiMessage.message);
    setError(apiMessage.hasError);
  };
  const likesIncrease = async (messageId) => {
    const sucess = await postLikes(messageId);
    if (sucess === true) {
      getThoughts();
    }
  };
  const autoRefresList = () => {
    setInterval(() => {
      getThoughts();
      console.log("refresh-");
    }, 5000);
  };

  useEffect(() => {
    getThoughts();
    autoRefresList();
  }, []);

  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/">
            <UserLogin
              userExist={userlogged}
              setUserExist={setUserLogged}
            />
          </Route>
          <Route exact path="/thoughts">
            <div className="app-container">
              <PostThoughts
                submitMessage={submitMessage}
                lengthError={lengthError}
                username={userlogged}
                sendMessage={sendMessage}
                setSendMessage={setSendMessage}
                
              />
              <GetLastPost
                messages={messages}
                error={error}
                likesIncrease={likesIncrease}
              />
            </div>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};
