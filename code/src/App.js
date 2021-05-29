import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { user } from "./reducers/user"
import UserForm from "./Components/UserForm";
import SignUp from "./Components/SignUp-Form";
import SignIn from "./Components/SignIn-Form";
import PostThoughts from "./Components/Post-Thoughts";
import GetLastPost from "./Components/GetLast-Post";
import { fecthData, postLikes, postThoughts } from "./ServiceAPI/ApiServices";

const reducer = combineReducers({
  user: user.reducer
})

const store = configureStore({ reducer })

export const App = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
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
    }, 5000);
  };

  const trendingHashtag = () => {
    let hashtag = [];

    messages.forEach((message) => {
      message.hashtag.forEach((tag) => {
        const finIndex = hashtag.findIndex((item) => item.name === tag);

        if (finIndex > -1) {
          hashtag[finIndex].count = hashtag[finIndex].count + 1;
        } else {
          hashtag.push({
            name: tag,
            count: 1,
          });
        }
      });
    });
    return hashtag;
  };

  useEffect(() => {
    getThoughts();
    autoRefresList();
  }, []);


  return (
    <Provider store={store}>
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/">
            <UserForm/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route exact path="/signin">
            <SignIn/>
          </Route>
          <Route  exact path="/thoughts">
            <div className="app-container">
              <div className="trending1">
                <h1 className="subtitle">#Trending hashtag</h1>
                <h3> explore the hashtag more used in the messages</h3>
                {trendingHashtag().map((item) => {
                  return (
                    <div>
                      <h1 className="subtitle">{item.name}</h1>
                      <h3>{`used:${item.count} times`}</h3>
                    </div>
                  );
                })}
              </div>
              <div className="thoughts-container">
                <PostThoughts
                  submitMessage={submitMessage}
                  lengthError={lengthError}
                  sendMessage={sendMessage}
                  setSendMessage={setSendMessage}
                  messages={messages}
                />
                <GetLastPost
                  messages={messages}
                  error={error}
                  likesIncrease={likesIncrease}
                />
              </div>
            </div>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
    </Provider>
  );
};
