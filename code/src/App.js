import React, { useState, useEffect }from 'react'
import PostThoughts from "./Components/Post-Thoughts"
import GetLastPost from "./Components/GetLast-Post"
import { fecthData, postLikes, postThoughts } from './ServiceAPI/ApiServices'

export const App = () => {

  const [sendMessage, setSendMessage] = useState() 

  const [messages, setMessages] = useState([]) 

  const [error,setError]= useState(false)

  const [lengthError, setLengthError] = useState(false)

  const onChangeText = (e)=>{
    setSendMessage(e.target.value)
  }
 
  const submitMessage = async() =>{
    const {messageSent, error400}  = await postThoughts(sendMessage)
    setLengthError(error400)

    if(messageSent === true){
      getThoughts()
      setSendMessage("")
      
    }
  }
    const getThoughts = async () => {
    const apiMessage = await fecthData()
    setMessages(apiMessage.message)
    setError(apiMessage.hasError)   
    
  }
  const likesIncrease= async(messageId)=>{
    const sucess = await postLikes(messageId)
    if(sucess === true){
      getThoughts()
    } 
  }
  const autoRefresList = () =>{
    setInterval(()=>{
      getThoughts()
      console.log('refresh-')
    },5000)
 }
 
  useEffect(() => {
    getThoughts()
    autoRefresList()
  }, [])
  
  return (
    <div className="app-container">
      <PostThoughts
      sendMessage={sendMessage}
      onChangeText={onChangeText}
      submitMessage={submitMessage}  
      lengthError={lengthError}    
       />
      <GetLastPost 
      messages={messages}
      error={error}
      likesIncrease={likesIncrease}
           
      />
    </div>
  )
}
