import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import AccountsSelector from "./AccountsList";
import { HederaClientProvider } from "../../hashgraph-lib/clientProvider";
import { useAccountsManagerState } from "../../hashgraph-lib/accountsManager";
import TokenBalance from "./TokenBalance";
import TokenSend from "./TokenSend";
import TokenRequest from "./TokenRequest";
import AccountID from "./AccountID";
import NetworkSelector from "./NetworkSelector";

const useStyles = makeStyles((theme) => ({
  walletContent: {
    maxWidth: 555,
    padding: theme.spacing(8, 2, 6),
  },
  utilSpread: { display: "flex", justifyContent: "space-between" },
}));

const Wallet = () => {
  const { accountSelected, accountsList } = useAccountsManagerState();
  const [refreshBalanceFlag, setRefreshBalanceFlag] = useState(false);
  const triggerRefreshBalance = () =>
    setRefreshBalanceFlag((prevState) => !prevState);

  const classes = useStyles();

  return (
    <HederaClientProvider accountSelected={accountSelected}>
      <Container className={classes.walletContent}>
        <Card>
          <CardContent className={classes.utilSpread}>
            <NetworkSelector />
            <AccountsSelector
              accountId={accountSelected.accountId}
              accountsList={accountsList}
            />
          </CardContent>
          <Divider />
          <CardContent>
            <AccountID accountId={accountSelected.accountId} />
          </CardContent>
          <CardContent>
            <TokenBalance
              refreshBalanceFlag={refreshBalanceFlag}
              triggerRefreshBalance={triggerRefreshBalance}
              accountId={accountSelected.accountId}
            />
          </CardContent>
          <CardContent className={classes.utilSpread}>
            <TokenSend
              triggerRefreshBalance={triggerRefreshBalance}
              accountId={accountSelected.accountId}
            />
            <TokenRequest accountId={accountSelected.accountId} />
          </CardContent>
        </Card>
      </Container>
    </HederaClientProvider>
  );
};

export default Wallet;
