import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserData from "./data/UserData";
import FavoritesData from "./data/FavoritesData";
import NavData from "./data/NavData";
const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);

root.render(
  <Context.Provider value={{
      user: new UserData(),
      videosFavorite: new FavoritesData(),
      nav: new NavData()
  }}>
      <App />
  </Context.Provider>
);


