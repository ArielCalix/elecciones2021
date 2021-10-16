import React, { useState, useEffect } from 'react';
import Bar from './components/navigation/AppBar';
import { Login } from "./components/login/login";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid, Backdrop } from '@material-ui/core';
import { estilos, appStyles } from "./estilos";
import { getToken, checkUser, LogIn, LogOut, getStates } from "./helpers/Utillities";
import { IUtillities } from "./helpers/IUtillities";
import { ILoginUserProps } from "./interfaces/ILogin";
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavigationContext } from './contexts/navigationContext';
import { isEmpty } from '@microsoft/sp-lodash-subset';

function App() {
  const theme = createTheme(estilos);
  const [isLogin, setIsLogin] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [errorLogin, setErrorLogin] = useState(undefined)
  const [navigation, setNavigation] = useState(undefined)
  const utilities: IUtillities = { url: '' }
  useEffect(() => {
    const navs = getStates();
    (isEmpty(navs)) ? setNavigation({
      alcaldes: false,
      presidentes: false,
      diputados: false
    }) : setNavigation(navs);
    const hasToken = getToken();
    if (hasToken) {
      const utils: IUtillities = { url: '/usuarios/whoami' }
      checkUser(utils)
        .then(response => {
          if (response['status'] === 200) {
            setIsLogin(true);
            setCargando(false)
          } else {
            LogOut();
            setIsLogin(false);
            setCargando(false);
          }
        });
    } else {
      setCargando(false)
    }
  }, []);
  const handleLogin = async (userAccount: ILoginUserProps) => {
    utilities.url = '/usuarios/login';
    utilities.data = userAccount;
    const result = await LogIn(utilities);
    if (result !== undefined) {
      if (result['status'] === 200) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
        setErrorLogin(true);

      }
    }
  }
  const handleLogOut = () => {
    LogOut();
    setIsLogin(false)
  }
  return (
    <div className='App'>
      <NavigationContext.Provider value={{ navigation, setNavigation }} >
        <ThemeProvider theme={theme}>
          {(cargando) ? <Cargando></Cargando> :
            (isLogin) ? <Bar handleLogOut={handleLogOut} /> : <Login handleLogin={handleLogin} isLogin={errorLogin} />
          }
        </ThemeProvider>
      </NavigationContext.Provider>
    </div>
  );
}

function Cargando() {
  const classes = appStyles();
  return <Backdrop className={classes.backdrop} open={true}>
    <Grid container direction="column" alignItems="center" justifyContent="center" className={classes.root}>
      <img src="logo512.png" alt="SIDETRAD" className={classes.img} />
      <CircularProgress color="inherit" />
    </Grid>
  </Backdrop>
}

export default App;