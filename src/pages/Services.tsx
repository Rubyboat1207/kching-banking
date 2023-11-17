import { useEffect, useState } from "react";
import { getGroupInfo, requestBox, sendMoney } from "../api/api";
import { useNavigate } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from '@mui/icons-material/Inventory';
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  TextField,
  Box,
} from "@mui/material";

function isNumber(numStr: string) {
  return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
}

function Services() {
  const [balance, setBalance] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const [boothSpace, setBoothSpace] = useState("");
  const [requestedBoxes, setRequestedBoxes] = useState("");
  const naviagate = useNavigate();

  useEffect(resetData, []);

  function resetData() {
    if (
      !window.localStorage.getItem("group_name") ||
      !window.localStorage.getItem("password")
    ) {
      logOut();
      alert("Your account is invalid. Please log-in again");
      return;
    }

    getGroupInfo().then((data) => {
      setBalance("$" + data.account_balance);
      setProcessing(false);
    });
  }

  function logOut() {
    window.localStorage.clear();
    naviagate("/kching-bank/");
  }

  function purchaseBox() {
    setProcessing(true);
    const num = requestedBoxes;
    if (!isNumber(num)) {
      alert("amount must be a number. No symbols allowed.");
      setProcessing(false);
      return;
    }

    if(boothSpace == '' || !boothSpace) {
      alert("Booth Space is required");
      setProcessing(false);
      return;
    }

    requestBox(parseInt(num), boothSpace).then(() => {
      setProcessing(false);
    }).catch(e => {
      setProcessing(false);
      alert('There was an unexpected error. Sorry')
    });
  }

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* <Advertisment layout="vert" /> */}
        <Paper sx={{ p: 3, my: 2 }}>
          <Paper
            elevation={3}
            sx={{ my: 2, p: 3, border: 2, borderColor: "divider" }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Account Info
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="h4" sx={{ mb: 2 }}>
              {localStorage.getItem("group_name")}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Your Current balance is: {balance || "loading"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => naviagate("/kching-bank/account")}
              startIcon={<AccountBalanceIcon />}
              sx={{ mb: 2 }}
            >
              Back to banking info
            </Button>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              my: 2,
              p: 3,
              border: 2,
              borderColor: "#FFA500",
              boxShadow: "0 0 10px 5px #FFA50033",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Cardboard Boxes
            </Typography>

            <Divider sx={{ mb: 3 }} />
            <Box sx={{ "& > :not(style)": { m: 1 }, mb: 3 }}>
              <TextField
                label="Booth Location"
                variant="outlined"
                onChange={(e) => setBoothSpace(e.target.value)}
                value={boothSpace}
                required
                fullWidth
              />
              <TextField
                label="Boxes Amount"
                variant="outlined"
                onChange={(e) => setRequestedBoxes(e.target.value)}
                value={requestedBoxes}
                required
                fullWidth
              />
              <Typography>$40 per box</Typography>

              <Button
                variant="contained"
                onClick={purchaseBox}
                startIcon={<InventoryIcon />}
                disabled={processing}
                sx={{ mb: 2 }}
              >
                Purchase Boxes
              </Button>
            </Box>
          </Paper>
        </Paper>
        {/* <Advertisment layout="vert" /> */}
      </Container>
    </ThemeProvider>
  );
}

export default Services;
