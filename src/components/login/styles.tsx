import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(0),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '40ch',
        },
        formControl: {
            width: '40ch'
        },
        formLabel: {
            margin: theme.spacing(0)
        },
        title: {
            textAlign: 'center',
            flexGrow: 1,
        },
        imgContainer: {
            width: '40ch',
            marginTop: theme.spacing(3),
            textAlign: 'center'
        },
        img: {
            width: '20ch'
        }
    }),
);

export { useStyles }