import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const AccountManagerDialog = ({ open, handlers }) => {
  const [accountId, setAccountId] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const handleAccountField = (e) => {
    const value = e.target.value;
    setAccountId(value);
  };

  const handlePrivateKeyField = (e) => {
    const value = e.target.value;
    setPrivateKey(value);
  };

  const { handleClose, handleAddAccount } = handlers;

  const handleOnSubmit = () => {
    handleAddAccount(accountId, privateKey);
    setAccountId("");
    setPrivateKey("");
    handleClose();
  };

  const disableSubmit = !(accountId && privateKey);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add account</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="accoundId"
          label="Hedera account ID"
          name="AccountId"
          onChange={handleAccountField}
          value={accountId}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="privateKey"
          label="Private Key"
          name="PrivateKey"
          onChange={handlePrivateKeyField}
          value={privateKey}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={disableSubmit}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleOnSubmit}
        >
          Done!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountManagerDialog;
