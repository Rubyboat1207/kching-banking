import { useEffect, useState } from "react";
import { getGroupInfo, sendMoney } from "../api/api";
import moment from "moment-timezone";
import Advertisment from "../components/Advertisement";
import { useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
} from "@mui/material";

function isNumber(numStr: string) {
  return !isNaN(parseFloat(numStr)) && !isNaN(+numStr);
}

function Account() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [balance, setBalance] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const isAdmin = ["jameswright", "facilitatorsofkching", "gilliam"].includes(
    localStorage.getItem("group_name") || ""
  );
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
      setTableData(data.records);
      setBalance("$" + data.account_balance);
      setProcessing(false);
    });
  }

  function logOut() {
    window.localStorage.clear();
    naviagate("/kching-bank/");
  }

  function beginTransfer() {
    setProcessing(true);
    const num = amount.replace("$", "");
    if (!isNumber(num)) {
      alert("amount must be a number. No symbols allowed.");
      setProcessing(false);
      return;
    }

    if (
      confirm(
        `Do you want to transfer \$${amount} to ${recipient}? This confirmation will only appear once.`
      )
    ) {
      sendMoney(recipient, parseFloat(num), message).then(resetData).catch(() => {
        alert(
          "The request did not successfully go through. Please try again, the api may be overwhelmed."
        );
        resetData();
      })
    }
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
              onClick={logOut}
              startIcon={<LogoutIcon />}
              sx={{ mb: 2 }}
            >
              Log Out
            </Button>
          </Paper>
          <Paper
            elevation={3}
            sx={{ my: 2, p: 3, border: 2, borderColor: "divider", mt: 5 }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Transfer Money
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ "& > :not(style)": { m: 1 }, mb: 3 }}>
              <TextField
                label="Recipient Entity"
                variant="outlined"
                onChange={(e) => setRecipient(e.target.value)}
                value={recipient}
                fullWidth
              />
              <TextField
                label="Transfer Amount"
                variant="outlined"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                fullWidth
              />
              {isAdmin && (
                <TextField
                  label="Transaction Message / Label"
                  variant="outlined"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  fullWidth
                />
              )}
            </Box>
            <Button
              variant="contained"
              onClick={beginTransfer}
              disabled={processing}
              startIcon={<AttachMoneyIcon />}
              sx={{ mb: 2 }}
            >
              Transfer Money
            </Button>
          </Paper>
          <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 5 }}>
            Account History
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Button
            variant="contained"
            onClick={() => {
              resetData();
              setBalance(null);
              setTableData([]);
            }}
            disabled={processing}
            startIcon={<ReplayIcon />}
            sx={{ mb: 2 }}
          >
            Reload
          </Button>
          <TableContainer component={Paper}>
            <Table aria-label="transaction table">
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Difference</TableCell>
                  <TableCell>Balance after</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
                  .map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>{d.action}</TableCell>
                      <TableCell>{d.difference}</TableCell>
                      <TableCell>{d.initial_balance}</TableCell>
                      <TableCell>
                        {moment(parseInt(d.timestamp) * 1000).format(
                          "DD/MM/YYYY hh:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell>{d.message}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* <Advertisment layout="vert" /> */}
      </Container>
    </ThemeProvider>
  );
}

export default Account;
