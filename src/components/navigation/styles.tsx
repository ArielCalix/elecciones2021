import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const appBarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 100,
            flexGrow: 1,
        },
        title: {
            textAlign: 'left',
            flexGrow: 1,
        },
        link: {
            textDecorationLine: 'none',
            color: 'inherit'
        },
        img: {
            width: '5ch'
        },
        logOut: {
            paddingLeft: theme.spacing(1),
        }
    }),
);

const useStyles = makeStyles((theme) => createStyles({
    formControl: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export { appBarStyles, useStyles }