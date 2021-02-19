import { useState } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import AccountListItem, { AddAccountItem } from "./AccountListItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { useAccountsManagerDispatcher } from "../../hashgraph-lib/accountsManager";

const AccountsList = ({ accountId, accountsList }) => {
  const [showAccounts, setShowAccounts] = useState(false);
  const handleOpenAccountsList = () => setShowAccounts(true);
  const handleCloseAccountsList = () => setShowAccounts(false);
  const accountsManagerDispatcher = useAccountsManagerDispatcher();

  const handleSelectAccount = (walletKeys) => {
    accountsManagerDispatcher.selectAccount(walletKeys);
    handleCloseAccountsList();
  };

  const handleDeleteAccount = (accountId) => {
    accountsManagerDispatcher.deleteAccount(accountId);
  };

  const handleAddAccount = (walletKeys) => {
    accountsManagerDispatcher.addAccount(walletKeys);
  };

  return (
    <>
      {accountId ? (
        <Button
          onClick={() => handleSelectAccount()}
          variant="contained"
          color="secondary"
        >
          Disconnect
        </Button>
      ) : (
        <Button
          onClick={handleOpenAccountsList}
          variant="contained"
          color="primary"
        >
          Connect
        </Button>
      )}
      <Dialog onClose={handleCloseAccountsList} open={showAccounts}>
        <DialogTitle align="center">Accounts</DialogTitle>
        <DialogContent>
          <List>
            {accountsList.map((wallet) => (
              <AccountListItem
                key={wallet.accountId}
                handleSelectAccount={handleSelectAccount}
                handleDeleteAccount={handleDeleteAccount}
                walletKeys={wallet}
              />
            ))}
            <AddAccountItem handleAddAccount={handleAddAccount} />
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountsList;
