//Create new User
export const createUser = async (email, username, password) => {
  let API_URL_NEW_USER = "https://happy-thoughts-api-mongodb-aut.herokuapp.com/signup"

  let userInfo;
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
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        userInfo = json;
      }
    })
    .catch((err) => (userInfo = false));

  return { userInfo, error400 };
};

//validate existing user
export const existingUser = async (username, password) => {
  let API_URL_USER = "https://happy-thoughts-api-mongodb-aut.herokuapp.com/signin";
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
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        userExist = json;
      }
    })
    .catch((err) => (userExist = false));
  return { userExist, error400 };
};

//Show all thoughts
export const fecthData = async (accessToken) => {
  let API_GET_MESSAGES = "https://happy-thoughts-api-mongodb-aut.herokuapp.com/";
  let message = [];
  let hasError = false;

  await fetch(API_GET_MESSAGES, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status === 400) {
        hasError = true;
        return;
      } else {
        return response.json();
      }
    })
    .then((json) => {
      if (json) {
        message = json;
      }
    })
    .catch((err) => {
      hasError = true
    });

  return { message, hasError };
};

//Create new Thoughts
export const postThoughts = async (message, username, accessToken) => {
  let API_URL = "https://happy-thoughts-api-mongodb-aut.herokuapp.com/thoughts";
  let messageSent;
  let error400;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    body: JSON.stringify({ username: username, message: message }),
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
  let LIKES_URL = `https://happy-thoughts-api-mongodb-aut.herokuapp.com/thoughts/${messageId}/like`;

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
