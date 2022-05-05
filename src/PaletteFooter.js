import React from 'react';
import styles from './styles/PaletteFooterStyles';
import { withStyles } from '@material-ui/styles';

//Since we don't have any state involved in this component, so, we are using a functional component
function PaletteFooter(props) {
    //We are using 'props' instead of 'this.props', because this is a 'functional' component & not a 'class' component.
    const { paletteName, emoji, classes } = props;
    return (
        <div>
            <footer className={classes.PaletteFooter}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </footer>
        </div>
    )
}

export default withStyles(styles)(PaletteFooter);
