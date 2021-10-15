import React, { useEffect } from "react";
import { IUtillities } from "../helpers/IUtillities";
import { getData, saveData } from "../helpers/Utillities";

function Partidos() {
    const dataGet = {
        id: '1uPyojqpBlK_Y1J3xSvkzHfSrTUHIHomgh3MmRlnKm7A',
        ranges: 'Datos!B:B2'
    }
    const dataInsert = {
        id: '1yiCT30F9jk-_QZoJYDFDPdch8Ne3CSUQjCGwSPCyZuE',
        data: {
            MER: '2250',
            PLH: '26',
            PNH: '25',
            PINU: '35',
            PDCH: '25',
            UD: '30',
            PAC: '15',
            ALIANZA: '35',
            LIBRE: '15',
            ELFRENTE: '25',
            VAMOS: '14',
            PNRH: '15',
            PSH: '15',
            LIDEHR: '15',
            TSH: '12',
            sheetName: 'Presidencial',
            Municipio: 'Danlí'
        }
    }
    useEffect(() => {
        const Utills: IUtillities = {
            url: `/sheets/get/${dataGet.id}/${dataGet.ranges}`,
        }
        const utils: IUtillities = {
            url: `/sheets/insert/${dataInsert.id}`,
            data: dataInsert.data
        }
        saveData(utils)
        getData(Utills)
    }, [])
    return <>Hola desde Partidos</>
}

export { Partidos }