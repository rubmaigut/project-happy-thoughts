//Create new User
export const createUser = async ( email, username, password ) => {
  let API_URL_NEW_USER =
    "https://happy-thoughts-api-mongodb-auth.herokuapp.com/signup";

  let userCreated;
  let error400;

  await fetch(API_URL_NEW_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        error400 = true;
        userCreated = false;
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        userCreated = true;
      }
    })
    .catch((err) => (userCreated = false));

  return { userCreated, error400 };
};

//validate existing user
export const existingUser = async ( username, password ) => {
  let API_URL_USER = "https://happy-thoughts-api-mongodb-auth.herokuapp.com/signin";
  let userExist;
  let error400;

  await fetch(API_URL_USER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (response.status === 400) {
        error400 = true;
        userExist = false;
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        userExist = true;
      }
    })
    .catch((err) => (userExist = false));
  return { userExist, error400 };
};

//Show all thoughts
export const fecthData = async (accessToken) => {
  let API_GET_MESSAGES = "https://happy-thoughts-api-mongodb-auth.herokuapp.com/";
  let message = [];
  let hasError = false;

  await fetch(API_GET_MESSAGES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((json) => {
      message.push(...json);
      return json;
    })
    .catch((err) => (hasError = true));

  return { message, hasError };
};

//Create new Thoughts
export const postThoughts = async ( accessToken, message, username) => {
  let API_URL = "https://happy-thoughts-api-mongodb-auth.herokuapp.com/thoughts";
  let messageSent;
  let error400;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ message: message, username: username }),
  })
    .then((response) => {
      if (response.status === 400) {
        error400 = true;
        messageSent = false;
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        messageSent = true;
      }
    })
    .catch((err) => (messageSent = false));

  return { messageSent, error400 };
};

// waiting
export const postLikes = async (messageId, accessToken) => {
  let LIKES_URL = `https://happy-thoughts-api-mongodb-auth.herokuapp.com/thoughts/${messageId}/like`;

  let sucess;

  await fetch(LIKES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      sucess = true;
    })
    .catch((err) => (sucess = false));

  return sucess;
};
