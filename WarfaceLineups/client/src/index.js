import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserData from "./data/UserData";
const root = ReactDOM.createRoot(document.getElementById('root'));

export const Context = createContext(null);

root.render(
  <React.StrictMode>
      <Context.Provider value={{
          user: new UserData()
      }}>
          <App />
      </Context.Provider>
  </React.StrictMode>
);


