import { createContext, useContext, useState, useEffect } from "react";
import { Client } from "@hashgraph/sdk";

const HederaClientContext = createContext();

export const useHederaClient = () => {
  const context = useContext(HederaClientContext);

  if (!context) {
    throw new Error(
      "useHederaClient must be used within a HederaClientProvider"
    );
  }
  return context;
};

export const HederaClientProvider = ({
  children,
  accountSelected,
  ...props
}) => {
  const [hederaClient, setHederaClient] = useState({ client: null, error: "" });
  useEffect(() => {
    if (!accountSelected.accountId) return;
    try {
      const { accountId, privateKey } = accountSelected;
      const client = Client.forTestnet();
      client.setOperator(accountId, privateKey);
      setHederaClient({ client, error: "" });
      console.log("Client connected");
    } catch (e) {
      console.error("HederaClientProvider error");
      setHederaClient({ client: null, error: "Couldn't connect to testnet" });
    }
    return () => console.log("Client disconnected");
  }, [accountSelected]);

  return (
    <HederaClientContext.Provider value={hederaClient} {...props}>
      {children}
    </HederaClientContext.Provider>
  );
};
