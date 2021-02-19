import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useBalanceQuery } from "../../hashgraph-lib/balanceQuery";
import { useHederaClient } from "../../hashgraph-lib/clientProvider";

const useRefreshBalance = (accountId, retry) => {
  const { client } = useHederaClient();
  const { accountBalance, requestBalance } = useBalanceQuery(client);
  useEffect(() => {
    requestBalance(accountId);
  }, [client, accountId, retry]);
  return accountBalance;
};

const TokenBalance = ({
  accountId,
  refreshBalanceFlag,
  triggerRefreshBalance,
}) => {
  const accountBalance = useRefreshBalance(accountId, refreshBalanceFlag);

  const handleClickToRefreshBalance = () => {
    if (!accountId) return;
    if (accountBalance === "loading") return;
    triggerRefreshBalance();
  };

  return (
    <Container>
      <Tooltip title="Click To Refresh Balance" arrow>
        <Typography
          align="center"
          variant="h5"
          onClick={handleClickToRefreshBalance}
        >
          {accountBalance === "loading" && <CircularProgress />}
          {accountBalance === "error" && "error"}
          {accountBalance?.value && `${accountBalance.value}`}
        </Typography>
      </Tooltip>
    </Container>
  );
};

export default TokenBalance;
