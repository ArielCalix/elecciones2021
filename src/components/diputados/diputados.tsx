import React, { useState, useEffect, useContext } from 'react';
import { getData, saveData, setStatesLocal } from "../../helpers/Utillities";
import { IUtillities } from "../../helpers/IUtillities";
import {
    Grid, TextField, FormControl, FormControlLabel, Button,
    Snackbar, Typography, MobileStepper
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { constrolsStyles, useStyles } from "./styles";
import clsx from "clsx";
import { useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { NavigationContext } from '../../contexts/navigationContext';

const Utillities: IUtillities = {
    url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
}

export default function Diputados({ formInit }) {
    const { navigation, setNavigation } = useContext(NavigationContext);
    const [partidos, setPartidos] = useState(undefined);
    const [diputados, setDiputados] = useState(undefined);
    const [formData, updateFormData] = useState(undefined)
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
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
        Utillities.url = '/sheets/insert/1yiCT30F9jk-_QZoJYDFDPdch8Ne3CSUQjCGwSPCyZuE/Diputados'
        Utillities.data = { ...formInit, ...formData };
        const result = await saveData(Utillities);
        if (result === 200) {
            const newState = { alcaldes: false, presidentes: true, diputados: false }
            setSuccess(true)
            setNavigation(newState)
            setStatesLocal(newState);
        }
        else {
            setError(true);
        }
    }
    useEffect(() => {
        Utillities.url = '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Diputados!A2:G15'
        getData(Utillities).then(result => {
            let diputados = {};
            const partidosArray = [];
            const diputadosArray = [];
            result.forEach(item => {
                partidosArray.push(item[0]);
                diputadosArray.push(item.slice(1, 7));
                diputados[item[1]] = 0
                diputados[item[2]] = 0
                diputados[item[3]] = 0
                diputados[item[4]] = 0
                diputados[item[5]] = 0
                diputados[item[6]] = 0
            })
            setDiputados(diputadosArray);
            setPartidos(partidosArray);
            updateFormData(diputados);
        }).catch(error => {
            console.error(error);
        });
    }, [])
    return <Grid container alignItems='center' direction='column'>
        {!navigation.diputados &&
            <React.Fragment>
                {!success && <Grid container item justifyContent='center' alignItems='center' >
                    {formData && partidos && diputados && <DiputadosPartidos handleClickButton={handleClickButton} steps={partidos} diputados={diputados}
                        formData={formData} updateFormData={updateFormData}
                    />}
                </Grid>}
            </React.Fragment>
        }
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

function DiputadosPartidos({ steps, diputados, formData, updateFormData, handleClickButton }) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
    const theme = useTheme();
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };
    return (
        <Grid container justifyContent='center' alignItems='center' className={classes.root} spacing={1} xs={12} md={8}>
            <Grid container item>
                {allStepsCompleted() ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                    <React.Fragment>
                        <Grid container item justifyContent='center' alignItems='center' xs={12}>
                            {
                                diputados[activeStep] && diputados[activeStep].map(diputado => {
                                    return <Diputado key={diputado} partido={steps[activeStep]} diputado={diputado}
                                        formData={formData} updateFormData={updateFormData} />
                                })
                            }
                        </Grid>
                    </React.Fragment>
                )}
            </Grid>
            <Grid container item xs={8} md={6}>
                <MobileStepper
                    about={steps[activeStep]}
                    variant="text"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    className={classes.root}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === steps.length - 1}>
                            <Typography variant="button" className={classes.completed}>
                                {(activeStep + 1) < steps.length ? steps[activeStep + 1] : ''}
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Typography>
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            <Typography variant="button" className={classes.completed}>
                                {(activeStep - 1) >= 0 ? steps[activeStep - 1] : ''}
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </Typography>
                        </Button>
                    }
                />
            </Grid>
            <Grid container direction='row' alignItems='center' justifyContent='center' item xs={12}>
                {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                        <Typography variant="caption" className={classes.completed}>
                            Step {activeStep + 1} already completed
                        </Typography>
                    ) : (
                        <Grid>
                            {completedSteps() === totalSteps() - 1 ?
                                <Button variant="contained" color="primary" onClick={handleClickButton}>
                                    Guardar
                                </Button> :
                                <Button variant="contained" color="primary" onClick={handleComplete}>
                                    Finalizar Partido
                                </Button>}

                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
}

function Diputado({ partido, diputado, updateFormData, formData }) {
    const classes = constrolsStyles();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    return <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
        <FormControlLabel
            control={<TextField
                onChange={handleChange}
                name={`${diputado}`}
                id='standard-basic'
                label={`${partido}-${diputado}`}
                type='number'
                size='medium' className={classes.formControl}
                value={formData[diputado]} />}
            label="" className={classes.formLabel} />
    </FormControl>
}