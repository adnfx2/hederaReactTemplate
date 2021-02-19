import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import QRCode from "qrcode.react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles(() => ({
  qrCode: {
    width: 200,
    height: 200,
  },
}));

const TokenRequest = ({ accountId }) => {
  const classes = useStyles();
  const [openSenderModal, setOpenSenderModal] = useState(false);
  const [tooltipValue, setTooltipValue] = useState("Copy to clipboard");
  const closeSender = () => setOpenSenderModal(false);
  const openSender = () => setOpenSenderModal(true);
  const handleOnCopy = () => setTooltipValue("Copied!");
  const handleCloseTooltip = () =>
    setTimeout(() => setTooltipValue("Copy to clipboard"), 200);

  return (
    <Container>
      <Button
        disabled={!accountId}
        fullWidth
        onClick={openSender}
        variant="contained"
        color="primary"
        endIcon={<GetAppIcon />}
      >
        Receive
      </Button>
      <Dialog
        className={classes.utilFlexCenter}
        open={openSenderModal}
        onClose={closeSender}
      >
        <DialogTitle align="center">Public Key</DialogTitle>
        <DialogContent>
          <QRCode
            className={classes.qrCode}
            value={accountId}
            level="H"
            includeMargin
            renderAs="svg"
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title={tooltipValue} arrow onClose={handleCloseTooltip}>
            <CopyToClipboard text={accountId} onCopy={handleOnCopy}>
              <Button fullWidth endIcon={<FileCopyIcon />} variant="outlined">
                {accountId}
              </Button>
            </CopyToClipboard>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TokenRequest;
