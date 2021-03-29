import React from 'react'

const showTime= (createdAt)=>{
  const today = new Date()
  const messageDate = new Date (createdAt)
  
  let convertDate= Math.abs(today- messageDate) /1000
  
  const hours= Math.floor(convertDate/ 3600) %24;
  convertDate -= hours * 3600
  
  const minutes= Math.floor(convertDate/60)% 60;
  convertDate -= minutes * 60;
  
  if(hours !== 0){
    return(`${hours} hours ago`)
  }  else{
    return (`${minutes} minutes ago`)
  }
}

const GetLastPost = ({messages, error, likesIncrease }) => {

  return (
    <section>
      {
        error === true ? (
          <h1>This is an Error</h1>
        ) :
        messages.map((message) => {
          return (
            <div key={message._id} className="post-container-message">
              < div className="message-container">
                <p>{message.message}</p>
              </div>
              <div className="send-button">
                <div className="likes">
                <img src="./assets/heart.svg" alt="heart" onClick={()=>likesIncrease(message._id)} />
                <p> x {message.hearts}</p>
                </div>
               <div className="time"> 
               {
                 showTime(message.createdAt) === '0 minutes ago' ? <p className="label">New Message</p> :
                 <p>{showTime(message.createdAt)}</p>
               }
               </div>
              </div>
            </div>
          )
        })
      }
    </section>)

}
export default GetLastPost;