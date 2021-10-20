import React, { useState, useEffect } from 'react';
import { IUtillities } from "../../helpers/IUtillities";
import { getData, saveData } from "../../helpers/Utillities";
import {
    Grid, TextField, FormControl, FormControlLabel, Button,
    Snackbar, Typography
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import clsx from 'clsx';
import { constrolsStyles } from "../commons/styles";

const Utillities: IUtillities = {
    url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
}

export default function Alcaldes({ formInit }) {
    const classes = constrolsStyles();
    const [alcaldes, setAlcaldes] = useState([]);
    const [formData, updateFormData] = useState(undefined)
    const [success, setSuccess] = useState(undefined);
    const [error, setError] = useState(undefined);
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
        Utillities.url = '/sheets/insert/1yiCT30F9jk-_QZoJYDFDPdch8Ne3CSUQjCGwSPCyZuE/Alcaldes'
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
        Utillities.url = '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Alcaldes!A2:O20'
        getData(Utillities).then(result => {
            let alcaldesArray = result.filter(elemento => {
                if (elemento[0] === formInit.AMunicipio) {
                    return elemento;
                }
                else return []
            })[0];
            let alcaldesStateObject = {}
            for (let index = 0; index < alcaldesArray.length; index++) {
                if (index > 0) {
                    const element = alcaldesArray[index];
                    alcaldesStateObject[element.split(' - ')[0]] = 0;
                }
            }
            console.log(alcaldesStateObject)
            updateFormData(alcaldesStateObject);
            setAlcaldes(alcaldesArray)
        }).catch(error => {
            console.error(error);
        });
    }, [formInit.AMunicipio])
    return <Grid container alignItems='center' direction='column'>
        {formInit.AMunicipio && <Grid container item justifyContent='center' alignItems='center' >
            {formData && alcaldes && alcaldes.map((alcalde, index) => {
                console.log(alcalde)
                if (index > 0) {
                    return <FormControl key={alcalde} className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
                        <FormControlLabel
                            control={<TextField
                                onChange={handleChange}
                                name={`${alcalde}`}
                                id='standard-basic'
                                label={`${alcalde}`}
                                type='number'
                                size='medium' className={classes.formControl}
                                value={formData[alcalde.split(' - ')[0]]} />}
                            label="" className={classes.formLabel} />
                    </FormControl>
                } else {
                    return <></>
                }
            })
            }
        </Grid>}
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