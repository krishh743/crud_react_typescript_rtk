import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate} from "react-router";
import "./style.css"

const defaultTheme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative" sx={{backgroundColor: "grey"}}>
        <Toolbar>
          <Stack
            justifyContent={"flex-end"}
            direction={"row"}
            spacing={2}
            sx={{cursor: "pointer"}}
          >
            <Stack>
              <span onClick={() => navigate("/create")}>Create</span>
            </Stack>
            <Stack>
              <span>Edit</span>
            </Stack>
            <Stack>
              <span onClick={() => navigate("/alldetails")}>View</span>
            </Stack>
            <Stack>
              <span onClick={() => navigate("/alldetails")}>Delete</span>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Crud Operations{" "}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{pt: 4}}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <button
                className="home-btn"
                onClick={() => navigate("/alldetails")}
              >
                See All details
              </button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
