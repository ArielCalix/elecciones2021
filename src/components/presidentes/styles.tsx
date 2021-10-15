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

const constrolsStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
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
        formSelectControl: {
            width: '40ch'
        },
        formLabel: {
            margin: theme.spacing(0)
        }
    }),
);

export { presidenciablesStyles, constrolsStyles }