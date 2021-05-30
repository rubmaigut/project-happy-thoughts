import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postThoughts } from "../ServiceAPI/ApiServices";
import { useDispatch } from "react-redux";
import { user } from "../reducers/user"

const PostThoughts = () => {
  const history = useHistory();
  const [sendMessage, setSendMessage] = useState("");
  const [lengthError, setLengthError] = useState(false);
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const dispatch = useDispatch();

  const submitMessage = async () => {
    const { messageSent, error400 } = await postThoughts(sendMessage, username, accessToken);
    setLengthError(error400);

    if (messageSent) {
      setSendMessage("");
    }
  };

  const onPressLogout = () => {
    dispatch(user.actions.clearState())
    history.push("/");
  }

  useEffect(() => {
    if (!accessToken) {
      history.push("/");
    }
  }, [accessToken]);

  return (
    <main className="thoughts-component">
      <button className="logout" onClick={onPressLogout}>LOGOUT</button>
      <div className="container">
        <div className="header">
          <img src="./assets/user.svg" alt="user" />
          <h1>{username}</h1>
        </div>
        <div className="message-area">
          <textarea
            onChange={(e) => setSendMessage(e.target.value)}
            value={sendMessage}
            className="text-area"
            placeholder="What's making you happy right now?"
          ></textarea>
          <p className={sendMessage && sendMessage.length > 140 ? "error" : ""}>
            {140 - (sendMessage ? sendMessage.length : 0)} of 140
          </p>
          {lengthError === true && (
            <div className="error-message">
              <h3>
                Your message needs to be between 5 and 140 characters long
              </h3>
            </div>
          )}
        </div>
        <button
          onClick={() => submitMessage(sendMessage, username, accessToken)}
          type="submit"
          className="send-button"
        >
          ❤️ Send ❤️
        </button>
      </div>
    </main>
  );
};
export default PostThoughts;
