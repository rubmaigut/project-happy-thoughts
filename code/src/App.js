import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import UserLogin from "./Components/UserLogin";
import PostThoughts from "./Components/Post-Thoughts";
import GetLastPost from "./Components/GetLast-Post";
import { fecthData, postLikes, postThoughts } from "./ServiceAPI/ApiServices";

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
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/">
            <UserLogin userExist={userlogged} setUserExist={setUserLogged} />
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
                <PostThoughts
                  submitMessage={submitMessage}
                  lengthError={lengthError}
                  username={userlogged}
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
  );
};
