//Create new User
export const createUser = async (username) =>{
  console.log(username)
  let API_URL_USER = 'https://happy-thoughts-api-mongodb.herokuapp.com/user/create'

  let userCreated
  let error400
  
  await fetch(API_URL_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": username})
  })
  .then((response) =>{
    if(response.status === 400){
      error400 = true 
      userCreated = false
      console.log(response)
    }else{
    return response.json()
    }
  })
  .then((json)=>{
    if(json){
      userCreated = true
    }
 })
 .catch(err => userCreated= false)

 return {userCreated, error400 };
}

//validate existing user
export const existingUser =async ()=>{
  
  let users= []
  let hasError = false

  await fetch('https://happy-thoughts-api-mongodb.herokuapp.com/users')
  .then((response)=>{
    return response.json()
  })
  .then((json)=>{
    users.push(...json)
    return(json)
  })
  .catch(err => hasError= true)
  return{ users, hasError }
}

//Show all thoughts 
export const fecthData = async () => {
  let message = []
  let hasError = false
  await fetch('https://happy-thoughts-api-mongodb.herokuapp.com/')
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

//Create new Thoughts 
export const postThoughts = async (message, username) =>{
  let API_URL = 'https://happy-thoughts-api-mongodb.herokuapp.com/thoughts'
  let messageSent
  let error400
  console.log({"message": message, "username":username})
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"message": message, "username":username}) 
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

// waiting
export const postLikes = async (messageId)=>{
  let LIKES_URL = `https://happy-thoughts-api-mongodb.herokuapp.com/thoughts/${messageId}/like`

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



