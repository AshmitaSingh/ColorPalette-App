import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';


function PaletteFormNav(props) {
    const { classes, open, handleChange, handleSubmit, handleDrawerOpen, fields, palettes } = props;

    const [formShowing, setFormShowing] = useState(false);

    function showForm() {
        setFormShowing(true);
    }

    function hideForm() {
        setFormShowing(false);
    }

    return (
        <div className={classes.root}>
            {/* <CssBaseline /> */}
            <AppBar
                position="fixed"
                color='default'
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open
                        })}
                    >
                        <AddToPhotosIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to='/'>
                        <Button variant='contained' color='secondary' className={classes.button}>Go Back</Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
                        Save
                    </Button>
                </div>
            </AppBar>

            {formShowing && (
                <PaletteMetaForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    fields={fields}
                    palettes={palettes}
                    hideForm={hideForm}
                />
            )}
        </div>
    )
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);