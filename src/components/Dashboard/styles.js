import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },

    paper: {
        padding: theme.spacing(3),
        textAlign: 'center',

    },
    content: {
        // marginTop: theme.spacing(8),
        flexGrow: 1,

    }, tf: {
        paddingBottom: theme.spacing(5)
    }
}));