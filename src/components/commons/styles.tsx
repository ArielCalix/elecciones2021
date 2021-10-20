import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
            width: '30ch',
        },
        formControl: {
            width: '30ch'
        },
        formSelectControl: {
            width: '30ch'
        },
        formLabel: {
            margin: theme.spacing(0)
        },
        title: {
            textAlign: 'left',
            flexGrow: 1,
        },
    }),
);

export { constrolsStyles }