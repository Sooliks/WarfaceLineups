import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, Space} from "antd";





function RegAndAuth() {
    const [isVisibleByWindowId,setIsVisibleByWindowId] = useState(0); //handler swap window

    ///////////////////////////////////////
    const [showPassword, setShowPassword] = React.useState(false);
    const [showSecondPassword, setShowSecondPassword] = React.useState(false);
    const [showLogPassword, setShowLogPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowSecondPassword = () => setShowSecondPassword((show) => !show);
    const handleClickShowLogPassword = () => setShowLogPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownSecondPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseDownLogPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    //reg//////////////////////////////////////////////////////////////
    const [regLogin,setRegLogin] = useState("");
    const [regEmail,setRegEmail] = useState("");
    const [regPassword,setRegPassword] = useState("");
    const [regSecondPassword,setRegSecondPassword] = useState("");

    const[loginError,setLoginError] = useState("")
    const[emailError,setEmailError] = useState("")
    const[passwordError,setPasswordError] = useState("")
    const[secondPasswordError,setSecondPasswordError] = useState("")

    const[loginDirty,setLoginDirty] = useState(false);
    const[emailDirty,setEmailDirty] = useState(false);
    const[passwordDirty,setPasswordDirty] = useState(false);
    const[secondPasswordDirty,setSecondPasswordDirty] = useState(false);
    const [isDisabledRegButton,setIsDisabledRegButton] = useState(true);
    /////////////////////////////////////////////////////////////////////

    //auth///////////////////////////////////////////////////////////////
    const [logLogin,setLogLogin] = useState("");
    const [logPassword,setLogPassword] = useState("");

    const[logLoginError,setLogLoginError] = useState("")
    const[logPasswordError,setLogPasswordError] = useState("")

    const[logLoginDirty,setLogLoginDirty] = useState(false)
    const[logPasswordDirty,setLogPasswordDirty] = useState(false)
    /////////////////////////////////////////////////////////////////////////////////

    const blurHandler = () => {
        handlerRegButton()
    }
    const handlerRegButton = () =>{
        if(loginDirty||emailDirty||passwordDirty||secondPasswordDirty)
        {
            setIsDisabledRegButton(true);
            return
        }
        if(regLogin.length<1) {
            setLoginError("Логин не должен быть пустым");
            setLoginDirty(true);
            setIsDisabledRegButton(true);
            return
        }
        if(regEmail.length<1) {
            setEmailError("Email не должен быть пустым");
            setEmailDirty(true);
            setIsDisabledRegButton(true);
            return
        }
        if(regPassword.length<1)
        {
            setPasswordError("Пароль не должен быть пустым");
            setPasswordDirty(true);
            setIsDisabledRegButton(true);
            return
        }
        if(regSecondPassword.length<1)
        {
            setSecondPasswordError("Пароль не должен быть пустым");
            setSecondPasswordDirty(true);
            setIsDisabledRegButton(true);
            return
        }
        setIsDisabledRegButton(false);
    }
    const checkRegData = (e) =>{
        switch (e.target.name){
            case "login":
                setRegLogin(e.target.value);
                let re = new RegExp("^\\w[\\w.]{4,12}\\w$");
                if(!e.target.value.match(re))
                {
                    setLoginError("Введите корректный логин")
                    setLoginDirty(true);
                    return
                }
                if (e.target.value.length > 12)
                {
                    setLoginError("Логин не может быть больше 12 символов")
                    setLoginDirty(true)
                    setIsDisabledRegButton(true);
                    return
                }
                if (e.target.value.length < 4)
                {
                    setLoginError("Логин не может быть меньше 4 символов")
                    setLoginDirty(true)
                    return
                }
                setLoginError("")
                setLoginDirty(false);
                break;
            case "email":
                setRegEmail(e.target.value);
                let r = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
                if(!e.target.value.match(r))
                {
                    setEmailDirty(true);
                    setEmailError("Введите корректный email");
                    return
                }
                if(e.target.value.length>31)
                {
                    setEmailDirty(true);
                    setEmailError("Почта должна быть не больше 31 символа");
                    return
                }
                if(e.target.value.length<5)
                {
                    setEmailDirty(true);
                    setEmailError("Почта должна быть не меньше 5 символов");
                    return
                }
                setEmailError("")
                setEmailDirty(false)
                break;
            case "password":
                setRegPassword(e.target.value);
                if(e.target.value.length < 8)
                {
                    setPasswordDirty(true)
                    setPasswordError("Пароль не должен содержать меньше 8-ми символов")
                    return
                }
                if(e.target.value.length > 40) {
                    setPasswordDirty(true)
                    setPasswordError("Пароль не должен содержать больше 40-ка символов")
                    return
                }
                setPasswordDirty(false)
                setPasswordError("")
                setSecondPasswordDirty(false)
                setSecondPasswordError("")
                break;
            case "secondPassword":
                setRegSecondPassword(e.target.value);
                setSecondPasswordDirty(false)
                setSecondPasswordError("")
                setPasswordDirty(false)
                setPasswordError("")
                break;
        }
    }
    const handleClickRegistration = () => {
        handlerRegButton();
        if(regSecondPassword!==regPassword){
            setSecondPasswordDirty(true)
            setSecondPasswordError("Пароли не совпадают")
            return
        }
        /*try {
            client.post('/register', {regLogin, regEmail, regPassword})
                .then(res=>{
                    console.log(res.data.message)
                    switch (res.data.message){
                        case "errorRegEmail":
                            setEmailDirty(true);
                            setEmailError("Аккаунт с таким email уже существует")
                            break
                        case "errorRegLogin":
                            setLoginDirty(true);
                            setLoginError("Аккаунт с таким логином уже существует")
                            break
                        case "successReg":
                            setIsAuth(true);
                            jwtToken.change(res.data.jwtToken);
                            log.change(res.data.log);
                            userId.change(res.data.userId);
                            role.change(res.data.role);
                            isVerifiedAccount.change(res.data.isVerifiedAccount);
                            cookies.set('jwtToken', jwtToken.data, { path: '/' });
                            cookies.set('login', log.data, { path: '/' });
                            break
                    }
                });
        }catch (e){
            console.log(e);
        }*/
    }
    const handleClickAuthorization = () =>{
        /*try {
            client.post('/authorization', {logLogin,logPassword})
                .then(res=>{
                    if(res.data.message==="errorAuth"){
                        setLogPasswordError("Неверный пароль или логин")
                        setLogPasswordDirty(true);
                    }else{
                        setIsAuth(true);
                        jwtToken.change(res.data.jwtToken);
                        log.change(res.data.log);
                        userId.change(res.data.id);
                        role.change(res.data.role);
                        isVerifiedAccount.change(res.data.isVerifiedAccount);
                        cookies.set('jwtToken', jwtToken.data, { path: '/' });
                        cookies.set('login', log.data, { path: '/' });
                    }
                });
        }catch (e){
            console.log(e);
        }*/
    }
    const checkAuthData = (e) =>{
        switch (e.target.name){
            case "logLogin":
                setLogLogin(e.target.value);
                setLogLoginDirty(false);
                setLogLoginError("");
                break
            case "logPassword":
                setLogPassword(e.target.value);
                setLogPasswordDirty(false);
                setLogPasswordError("");
                break
        }
    }
    const onFinishAuthorization = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailedAuthorization = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handlerChangeAuthorizationForm = () =>{

    }


    const onFinishRegistration = (values) => {
        console.log(values['password']);
        console.log('Success:', values);
    };
    const onFinishFailedRegistration = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {isVisibleByWindowId===0 &&
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            width:600
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinishAuthorization}
                        onFinishFailed={onFinishFailedAuthorization}
                        autoComplete="off"
                        layout="vertical"
                        on
                    >
                        <Form.Item
                            label="Логин"
                            name="login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста введите свой логин',
                                },
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста введите свой пароль!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                            <Space style={{display:'flex', justifyContent: 'space-between'}}>
                                <Button type="primary" htmlType="submit">Войти</Button>
                                <Button onClick={()=>setIsVisibleByWindowId(1)}>Регистрация</Button>
                            </Space>
                        </Form.Item>
                    </Form>
            }
            {isVisibleByWindowId === 1 &&
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                        width:600
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishRegistration}
                    onFinishFailed={onFinishFailedRegistration}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите свой логин',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Введите корректный email!',
                            },
                            {
                                required: true,
                                message: 'Пожалуйста введите свою почту!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите свой пароль!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Подтвердите пароль"
                        name="secondPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста подтвердите пароль',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                        <Space style={{display:'flex', justifyContent: 'space-between'}}>
                            <Button type="primary" htmlType="submit">Войти</Button>
                            <Button onClick={()=>setIsVisibleByWindowId(0)}>Войти в существующий аккаунт</Button>
                        </Space>
                    </Form.Item>
                </Form>
            }
        </div>
    );
}

export default RegAndAuth;