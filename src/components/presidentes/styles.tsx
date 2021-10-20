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

export { presidenciablesStyles }