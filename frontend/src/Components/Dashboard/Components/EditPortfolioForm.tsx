import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { axiosInstance } from "@/Axios";
import { UserType } from "@/Types";
import { fetchPortfolio, updatePortfolio } from "@/Redux/Slices/PortfolioSlice";
import { toast } from "react-toastify";

type IncomeFormProps = {
  handleClose: () => void;
};

const AddPortfolioForm = (props: IncomeFormProps) => {
  const { handleClose } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const user = useAppSelector((state) => state.user);
  const [portfolioName, setPortfolioName] = useState<string>(
    portfolio.name || "",
  );
  const [emailToAdd, setEmailToAdd] = useState<string>("");

  const handleNameChange = async () => {
    const res = await toast.promise(
      axiosInstance.put(
        `/portfolios/${portfolio.id}/name?name=${portfolioName}`,
      ),
      {
        pending: "Updating Name..",
        success: "Name updated",
        error: "Failed to update name",
      },
    );
    if (res.status === 200) {
      dispatch(updatePortfolio({ ...portfolio, name: portfolioName }));
      handleClose();
    }
  };

  const handleUserAccessAdd = async () => {
    // cannot add user already in user access
    if (
      portfolio.userAccess.some(
        (u) => u.email.toLowerCase() === emailToAdd.toLowerCase(),
      )
    )
      return;
    const res = await toast.promise(
      axiosInstance.put(
        `/portfolios/${portfolio.id}/useraccess/add?email=${emailToAdd}`,
      ),
      {
        pending: "Adding user..",
        success: "Successfully added user",
        error: "User not found",
      },
    );
    if (res.status === 200) {
      dispatch(fetchPortfolio());
    }
  };

  const handleUserAccessRemove = async (u: UserType) => {
    // Cannot delete own useraccess
    if (u.email === user.email) return;
    const res = await toast.promise(
      axiosInstance.put(
        `/portfolios/${portfolio.id}/useraccess/remove?email=${u.email}`,
      ),
      {
        pending: "Adding user..",
        success: "Successfully added user",
        error: "User not found",
      },
    );
    if (res.status === 200) {
      dispatch(fetchPortfolio());
    }
  };

  return (
    <Stack sx={{ ...modalStyle }} spacing={3}>
      <Typography variant="h6">Portfolio name</Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        width="100%"
      >
        <TextField
          label="Name"
          value={portfolioName}
          size="small"
          fullWidth
          onChange={(e) => setPortfolioName(e.target.value)}
        />

        <Button onClick={handleNameChange} variant="contained">
          Update
        </Button>
      </Stack>
      <Divider />
      <Typography variant="h6">User Access:</Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        width="100%"
      >
        <TextField
          name="add-user-input"
          label="E-mail"
          value={emailToAdd}
          size="small"
          fullWidth
          onChange={(e) => setEmailToAdd(e.target.value)}
        />

        <Button onClick={handleUserAccessAdd} variant="contained">
          Add
        </Button>
      </Stack>

      <List disablePadding>
        {portfolio.userAccess.map((u) => {
          if (u.email.toLowerCase() === user.email.toLowerCase()) return null;
          return (
            <React.Fragment key={`useraccess-list-user-${u.id}`}>
              <ListItem
                secondaryAction={
                  <IconButton
                    color="error"
                    onClick={() => handleUserAccessRemove(u)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText>{u.email}</ListItemText>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>

      <Button onClick={handleClose} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default AddPortfolioForm;
