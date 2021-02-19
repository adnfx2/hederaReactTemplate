import { useState } from "react";
import { PrivateKey, AccountCreateTransaction, Hbar } from "@hashgraph/sdk";

export const useAccountCreator = (client) => {
  const [hederaAccount, setHederaAccount] = useState();

  const createAccount = async () => {
    const newPrivateKey = PrivateKey.generate();
    const newPublicKey = newPrivateKey.publicKey;
    const keyPair = { publicKey: newPublicKey, privateKey: newPrivateKey };

    const transactionResponse = await new AccountCreateTransaction()
      .setKey(newPublicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(client);

    const { accountId } = await transactionResponse.getReceipt(client);

    setHederaAccount({
      keyPair,
      accountId,
    });
  };

  return { hederaAccount, createAccount };
};
