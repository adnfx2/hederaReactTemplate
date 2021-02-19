import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import hederaLogo from "../../assets/hedera-logo.svg";

const useStyles = makeStyles({
  logo: {
    maxWidth: 64,
    paddingRight: 10,
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <img src={hederaLogo} alt="Hedera" className={classes.logo} />
        <Typography variant="h6">HEDERA TEMPLATE</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
