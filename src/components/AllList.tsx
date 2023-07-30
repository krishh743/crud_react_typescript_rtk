import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {removeUser} from "../redux/Reducer";
import {Stack} from "@mui/material";
import "./style.css"
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


export default function Home() {
  const users = useSelector((state: any) => state?.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  console.log(users);

const handleDelete = (id: any) => {
  handleClickOpen();
};
  const handleAgree = (id:any) => {
    dispatch(removeUser(id));
    handleClose();
  };

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  return (
    <div className="details-container">
      <div>
        <h1>All Details You Can Manage Here...</h1>
        <span className="text">
          There are Total 4 Buttons for Create, Edit, View, Delete and for
          create button will add new data to the database and edit button will
          update the previous data and delete button to perform delete any
          record.
        </span>
        <Stack marginBottom={4}>
          <button
            // variant="contained"
            // color="success"
            onClick={() => {
              navigate("/create");
            }}
            className="btn-large"
          >
            Add New
          </button>
        </Stack>
      </div>
      <TableContainer component={Paper} sx={{backgroundColor: "grey"}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead sx={{backgroundColor: "black"}}>
            <TableRow>
              <TableCell className="row-style">User ID</TableCell>
              <TableCell className="row-style" align="right">
                Name
              </TableCell>
              <TableCell className="row-style" align="right">
                Email ID
              </TableCell>
              <TableCell className="row-style" align="right">
                age
              </TableCell>
              <TableCell className="row-style" align="right">
                Address
              </TableCell>

              <TableCell
                sx={{color: "white", fontSize: "1.2rem"}}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: any) => (
              <TableRow
                key={row.id}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell className="data-row" align="right">
                  {row.name}
                </TableCell>
                <TableCell className="data-row" align="right">
                  {row.email}
                </TableCell>
                <TableCell className="data-row" align="right">
                  {row.age}
                </TableCell>
                <TableCell className="data-row" align="right">
                  {row.address}
                </TableCell>

                <TableCell className="data-row" align="right">
                  <Button variant="contained" color="secondary">
                    <Link
                      style={{color: "white", textDecoration: "none"}}
                      to={`/edit/${row.id}`}
                    >
                      Edit
                    </Link>
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => {}}
                    sx={{marginInline: "20px"}}
                  >
                    view
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  >
                    delete
                  </Button>
                </TableCell>
                <div>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClickOpen}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>
                      {"Are you sure you want to delete this user?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Deleting this user will permanently remove them from the
                        database.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleAgree(row.id)}
                      >
                       Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

