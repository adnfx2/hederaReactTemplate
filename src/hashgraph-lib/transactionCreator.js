import { useState } from "react";
import { Hbar, TransferTransaction } from "@hashgraph/sdk";

export const useTransactionCreator = (client) => {
  const [transactionState, setTransactionState] = useState();

  const broadcastTransaction = async (
    transactionDetails,
    triggerRefreshBalance
  ) => {
    const { sender, receiver } = transactionDetails;
    const valueOut = sender.tokenAmount * -1;
    const valueIn = sender.tokenAmount;
    try {
      setTransactionState("broadcasting...");
      const transactionResponse = await new TransferTransaction()
        .addHbarTransfer(sender.accountId, Hbar.fromTinybars(valueOut))
        .addHbarTransfer(receiver, Hbar.fromTinybars(valueIn))
        .execute(client);
      setTransactionState("broadcasted!");
      const transactionRecord = await transactionResponse.getRecord(client);
      setTransactionState({ transactionRecord });
    } catch (e) {
      console.error("Tx failed!", e);
      setTransactionState("error");
    }
    triggerRefreshBalance();
  };

  return { transactionState, broadcastTransaction };
};
