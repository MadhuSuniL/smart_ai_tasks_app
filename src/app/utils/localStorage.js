export const setJsonData = (key, value) => {
  if (typeof window !== "undefined") {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  }
};

export const getJsonData = (key) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

export const setData = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getData = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};
