import React, { useState, MouseEvent, useEffect } from 'react';
import {
    AppBar, Toolbar, Grid, Typography,
    ListItemText, ListItemIcon, List, ListItem, Button, SwipeableDrawer, FormControl, MenuItem, InputLabel, Select
} from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import { IUtillities } from "../../helpers/IUtillities";
import { getData } from "../../helpers/Utillities";
import { appBarStyles, useStyles } from './styles'

type Anchor = 'top' | 'left' | 'bottom' | 'right';

function Bar() {
    const [datos, setDatos] = useState(undefined);
    const [keys, setKeys] = useState(undefined)
    const [formInit, setFormInit] = React.useState({
        municipio: '',
        mer: ''
    });
    const [mers, setMer] = useState([]);
    const getMers = async (muni) => {
        console.log(muni)
        const utils: IUtillities = {
            url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!C1:D453'
        }
        await getData(utils).then(results => {
            console.log(results)
            let obj = new Array;
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
    useEffect(() => {
        const Utillities: IUtillities = {
            url: '/sheets/get/1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A/Datos!F:F2'
        }
        getData(Utillities).then(result => {
            let str = result[0];
            const splittedValues = str[0].split(',');
            let obj = new Object()
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
    const classes = appBarStyles();
    const [anchorEl, setAnchorEl] = useState<boolean>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(prevAnchorEl => !prevAnchorEl);
    };
    const handleClose = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(prevAnchorEl => !prevAnchorEl);
    }
    const toggleDrawer = (anchor: Anchor, open: boolean) => () => {
        setAnchorEl(open);
    };
    const handleChangeMunicipio = (event) => {
        getMers(event.target.value)
        setFormInit({ ...formInit, municipio: event.target.value });
        console.log(formInit)
    };
    const handleChangeMer = (event) => {
        setFormInit({ ...formInit, mer: event.target.value });
        console.log(formInit)
    };
    const styles = useStyles();
    return (
        <React.Fragment>
            <AppBar position='static'>
                <Toolbar >
                    <Typography variant='h6' className={classes.title}>
                        Sistema Departamental de Transmision de Datos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container justifyContent='center' direction='column'>
                <FormControl className={styles.formControl}>
                    <InputLabel id="demo-simple-select-label">Municipios</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInit.municipio}
                        onChange={handleChangeMunicipio}
                    >
                        {keys && keys.map(key => {
                            return <option key={key} value={datos[key]}>{datos[key]}</option>
                        })}
                    </Select>
                </FormControl>
                <FormControl className={styles.formControl}>
                    <InputLabel id="demo-simple-select-label">Municipios</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formInit.mer}
                        onChange={handleChangeMer}
                    >
                        {mers && mers.map(mer => {
                            return <option key={mer} value={mer}>{mer}</option>
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </React.Fragment>
    );
}

export default Bar;