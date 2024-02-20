import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ResetConfirmationDialogPropType {
  open: boolean,
  onClose: any,
  onConfirm: any,
}

const ResetConfirmationDialog = ({
  open,
  onClose,
  onConfirm
}: ResetConfirmationDialogPropType) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {"Reset Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure? You want to permanently remove all the tasks?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mb: "10px", mr: "15px" }}>
        <Button size="small" variant='outlined' onClick={onClose}>No</Button>
        <Button size="small" variant='outlined' color={"success"} onClick={onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResetConfirmationDialog;