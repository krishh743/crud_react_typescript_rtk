import React, {useState, useEffect} from "react";
import {Button, TextField, Grid, Paper, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../redux/Reducer";
interface FormData {
  id: number; // Update the type to be 'number' if 'id' in the Redux store is always a number
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
  id: 0
};

function EditComponents() {
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
      const {id,name, email, age, address} = existingData[0];
      setFormData({id,name, email, age, address});
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
    // console.log(name, value, "name value");
  };

  if (!dataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Paper elevation={8} style={{padding: 20}}>
        <Typography variant="h5" align="center" gutterBottom>
          User Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4} sm={0}>
              <TextField
                fullWidth
                type="number"
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4} sm={0}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default EditComponents;
