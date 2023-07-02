import AppRouter from "./components/AppRouter";
import {BrowserRouter, useNavigate} from "react-router-dom";
import classes from './Main.module.css'
import {ConfigProvider, Spin, theme} from "antd";
import {useContext, useEffect, useState} from "react";
import UserAPI from "./http/api/UserAPI";
import {Context} from "./index";
import {cookies} from "./data/cookies/index";



function App() {
    const[loading, setLoading] = useState(true);
    const {user} = useContext(Context);
    useEffect(()=>{
        UserAPI.checkIsValidJwtToken(cookies.get('login'),cookies.get('jwt')).then(data=>{
            if(data.message==="success"){
                user.setUser({
                    id: data.id,
                    login: data.log,
                    role: data.role,
                    isVerifiedAccount: data.isVerifiedAccount,
                    jwt: cookies.get('jwt')
                })
                user.setIsAuth(true);
                setTimeout(()=>{
                    setLoading(false);
                },1200)
            }
            else {
                user.setIsAuth(false);
                setTimeout(()=>{
                    setLoading(false);
                },1200)
            }
        })
    },[])
    if(loading){
        return <Spin size="large" className={classes.spinnerLoading} />
    }

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
