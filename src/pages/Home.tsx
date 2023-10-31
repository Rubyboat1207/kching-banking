import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Advertisement from "../components/Advertisement";
import { tryLogin } from "../api/api";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';

function Home() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const login = async () => {
    const wasSuccessful = await tryLogin(username, password);
    if (wasSuccessful) {
      window.sessionStorage.setItem("group_name", username);
      window.sessionStorage.setItem("password", password);
      navigate("/kching-bank/account");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          color: "text.primary",
          height: '100vh'
        }}
      >
        <Advertisement layout="vert" />
        <Paper
          elevation={3}
          sx={{ width: "auto", maxWidth: "400px", m: "auto", p: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography>Log In</Typography>
            <TextField
              label="Group Name"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
            />
            <Button variant="contained" onClick={login} sx={{ mt: 2 }} startIcon={<LoginIcon/>}>
              Login
            </Button>
          </Box>
        </Paper>
        <Advertisement layout="horiz" />
      </Container>
    </ThemeProvider>
  );
}

export default Home;
