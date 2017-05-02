const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getItem = (key) =>  JSON.parse(localStorage.getItem(key));
const removeItem = (key) => localStorage.removeItem(key);

export  const LocalStorageService = Object.assign({}, {setItem, getItem, removeItem});


