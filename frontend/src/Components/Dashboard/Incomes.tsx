import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { IncomeType } from "@/Types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  Modal,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddIncomeForm from "./Components/AddIncomeForm";
import { axiosInstance } from "@/Axios";
import React from "react";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import EditIncomeForm from "./Components/EditIncomeForm";

type IncomesProps = {
  paperProps: PaperProps;
};

type ItemProps = {
  item: IncomeType;
};

const Item = (props: ItemProps) => {
  const { item } = props;
  const dispatch = useAppDispatch();
  const frequencyMap = ["Weekly", "BiWeekly", "BiMonthly"];

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    axiosInstance.delete(`/incomes/${item.id}`).then((res) => {
      if (res.status === 204) {
        dispatch(fetchPortfolio());
      } else {
        // TODO: Show error
        console.log("error deleting income");
      }
    });
  };

  return (
    <Stack spacing={1} direction="row" width="100%" alignItems="center">
      <Stack
        width="100%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack maxWidth="60%">
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="caption">
            {frequencyMap[item.payFrequency]}
          </Typography>
        </Stack>
        <Typography variant="h6" noWrap>
          $
          {item.amount.toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </Typography>
      </Stack>
      <IconButton onClick={handleDelete} color="error">
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

const Incomes = (props: IncomesProps) => {
  const { paperProps } = props;
  const incomes = useAppSelector((state) => state.portfolio.incomes);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  // To be used in <EditIncomeForm />
  const [initialFormData, setInitialFormData] = useState<IncomeType>(
    incomes[0],
  );

  const handleEditClick = (item: IncomeType) => {
    setInitialFormData(item);
    setOpenEdit(true);
  };
  return (
    <>
      <Paper {...paperProps}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h6">Incomes</Typography>
          <IconButton
            size="small"
            color="primary"
            onClick={() => setOpenAdd(true)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        {incomes.length > 0 && <Divider />}
        <List dense disablePadding>
          {incomes.map((item, index) => (
            <React.Fragment key={`income-list-item-${index}`}>
              <ListItemButton onClick={() => handleEditClick(item)}>
                <Item item={item} />
              </ListItemButton>
              {index < incomes.length - 1 && (
                <Divider key={`income-divider-${index}`} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <>
          <AddIncomeForm setOpen={setOpenAdd} />
        </>
      </Modal>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <>
          <EditIncomeForm
            setOpen={setOpenEdit}
            initialFormData={initialFormData}
          />
        </>
      </Modal>
    </>
  );
};

export default Incomes;
