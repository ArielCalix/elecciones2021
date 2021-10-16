import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Grid, Typography,
    FormControl, InputLabel, Select, Button,
} from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { IUtillities } from "../../helpers/IUtillities";
import { getData } from "../../helpers/Utillities";
import { appBarStyles, useStyles } from './styles'
import { IAppBarProps } from "../../interfaces/INavigation";
import TabsLevels from "../commons/Tabs";
// type Anchor = 'top' | 'left' | 'bottom' | 'right';
const Utillities: IUtillities = {
    url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
}

function Bar(props: IAppBarProps) {
    const [datos, setDatos] = useState(undefined);
    const [keys, setKeys] = useState(undefined)
    const [visibleSelect, setVisible] = useState(true)
    const [formInit, setFormInit] = React.useState({
        AMunicipio: '',
        AMER: ''
    });
    const [mers, setMer] = useState([]);
    useEffect(() => {
        Utillities.url = '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
        getData(Utillities).then(result => {
            let str = result[0];
            const splittedValues = str[0].split(',');
            let obj = {};
            splittedValues.forEach(municipio => {
                const muni = municipio.replace(/ /g, '');
                obj[muni] = municipio
            })
            setDatos(obj);
            setKeys(Object.keys(obj));
        }).catch(error => {
            console.error(error);
        });
    }, [])
    const getMers = async (muni) => {
        Utillities.url = '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!C1:D453'
        await getData(Utillities).then(results => {
            let obj = [];
            results.forEach(result => {
                if (result[0] === muni) {
                    obj.push(result[1]);
                }
            })
            setMer(obj)
        }).catch(error => {
            console.error(error);
        });
    }
    const handleChangeMunicipio = (event) => {
        getMers(event.target.value)
        setFormInit({ ...formInit, AMunicipio: event.target.value });
    };
    const handleChangeMer = (event) => {
        setFormInit({ ...formInit, AMER: event.target.value });
        setVisible(false);
    };
    const classes = appBarStyles();
    return (
        <React.Fragment>
            <AppBar position='static'>
                <Toolbar >
                    <Typography variant='h6' className={classes.title}>
                        SIDETRAD
                    </Typography>
                    <Button color="inherit" onClick={props.handleLogOut}>
                        <Typography variant='button' className={classes.title}>
                            Cerrar Sesión
                        </Typography>
                        <PowerSettingsNewIcon className={classes.logOut} />
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container alignItems='center' justifyContent='center' direction='column' md>
                {visibleSelect && <Selects datos={datos} mers={mers} keys={keys} handleChangeMunicipio={handleChangeMunicipio}
                    handleChangeMer={handleChangeMer} formInit={formInit}></Selects>}
                <TabsLevels formInit={formInit}></TabsLevels>
            </Grid>
        </React.Fragment>
    );
}

function Selects({ datos, mers, keys, handleChangeMunicipio, handleChangeMer, formInit }) {
    const styles = useStyles();
    return <Grid container item justifyContent='center' direction='column' md={4}>
        <FormControl className={styles.formControl}>
            <InputLabel id="demo-simple-select-label">Municipios</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formInit.AMunicipio}
                onChange={handleChangeMunicipio}
            >
                {keys && keys.map(key => {
                    return <option key={key} value={datos[key]}>{datos[key]}</option>
                })}
            </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
            <InputLabel id="demo-simple-select-label">MER</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formInit.AMER}
                onChange={handleChangeMer}
            >
                {mers && mers.map(mer => {
                    return <option key={mer} value={mer}>{mer}</option>
                })}
            </Select>
        </FormControl>
    </Grid>
}

export default Bar;