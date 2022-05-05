import React, { PureComponent } from 'react';
import styles from './styles/MiniPaletteStyles';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends PureComponent {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    deletePalette(e) {
        //Used so that other events don't occur after the current/ongoing event
        e.stopPropagation();
        // alert('Clicked!!!!!');
        this.props.openDialog(this.props.id);
    }

    handleClick() {
        this.props.goToPalette(this.props.id);
    }

    render() {
        const { classes, paletteName, emoji, colors } = this.props;
        const miniColorBoxes = colors.map(color => (
            //Mini-divs inside of miniColorBoxes/miniPalette
            <div
                className={classes.miniColor}
                style={{ backgroundColor: color.color }}
                // We use "key" while iterating over things
                key={color.name}
            />
        ));

        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon
                    className={classes.deleteIcon}
                    style={{ transition: 'all 0.3s ease-in-out' }}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {/* Mini Color Boxes */}
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>
                    {paletteName} <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        );
    }
}

//Higher order component
export default withStyles(styles)(MiniPalette);