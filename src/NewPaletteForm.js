import React, { useState, useEffect } from 'react';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import ColorPickerForm from './ColorPickerForm';
import useStyles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

function NewPaletteForm(props, { maxColors = 20 }) {
    //'maxColors' is a default parameter which acts as defaultProps
    const classes = useStyles();
    // const theme = useTheme();
    //'open', 'currentColor', 'colors' works same as 'state' defined in a constructor
    const [open, setOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState('teal');
    //'props.palette[0].colors' is used to provide a default palette when the 'create palette form is opened'
    const [colors, setColors] = useState(seedColors[0].colors);
    // const [newColorName, setNewColorName] = useState('');
    // const [newPaletteName, setNewPaletteName] = useState('');
    const [fields, setFields] = useState({
        newColorName: '',
        newPaletteName: ''
    })
    const paletteIsFull = colors.length >= maxColors;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function updateCurrentColor(newColor) {
        setCurrentColor(newColor.hex);
    };

    function addNewColor() {
        const newColor = {
            color: currentColor,
            name: fields.newColorName
        }
        setColors(oldColors => [...oldColors, newColor]);
        //setting the 'newColorName' to be an empty string, so that it clears the input field of the form
        setFields({ newColorName: '' });
    };

    function clearColors() {
        setColors([]);
    };

    function addRandomColor() {
        //pick random color from existing palettes
        //using '.flat()' in order to put all the colors from every palette into one array
        const allColors = props.palettes.map(p => p.colors).flat();
        //Generating a random number
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = colors.some(color => color.name === randomColor.name);
        }
        //setting state
        setColors([...colors, randomColor]);
        //console.log(allColors);
    };


    function handleChange(evt) {
        setFields({ ...fields, [evt.target.name]: evt.target.value });

    }

    function handleSubmit(newPalette) {
        // let newName = fields.newPaletteName;
        // const newPalette = {
        //     paletteName: newName,
        //     // Replacing the 'space' with '-'
        //     id: newName.toLowerCase().replace(/ /g, '-'),
        //     colors: colors
        // }
        newPalette.id = newPalette.paletteName?.toLowerCase().replace(/ /g, '-');
        // console.log(newPalette.id);
        newPalette.colors = colors;
        console.log(newPalette.paletteName);
        props.savePalette(newPalette);
        //After clicking the 'save palette' button, we want to redirect to the home/root page
        props.history.push('/');
    }

    function removeColor(colorName) {
        //To remove a particular color from the 'create palette form'
        setColors(colors.filter(color => color.name !== colorName))
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        //'arrayMove' is a built in component of 'react-sortable-hoc' & is used to save the position of draggable boxes
        setColors(arrayMove(colors, oldIndex, newIndex));
    };

    return (
        <div className={classes.root}>
            <PaletteFormNav
                open={open}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleDrawerOpen={handleDrawerOpen}
                fields={fields}
                palettes={props.palettes}
            />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <div className={classes.container}>
                    <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={clearColors}>
                            Clear Palette
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disabled={paletteIsFull}
                            onClick={addRandomColor}>
                            Random Color
                        </Button>
                    </div>
                    <Divider />
                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        currentColor={currentColor}
                        fields={fields}
                        colors={colors}
                        addNewColor={addNewColor}
                        updateCurrentColor={updateCurrentColor}
                        handleChange={handleChange}
                    />
                </div>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    colors={colors}
                    removeColor={removeColor}
                    axis='xy'
                    // Sometimes the delete button/icon doesn't work, to fix that issue, below 'distance' property is used (here, 20 is pixel, i.e, 20 pixels distance)
                    distance={20}
                    onSortEnd={onSortEnd}
                />
            </main>
        </div>
    );
}

export default NewPaletteForm;