import { useReducer, useContext, createContext } from "react";

export const getDevAccount = () => {
  const devAccountId = process.env.REACT_APP_MY_ACCOUNT_ID;
  const devPrivateKey = process.env.REACT_APP_MY_PRIVATE_KEY;
  if (!devAccountId || !devPrivateKey) {
    console.log("%cHedera testing account not present", "color:yellow");
    return;
  }
  return { accountId: devAccountId, privateKey: devPrivateKey };
};

const accountsReducer = (state, action) => {
  switch (action.type) {
    case "accountAdded": {
      const { accountsList } = state;
      const newAccount = action.payload;
      return { ...state, accountsList: [...accountsList, newAccount] };
    }
    case "accountDeleted": {
      const { accountsList } = state;
      const accountIdToDelete = action.payload;
      const filteredAccountsList = accountsList.filter(
        ({ accountId }) => accountId !== accountIdToDelete
      );
      return { ...state, accountsList: filteredAccountsList };
    }
    case "accountSelectionChanged": {
      const accountSelected = action.payload || {};
      return { ...state, accountSelected };
    }
    default: {
      throw new Error(`Unhandled actionType: ${action.type}`);
    }
  }
};

const AccountsManagerStateContext = createContext();
const AccountsManagerDispatcherContext = createContext();

export const AccountsManagerProvider = ({ children }) => {
  const devAccount = getDevAccount();

  const defaultState = {
    accountSelected: {},
    accountsList: devAccount ? [devAccount] : [],
  };

  const [state, dispatch] = useReducer(accountsReducer, defaultState);

  const dispatcher = {
    deleteAccount: (accountId) => {
      dispatch({
        type: "accountDeleted",
        payload: accountId,
      });
    },
    addAccount: (walletKeys) => {
      dispatch({
        type: "accountAdded",
        payload: walletKeys,
      });
    },
    selectAccount: (walletKeys) => {
      dispatch({
        type: "accountSelectionChanged",
        payload: walletKeys,
      });
    },
  };

  return (
    <AccountsManagerStateContext.Provider value={state}>
      <AccountsManagerDispatcherContext.Provider value={dispatcher}>
        {children}
      </AccountsManagerDispatcherContext.Provider>
    </AccountsManagerStateContext.Provider>
  );
};

export const useAccountsManagerState = () => {
  const context = useContext(AccountsManagerStateContext);
  if (context === undefined) {
    throw new Error(
      "useAccountsManagerState must be used whithin AccountsManagerProvider"
    );
  }
  return context;
};

export const useAccountsManagerDispatcher = () => {
  const context = useContext(AccountsManagerDispatcherContext);
  if (context === undefined) {
    throw new Error(
      "useAccountsManagerDispatch must be used whithin AccountsManagerProvider"
    );
  }
  return context;
};
