import * as React from "react";
import {useState} from "react";
import {addUser} from "../redux/Reducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface FormData {
  name: string;
  email: string;
  age: string;
  address: string;
}

interface Props {
  onSubmit: (formData: FormData) => void;
}

const initialState: FormData = {
  name: "",
  email: "",
  age: "",
  address: "",
};

const defaultTheme = createTheme();
const Create: React.FC<Props> = ({onSubmit}) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state?.users);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
    const {name, email, age, address} = formData;
    dispatch(
      addUser({id: users[users.length - 1].id + 1, name, email, age, address})
    );
    navigate("/alldetails");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{m: 1, bgcolor: "secondary.main"}}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              autoComplete="Name"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={handleChange}
              name="email"
              autoComplete="current-email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="age"
              label="Age"
              autoComplete="age"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="address"
              label="Address"
              onChange={handleChange}
              autoComplete="current-address"
            />
            <Button variant="contained" color="success" type="submit" fullWidth>
              Save
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Create;
