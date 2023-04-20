import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const CustomPrompt = ({ open, handleClose, title, message, confirmText, cancelText, onConfirm }) => {

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <p>{message}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomPrompt;
