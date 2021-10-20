import React from 'react';
import { Grid, Tabs, Tab, Box } from '@material-ui/core';
import { ITabPanelProps } from "../../interfaces/ITabPanelProps";
import GavelIcon from '@material-ui/icons/Gavel';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Presidencial from "../presidentes/presidentes";
import Diputados from "../diputados/diputados";
import Alcaldes from '../alcaldes/alcaldes';

export default function TabsLevels({ formInit }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    function a11yProps(index: any) {
        return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,
        };
    }
    return <React.Fragment>
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
        >
            <Tab label="Diputados" icon={<GavelIcon />} {...a11yProps(0)} />
            <Tab label="Presidentes" icon={<AccountBalanceIcon />} {...a11yProps(1)} />
            <Tab label="Alcaldes" icon={<PersonPinIcon />} {...a11yProps(2)} />
        </Tabs>
        <Grid container alignItems='center' justifyContent='center' >
            <TabPanel value={value} index={0}>
                <Diputados formInit={formInit} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Presidencial formInit={formInit} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Alcaldes formInit={formInit} ></Alcaldes>
            </TabPanel>
        </Grid>
    </React.Fragment>

}

function TabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}