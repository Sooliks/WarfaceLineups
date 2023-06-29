import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import classes from './Main.module.css'
import {ConfigProvider, theme} from "antd";



function App() {
  return (
      <ConfigProvider theme={{
          algorithm: theme.darkAlgorithm,
      }}>
        <div className={classes.main}>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
      </ConfigProvider>
  );
}

export default App;
