const tokenName = {
    LOGIN_TOKEN: "_token",
    OTP_TOKEN: "token",
}

let getToken = (key) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null; // Return a fallback or handle this appropriately
}

let setToken = (key, token) => {
    return localStorage.setItem(key, token);
}

const setValue = (key, value) => {
    return localStorage.setItem(key, value);
}

const getValue = (key) => {
    const modalToken = localStorage.getItem(key);
    // localStorage.removeItem(key)
    return modalToken
}


module.exports = {
    getToken,
    setToken,
    tokenName,
    setValue,
    getValue
}