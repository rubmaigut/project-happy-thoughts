let API_URL = 'https://happy-thoughts-technigo.herokuapp.com/thoughts'

export const postThoughts = async (message) =>{
  let messageSent
  let error400

  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"message": message}) 
  })
  .then((response) =>{
    if(response.status === 400){
      error400 = true 
      messageSent = false
    }else{
    return response.json()
    }
  })
  .then((json)=>{
    if(json){
      messageSent = true
    }
    
 })
 .catch(err => messageSent= false)

 return {messageSent, error400 };
}

export const fecthData = async () => {
  let message = []
  let hasError = false
  await fetch(API_URL)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      message.push(...json)
      return json
    })
    .catch(err => hasError= true)

  return {message, hasError}
}

export const postLikes = async (messageId)=>{
  let LIKES_URL = `https://happy-thoughts-technigo.herokuapp.com/thoughts/${messageId}/like`

  let sucess 

   await fetch(LIKES_URL,
   {
    method: 'POST'
    })
  .then((response)=>{return response.json()})
  .then((json)=>{
    sucess = true
    })
    .catch(err=> sucess= false)

    return sucess

}
