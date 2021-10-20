import React, { useState, useEffect } from 'react';
import { getData, saveData } from "../../helpers/Utillities";
import { IUtillities } from "../../helpers/IUtillities";
import { Grid, TextField, FormControl, FormControlLabel, Button, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab'
import { constrolsStyles } from "../commons/styles";
import clsx from "clsx";

const Utillities: IUtillities = {
    url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
}

export default function Presidencial({ formInit }) {
    const classes = constrolsStyles();
    const [presidentes, setPresidentes] = useState(undefined);
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
        if (result === 200) {
            setSuccess(true)
        }
        else {
            setError(true);
        }
    }
    useEffect(() => {
        Utillities.url = '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Presidencial!B2:C17'
        getData(Utillities).then(result => {
            let obj = {}
            result.forEach(item => {
                obj[item[0]] = 0
            })
            setPresidentes(result);
            updateFormData(obj);
        }).catch(error => {
            console.error(error);
        });
    }, [])
    return <Grid container alignItems='center' direction='column' >
        <Grid container item justifyContent='center' alignItems='center' >
            {formData && presidentes && presidentes.map(presidente => {
                return <FormControl key={presidente[0]} className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                    <FormControlLabel
                        control={<TextField
                            onChange={handleChange}
                            name={`${presidente[0]}`}
                            id='standard-basic'
                            label={`${presidente[0]}-${presidente[1]}`}
                            type='number'
                            size='medium' className={classes.formControl}
                            value={formData[presidente[0]]} />}
                        label="" className={classes.formLabel} />
                </FormControl>
            })}
        </Grid>
        <Grid container item justifyContent='center' alignItems='center' xs={8}>
            <Button variant="contained" color="primary" type='submit' onClick={handleClickButton} >
                <Typography variant='button' className={classes.title}>
                    Guardar
                </Typography>
            </Button>
        </Grid>
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
    </Grid >
}