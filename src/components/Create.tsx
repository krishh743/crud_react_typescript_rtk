import * as React from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {addUser} from "../redux/Reducer";

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
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state?.users);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    setFormErrors((prevFormErrors) => ({...prevFormErrors, [name]: ""}));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Partial<FormData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key as keyof FormData] = "This field is required";
      }
    });
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

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
            Add new record
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              name="name"
              label="Name"
              autoComplete="Name"
              onChange={handleChange}
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              onChange={handleChange}
              name="email"
              autoComplete="current-email"
              autoFocus
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="age"
              label="Age"
              autoComplete="age"
              onChange={handleChange}
              error={Boolean(formErrors.age)}
              helperText={formErrors.age}
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              label="Address"
              onChange={handleChange}
              autoComplete="current-address"
              error={Boolean(formErrors.address)}
              helperText={formErrors.address}
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
