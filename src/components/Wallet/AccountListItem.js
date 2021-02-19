import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Blockies from "react-blockies";

const useStyles = makeStyles((theme) => ({
  listItem: {
    minWidth: 240,
  },
  deleteButton: {
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },
}));

const AccountListItem = ({
  walletKeys,
  handleSelectAccount,
  handleDeleteAccount,
  ...props
}) => {
  const classes = useStyles();
  const { accountId } = walletKeys;

  return (
    <ListItem
      className={classes.listItem}
      button
      onClick={() => handleSelectAccount(walletKeys)}
      key={accountId}
      {...props}
    >
      <ListItemAvatar>
        <Avatar>
          <Blockies seed={accountId} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={accountId} />
      <DeleteIcon
        className={classes.deleteButton}
        onClick={handleDeleteAccount}
      />
    </ListItem>
  );
};

export const AddAccountItem = ({ handleAddAccount }) => {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const handleOpenAddAccount = () => setShowAddAccount(true);
  const handleCloseAddAccount = () => setShowAddAccount(false);

  const handleAccountField = (e) => {
    const value = e.target.value;
    setAccountId(value);
  };

  const handlePrivateKeyField = (e) => {
    const value = e.target.value;
    setPrivateKey(value);
  };

  const handleOnSubmit = () => {
    handleAddAccount(accountId, privateKey);
    setAccountId("");
    setPrivateKey("");
    handleCloseAddAccount();
  };

  const disableSubmit = !(accountId && privateKey);

  return (
    <>
      <ListItem button onClick={handleOpenAddAccount}>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Add account" />
      </ListItem>
      <Dialog open={showAddAccount} onClose={handleCloseAddAccount}>
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
    </>
  );
};

export default AccountListItem;
