import sizes from "./sizes";
import bg from './bg.svg';

export default {
    '@global': {
        '.fade-exit': {
            opacity: 1
        },
        '.fade-exit-active': {
            opacity: 0,
            transition: 'opacity 500ms ease-out'
        }
    },
    root: {
        // backgroundColor: 'rgb(34, 24, 170)',
        height: "100vh",
        overflow: "auto",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: 'rgb(255, 134, 233)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // Background by SVGBackgrounds.com
        backgroundImage: `url(${bg})`,
        [sizes.down('xs')]: {
            overflow: 'scroll'
        }
    },
    heading: {
        fontSize: '2rem'
    },
    createPaletteTitle: {
        fontSize: '1.25rem'
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down('xl')]: {
            width: '80%'
        },
        [sizes.down('xs')]: {
            width: '75%'
        }
    },
    nav: {
        width: "100%",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        marginBottom: "50px",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "2.5rem",
        [sizes.down('md')]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down('xs')]: {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1.4rem"
        }
    }
};