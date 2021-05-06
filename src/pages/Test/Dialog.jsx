import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const MyDialog = ({ open, handleClose, handleNextSection, handleEnd, type }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{type === "section" ? "End Section" : "End Test"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {type === "section"
            ? "You finished section 1 and you're about to enter the next section. Are you sure you want to continue?"
            : "You're about to finish the test. Are you sure you want to continue?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button
          onClick={type === "section" ? handleNextSection : handleEnd}
          color="primary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default MyDialog;
