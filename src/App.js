import Header from "./components/Header";
import Wallet from "./components/Wallet";
import DarkThemeProvider from "./material-ui/DarkThemeProvider";
import { AccountsManagerProvider } from "./hashgraph-lib/accountsManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <DarkThemeProvider>
      <AccountsManagerProvider>
        <Header />
        <Wallet />
        <ToastContainer />
      </AccountsManagerProvider>
    </DarkThemeProvider>
  );
};

export default App;
