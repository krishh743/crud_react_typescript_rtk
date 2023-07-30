import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../redux/Reducer";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

interface FormData {
  id: number;
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
  id: 0,
};
const defaultTheme = createTheme();
const  EditComponents = () => {
  const users = useSelector((state: any) => state?.users);
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialState);
  const [dataFetched, setDataFetched] = useState(false);

  console.log(formData, "formData");
  useEffect(() => {
    const existingData = users.filter(
      (idx: {id: number | string}) => idx.id == id
    );
    console.log(existingData, "exist");

    if (existingData.length > 0) {
      const {id, name, email, age, address} = existingData[0];
      setFormData({id, name, email, age, address});
    }
    setDataFetched(true);
  }, [id, users]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser(formData));
    navigate("/alldetails");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

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
            Update Record
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              type="number"
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditComponents;
