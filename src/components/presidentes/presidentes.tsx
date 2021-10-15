import React, { useState, useEffect } from 'react';
import { getData, saveData } from "../../helpers/Utillities";
import { IUtillities } from "../../helpers/IUtillities";
import { Grid, TextField, FormControl, FormControlLabel, Button, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab'
import { constrolsStyles } from "./styles";
import clsx from "clsx";

const Utillities: IUtillities = {
    url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
}

export default function Presidencial({ formInit }) {
    const classes = constrolsStyles();
    const [datos, setDatos] = useState(undefined);
    const [formData, updateFormData] = useState(undefined)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (success) {
            setSuccess(false);
        }
        if (error) {
            setError(false);
        }
    };
    const handleClickButton = async () => {
        Utillities.url = '/sheets/insert/1yiCT30F9jk-_QZoJYDFDPdch8Ne3CSUQjCGwSPCyZuE/Presidencial'
        Utillities.data = { ...formInit, ...formData };
        const result = await saveData(Utillities);
        (result === 200) ? setSuccess(true) : setError(true);
    }
    useEffect(() => {
        Utillities.url = '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!H2:I17'
        getData(Utillities).then(result => {
            let obj = {}
            result.forEach(item => {
                obj[item[0]] = 0
            })
            setDatos(result);
            updateFormData(obj);
        }).catch(error => {
            console.error(error);
        });
    }, [])
    return <Grid container direction='column'>
        <Grid container item justifyContent='center' alignItems='center' >
            {datos && datos.map(dato => {
                return <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <FormControlLabel
                        control={<TextField
                            onChange={handleChange}
                            name={`${dato[0]}`}
                            id='standard-basic'
                            label={`${dato[0]}-${dato[1]}`}
                            type='number'
                            size='medium' className={classes.formControl}
                            value={updateFormData[dato[0]]} />}
                        label="" className={classes.formLabel} />
                </FormControl>
            })}
        </Grid>
        <Button variant="contained" color="primary" type='submit' onClick={handleClickButton} >Guardar</Button>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="success">
                <AlertTitle>Guardado Exitoso</AlertTitle>
                <strong>Datos insertados satisfactoriamente</strong>
            </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="error">
                <AlertTitle>Error al guardar</AlertTitle>
                <strong>Revise los datos ingresados</strong>
            </Alert>
        </Snackbar>
    </Grid>
}