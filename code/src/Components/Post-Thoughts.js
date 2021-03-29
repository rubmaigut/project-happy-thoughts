import React from 'react'


const PostThoughts = ({sendMessage, onChangeText,submitMessage, lengthError }) => {

  return (
    
    <div className="post-container">
      <h4 className="title">What's making you happy right now?</h4>
      <div className="text-area">
      <textarea  onChange={onChangeText} className="text-container" value={sendMessage}></textarea>
      <p className={sendMessage && sendMessage.length > 140 ? "length-error" : ""}>{140 - (sendMessage ? sendMessage.length : 0)} of 140</p>
      {
          lengthError === true && (
            <div className="error-message">
              <h3>Your message needs to be between 5 and 140 characters long</h3>
            </div>
          ) 
      }
      </div>
      <div className="send-button">
          < button onClick={submitMessage} type="submit">❤️Send Happy Thoughts❤️</button>
      </div>
    </div>

  )
}
export default PostThoughts;