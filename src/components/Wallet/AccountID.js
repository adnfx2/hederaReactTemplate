import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Blockies from "react-blockies";
import Grid from "@material-ui/core/Grid";
import ErrorIcon from "@material-ui/icons/Error";

const AccountID = ({ accountId }) => {
  return (
    <Container>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item>
          <Avatar>
            {accountId ? <Blockies seed={accountId} /> : <ErrorIcon />}
          </Avatar>
        </Grid>
        <Grid item>
          <Typography>{accountId || "Disconnected"}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountID;
