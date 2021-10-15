import React, { useState, ChangeEvent, useEffect } from "react";
import {
    Grid, TextField, Button, FormControl,
    FormControlLabel, FormGroup,
    InputLabel, OutlinedInput, InputAdornment, IconButton,
    AppBar, Toolbar, Typography, Snackbar
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { useStyles } from "./styles";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ILoginProps, ILoginUserProps } from '../../interfaces/ILogin';
import clsx from 'clsx';
import "../../../public/Logo.svg";

function Login(props: ILoginProps) {
    const { handleLogin } = props;
    const classes = useStyles();
    const [formData, updateFormData] = useState<ILoginUserProps>({ idUsuario: '', passUsuario: '', nombreUsuario: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (props.isLogin) setError(true)
    }, [props.isLogin]);
    const handleChange = (prop: keyof ILoginUserProps) => (event: ChangeEvent<HTMLInputElement>) => {
        updateFormData({ ...formData, [prop]: event.target.value });
        if (formData.passUsuario.length >= 1) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (error) {
            setError(false);
        }
    };
    return <React.Fragment>
        <AppBar position='static'>
            <Toolbar >
                <Typography variant='h6' className={classes.title}>
                    Sistema Departamental de Transmision de Datos
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container justifyContent="center">
            <FormGroup>
                <Grid className={classes.imgContainer}>
                    {/* <img src="logo.svg" alt="UNICAH" className={classes.img} /> */}
                </Grid>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <FormControlLabel
                        control={<TextField
                            onChange={handleChange("idUsuario")}
                            name='user'
                            id="outlined-basic"
                            label="Nombre de Usuario"
                            variant="outlined"
                            size='medium'
                            className={classes.formControl}
                            value={formData.idUsuario} />}
                        label="" className={classes.formLabel} />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.passUsuario}
                        onChange={handleChange('passUsuario')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <Button variant="contained" color="primary" onClick={() => handleLogin(formData)} type='submit' disabled={btnDisabled}>Login</Button>
                </FormControl>
            </FormGroup>
        </Grid>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">
                <AlertTitle>No se pudo iniciar sesión</AlertTitle>
                <strong>Revise los datos ingresados</strong>
            </Alert>
        </Snackbar>
    </React.Fragment >
}

export { Login };