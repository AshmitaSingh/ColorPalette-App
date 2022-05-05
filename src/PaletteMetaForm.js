import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'


function PaletteMetaForm(props) {
    const { handleChange, handleSubmit, hideForm, fields, palettes } = props;
    const [stage, setStage] = useState('form');

    useEffect(() => {
        //to check -> is 'palette name' unique
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return palettes.every(
                // '?.' --> not sure what's the reason behind using '?', but it helped to get rid of the error : "toLowerCase() is undefined"
                ({ paletteName }) => paletteName?.toLowerCase() !== value?.toLowerCase()
            );
        });
    })

    function showEmojiPicker() {
        setStage('emoji');
    }

    function savePalette(emoji) {
        const newPalette = {
            paletteName: fields.newPaletteName,
            emoji: emoji.native
        }
        handleSubmit(newPalette);
        setStage('');
    }

    return (
        <div>
            <Dialog open={stage === 'emoji'} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Dialog Emoji</DialogTitle>
                <Picker
                    title='Pick an Emoji'
                    onSelect={savePalette}
                />
            </Dialog>
            <Dialog open={stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please choose a name for your new palette.
                            Make sure it's unique!
                        </DialogContentText>
                        <TextValidator
                            autoFocus
                            label='Palette Name'
                            value={fields.newPaletteName}
                            name='newPaletteName'
                            fullWidth
                            margin='normal'
                            onChange={handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Name already used']} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={hideForm} color="secondary">
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary' type='submit'>
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}


export default PaletteMetaForm;
