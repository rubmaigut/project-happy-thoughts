import React, { useState } from "react";

const PostThoughts = ({
  lengthError,
  submitMessage,
  username,
  sendMessage,
  setSendMessage,
}) => {
  return (
    <main>
      <div className="container">

        <div className="header">
          <img src="./assets/user.svg" alt="user"/>
          <h1>{username}</h1>
        </div>
        
        <div className="message-area">
              <textarea
              onChange={(e) => setSendMessage(e.target.value)}
              value={sendMessage}
              className="text-area"
              placeholder="What's making you happy right now?"
            ></textarea>
            <p
              className={
                sendMessage && sendMessage.length > 140 ? "error" : ""
              }
            >
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
            onClick={() => submitMessage(sendMessage, username)}
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
