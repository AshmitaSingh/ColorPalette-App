import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import styles from './styles/ColorPickerFormStyles';


function ColorPickerForm(props) {
    const { classes, paletteIsFull, currentColor, fields, colors, addNewColor, updateCurrentColor, handleChange } = props;

    //Instead of ComponentDidMount()
    useEffect(() => {
        // custom rule will have name 'isColorNameUnique'
        //'value' = whatever is in that input
        //to check -> is 'color name' unique
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
            //checking that every color name in 'colors' is not equal to the color name in 'value' 
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });

        //to check -> is 'color' unique
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            //checking that every color in 'colors' is not equal to the currentColor  
            return colors.every(
                ({ color }) => color !== currentColor
            );
        });
    })

    return (
        <div>
            <ChromePicker
                // For me, to resize the chromePicker, width='100%' wasn't working, so after some research, 
                // I found out that 'width' can be used as props for 'ChromePicker', 
                // and using hit & trial method with 'pixels' worked out for me instead of using '%' 
                width={358}
                color={currentColor}
                onChangeComplete={updateCurrentColor}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                <TextValidator
                    value={fields.newColorName}
                    name='newColorName'
                    variant='filled'
                    placeholder='Color Name'
                    margin='normal'
                    className={classes.colorNameInput}
                    onChange={handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
                />
                <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                    className={classes.addColor}
                    disabled={paletteIsFull}
                    style={{
                        backgroundColor: paletteIsFull ? 'grey' : currentColor
                    }}
                >
                    {paletteIsFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default withStyles(styles)(ColorPickerForm);