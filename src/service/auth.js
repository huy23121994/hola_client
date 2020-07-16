import { authentication, userInfo } from "./app.service";

export function login(email, password) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/auth_user`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email: email, password: password })
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          authentication.update({
            isAuthenticated: true,
            token: resData.data.auth_token,
            refreshToken: resData.data.refreshToken
          });
          storeAuthToken(resData.data.auth_token, resData.data.refresh_token);
          resolve(resData);
        } else {
          reject(resData);
        }
      })
      .catch(err => reject(err));
  });
}

function storeAuthToken(auth_token, refresh_token) {
  window.localStorage.setItem("auth_token", auth_token);
  window.localStorage.setItem("refresh_token", refresh_token);
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/users/get_info", {
      headers: { Authorization: window.localStorage.getItem("auth_token") }
    })
      .then(res => res.json())
      .then(resData => {
        authentication.update({
          isAuthenticated: true,
          token: window.localStorage.getItem("auth_token"),
          refreshToken: window.localStorage.getItem("refresh_token")
        });
        userInfo.update({ ...resData });
        resolve(resData);
      })
      .catch(err => reject(err));
  });
}

export function clearAuthStorage() {
  window.localStorage.removeItem("auth_token");
  window.localStorage.removeItem("refresh_token");
}
