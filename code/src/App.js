import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "@reduxjs/toolkit";

import { user } from "./reducers/user";
import UserForm from "./Components/UserForm";
import SignUp from "./Components/SignUp-Form";
import SignIn from "./Components/SignIn-Form";
import PostThoughts from "./Components/Post-Thoughts";
import GetLastPost from "./Components/GetLast-Post";

import { loadState, saveState } from "./ServiceAPI/local-storage"

const persistedState = loadState();

const reducer = combineReducers({
  user: user.reducer,
});

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState({
    user: store.getState().user
  });
});

export const App = () => {
  const [messages, setMessages] = useState([]);

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

  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path="/">
              <UserForm />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/thoughts">
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
                  <PostThoughts />
                  <GetLastPost />
                </div>
              </div>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
};
