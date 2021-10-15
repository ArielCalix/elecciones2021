import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const estilos = {
    palette: {
        primary: {
            main: '#183979',
            contrastText: '#d7d0d0'
        },
        secondary: {
            main: '#2d2660',
            contrastText: '#d7d0d0'
        },
        error: {
            main: '#f44336',
            contrastText: '#fff'
        },
        warning: {
            main: '#ba7b24',
            contrastText: '#fff'
        },
        info: {
            main: '#2c2660',
            contrastText: '#fff'
        },
        success: {
            main: '#3c8c5c',
            contrastText: '#fff'
        },
        text: {
            primary: '#000',
            secondary: '#000',
            disabled: '#000',
            hint: '#000'
        },
        action: {
            active: '#2D2660',
            hoverOpacity: 0.5,
            disabledOpacity: 0.5,
            disabledBackground: '#2D2660',
            focusOpacity: 0.5,
            activatedOpacity: 0.5
        },
        common: {
            black: '#575454',
            white: '#d7d0d0'
        },
        contrastThreshold: 3,
        tonalOffset: 0.5,
        background: {
            default: '#183979',
            paper: '#d7d0d0'
        }
    }
}

export const appStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 500,
        },
        imgContainer: {
            width: '50ch',
            marginTop: theme.spacing(3),
            textAlign: 'center'
        },
        img: {
            width: '20ch'
        },
        bottom: {
            color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
);