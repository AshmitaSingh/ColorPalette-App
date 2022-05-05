import { DRAWER_WIDTH } from "../constants";
import sizes from "./sizes";

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        // For vertical spacing
        alignItems: 'center',
        height: '64px',
        [sizes.down("xs")]: {
            height: "55px"
        }
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {
        marginRight: '1rem',
        // To be more specific, i.e, if there is an anchor tag inside of a button then, text-decoration is set to none
        '& a': {
            textDecoration: 'none'
        },
        [sizes.down('xs')]: {
            marginRight: '0.5rem'
        }
    },
    button: {
        margin: '0 0.5rem',
        [sizes.down('xs')]: {
            margin: '0 0.2rem',
            padding: '0.3rem'
        }
    }
})

export default styles;