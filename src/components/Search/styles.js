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
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }, headingRight: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightLight,

    },
    typo: {
        marginBottom: theme.spacing(5),
    },
    tf: {
        margin: theme.spacing(1),

    },
    falseAccordion: {
        backgroundColor: "#ff9791",
    }
}));