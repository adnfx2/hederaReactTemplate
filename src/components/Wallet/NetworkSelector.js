import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const NetworkSelector = () => {
  return (
    <Button variant="outlined" disabled endIcon={<ExpandMoreIcon />}>
      Testnet
    </Button>
  );
};

export default NetworkSelector;
