import { useState } from "react";
import { AccountBalanceQuery } from "@hashgraph/sdk";

export const useBalanceQuery = (client) => {
  const [accountBalance, setAccountBalance] = useState();

  const requestBalance = async (accountId) => {
    if (!client || !accountId) {
      console.warn("Client and AccountId required to request balance");
      setAccountBalance();
      return;
    }
    try {
      setAccountBalance("loading");
      const requestedBalance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
      const value = requestedBalance.hbars.toString();
      setAccountBalance({ value });
    } catch (e) {
      setAccountBalance("error");
      console.error(" [Error requesting balance] ", e);
    }
  };

  return { accountBalance, requestBalance };
};

