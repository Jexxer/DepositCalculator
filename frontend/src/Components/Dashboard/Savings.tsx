import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { BankAccountType } from "@/Types";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  Modal,
  Paper,
  PaperProps,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { axiosInstance } from "@/Axios";
import React from "react";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import EditSavingsForm from "./Components/EditSavingsForm";
import AddBankAccountForm from "./Components/AddBankAccountForm";

type SavingsProps = {
  paperProps: PaperProps;
};

type ItemProps = {
  item: BankAccountType;
  calcSavingsAmount: (b: BankAccountType) => number | string;
};

const Item = (props: ItemProps) => {
  const { item, calcSavingsAmount } = props;
  const dispatch = useAppDispatch();

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    axiosInstance.delete(`/bankaccounts/${item.id}`).then((res) => {
      if (res.status === 204) {
        dispatch(fetchPortfolio());
      } else {
        // TODO: Show error
        console.log("error deleting budget");
      }
    });
  };

  return (
    <Stack spacing={1} direction="row" width="100%" alignItems="center">
      <Stack
        spacing={4}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="body1">{item.name}</Typography>

        <Typography variant="h6">
          $
          {calcSavingsAmount(item).toLocaleString(undefined, {
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

const Savings = (props: SavingsProps) => {
  const { paperProps } = props;
  const { bankAccounts, incomes } = useAppSelector((state) => state.portfolio);
  const savings = useMemo(
    () => bankAccounts.filter((b) => b.type === 1),
    [bankAccounts],
  );

  const getPaychecksPerYear = (n: number) => {
    if (n === 0) return 52;
    if (n === 1) return 26;
    if (n === 2) return 24;
    console.log("not a valid pay frequency, options are 1, 2, 3");
    return 0;
  };

  const calcSavingsAmount = (bank: BankAccountType) => {
    if (!bank.isPercentage) return bank.amount;
    let monthlyIncome = 0;

    incomes.forEach((i) => {
      const paychecksPerYear = getPaychecksPerYear(i.payFrequency);
      monthlyIncome += (i.amount * paychecksPerYear) / 12;
    });

    const percentage = bank.percentageAmount / 100;
    return (monthlyIncome * percentage).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });
  };

  // openAdd should open the bankaddform
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  // To be used in <EditForm />
  const [initialFormData, setInitialFormData] = useState<BankAccountType>(
    savings[0],
  );

  const handleEditClick = (item: BankAccountType) => {
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
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="h6">Savings</Typography>
            <Tooltip title="How much would you like to save per month?">
              <InfoIcon
                sx={{ color: "rgba(36,127,202,0.5)" }}
                fontSize="small"
              />
            </Tooltip>
          </Stack>
          <IconButton
            size="small"
            color="primary"
            onClick={() => setOpenAdd(true)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        {savings.length > 0 && <Divider />}
        <List dense disablePadding>
          {savings.map((item, index) => (
            <React.Fragment key={`budget-list-item-${index}`}>
              <ListItemButton onClick={() => handleEditClick(item)}>
                <Item item={item} calcSavingsAmount={calcSavingsAmount} />
              </ListItemButton>
              {index < savings.length - 1 && (
                <Divider key={`budget-divider-${index}`} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <>
          <EditSavingsForm
            setOpen={setOpenEdit}
            initialFormData={initialFormData}
          />
        </>
      </Modal>
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <>
          <AddBankAccountForm setOpen={setOpenAdd} savings />
        </>
      </Modal>
    </>
  );
};

export default Savings;
