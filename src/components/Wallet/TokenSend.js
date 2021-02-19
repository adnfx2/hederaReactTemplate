import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useHederaClient } from "../../hashgraph-lib/clientProvider";
import { useTransactionCreator } from "../../hashgraph-lib/transactionCreator";
import { toast } from "react-toastify";

const useNotifications = (transactionState) => {
  useEffect(() => {
    if (transactionState === "broadcasting...") {
      return toast.info("Broadcast transaction...");
    }
    if (transactionState === "broadcasted!") {
      return toast.info("Transaction broadcasted!");
    }
    if (transactionState === "error") {
      return toast.error("Transaction failed!");
    }
    if (transactionState?.transactionRecord) {
      const { transactionHash } = transactionState.transactionRecord;
      const readableHash = Buffer.from(transactionHash).toString("hex");
      const blockExplorerLink = `https://testnet.dragonglass.me/hedera/search?q=${readableHash}`;
      return toast.success(
        <>
          <Typography>Transaction succeded</Typography>
          <Link rel="noopener" target="_blank" href={blockExplorerLink}>
            Go to HederaExplorer
          </Link>
        </>
      );
    }
  }, [transactionState]);
};

const TokenSender = ({ accountId, triggerRefreshBalance }) => {
  const [openSenderModal, setOpenSenderModal] = useState(false);
  const [tokenAmount, setTokenAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const { client } = useHederaClient();
  const { transactionState, broadcastTransaction } = useTransactionCreator(
    client
  );
  useNotifications(transactionState);

  const closeSender = () => {
    setOpenSenderModal(false);
  };

  const openSender = () => {
    setOpenSenderModal(true);
  };

  const handleTokenAmountField = (e) => {
    const value = e.target.value;
    setTokenAmount(value);
  };

  const handleToAddressField = (e) => {
    const value = e.target.value;
    setToAddress(value);
  };

  const handleOnSubmit = () => {
    const transactionDetails = {
      sender: { accountId, tokenAmount },
      receiver: toAddress,
    };
    broadcastTransaction(transactionDetails, triggerRefreshBalance);
    setTokenAmount("");
    setToAddress("");
    closeSender();
  };

  const disableSubmit = !(tokenAmount && toAddress);

  return (
    <Container>
      <Button
        disabled={!accountId}
        fullWidth
        onClick={openSender}
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
      <Dialog open={openSenderModal} onClose={closeSender}>
        <DialogTitle align="center">Send Hbar</DialogTitle>
        <DialogContent onSubmit={handleOnSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="Amount"
            name="amount"
            onChange={handleTokenAmountField}
            value={tokenAmount}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="toAddress"
            label="To address"
            name="toAddress"
            onChange={handleToAddressField}
            value={toAddress}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleOnSubmit}
            disabled={disableSubmit}
            variant="contained"
            color="primary"
            size="large"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TokenSender;
