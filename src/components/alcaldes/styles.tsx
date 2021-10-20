import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const presidenciablesStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            color: 'white'
        },
        button: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
            color: 'white'
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }),
);

export { presidenciablesStyles, useStyles }