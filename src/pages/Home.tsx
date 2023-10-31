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
      window.localStorage.setItem("group_name", username);
      window.localStorage.setItem("password", password);
      navigate("/kching-bank/account");
    }
  };

  const gn = window.localStorage.getItem('group_name');
  const pw = window.localStorage.getItem('password');
  
  if(gn && pw) {
    tryLogin(gn, pw).then(data => {
        if(data) {
            navigate("/kching-bank/account");
        }
    })
  }

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
        <div>
            {gn && pw &&
            <Paper
                elevation={3}
                sx={{ width: "auto", maxWidth: "400px", m: "auto", p: 3, mb: 5, border: 2, borderColor: 'divider' }}
            >
                <Typography>
                    You are still logged in, checking password...
                </Typography>
            </Paper>
            }
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
        </div>
        <Advertisement layout="horiz" />
      </Container>
    </ThemeProvider>
  );
}

export default Home;
