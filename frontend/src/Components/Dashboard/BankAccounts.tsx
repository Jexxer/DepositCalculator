import {
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  PaperProps,
  Stack,
  //Switch,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { BankAccountType } from "@/Types";
import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import AddBankAccountForm from "./Components/AddBankAccountForm";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MoreVert from "@mui/icons-material/MoreVert";
import EditBankAccountForm from "./Components/EditBankAccountForm";

type Props = {
  paperProps: PaperProps;
};

const bankTypes = ["Checking", "Savings"];

const BankAccounts = (props: Props) => {
  const dispatch = useAppDispatch();
  const { paperProps } = props;
  const { bankAccounts, incomes, expenses } = useAppSelector(
    (state) => state.portfolio,
  );
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [bankForMenu, setBankForMenu] = useState<BankAccountType | undefined>(
    undefined,
  );
  const open = Boolean(anchorEl);

  const handleMenuEdit = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const handleDelete = (n: number) => {
    axiosInstance.delete(`/bankaccounts/${n}`).then((res) => {
      if (res.status === 204) {
        dispatch(fetchPortfolio());
      } else {
        // TODO: Show error
        console.log("error deleting budget");
      }
    });
  };

  const handleMenuDelete = () => {
    const bankID = bankForMenu?.id;
    if (bankID) handleDelete(bankID);
    setAnchorEl(null);
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => {
        return bankTypes[params.value];
      },
    },
    // {
    //   field: "amount",
    //   headerName: "Balance",
    //   flex: 1,
    //   description:
    //     "Balance is the amount of expenses minus income into the account.",
    //   renderCell: (params) => {
    //     const calcColor = (value: string) => {
    //       const floatValue = parseFloat(value);
    //       if (floatValue < 0) return "#D48181"; // "error"
    //       if (floatValue > 0) return "#66bb6a"; // "success"
    //       return "";
    //     };
    //     return (
    //       <Stack spacing={1} direction="row" height="100%" alignItems="center">
    //         <Typography>$</Typography>
    //         <Typography color={calcColor(params.value)}>
    //           {params.value.toLocaleString(undefined, {
    //             minimumFractionDigits: 2,
    //             maximumFractionDigits: 2,
    //           })}
    //         </Typography>
    //       </Stack>
    //     );
    //   },
    // },
    {
      field: "bank",
      headerName: "",
      align: "right",
      width: 50,
      hideSortIcons: true,
      renderCell: (params) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          const bank = params.value;
          setAnchorEl(event.currentTarget);
          setBankForMenu(bank);
        };

        return (
          <>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
          </>
        );
      },
    },
  ];

  const getPaychecksPerYear = (n: number) => {
    if (n === 0) return 52;
    if (n === 1) return 26;
    if (n === 2) return 24;
    console.log("not a valid pay frequency, options are 1, 2, 3");
    return 0;
  };

  const getExpenseFrequencyPerYear = (n: number) => {
    if (n === 0) return 12;
    if (n === 1) return 4;
    if (n === 2) return 1;
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
    return monthlyIncome * percentage;
  };

  const rows = bankAccounts.map((b) => {
    let calcAmount: number;

    // If a savings account..
    if (b.type === 1) {
      calcAmount = calcSavingsAmount(b);
      return {
        id: b.id,
        name: b.name,
        type: b.type,
        isRemainer: b.isRemainder,
        amount: calcAmount,
        bank: b,
      };
    }

    // Calcualte amount from expenses
    const bankExpenses = expenses.filter((e) => e.bankAccountId === b.id);
    let amount = 0;
    bankExpenses.forEach((be) => {
      // get the annual amount
      amount += (be.amount * getExpenseFrequencyPerYear(be.frequency)) / 12;
    });

    amount = amount - amount * 2;

    return {
      id: b.id,
      name: b.name,
      type: b.type,
      isRemainer: b.isRemainder,
      amount: amount,
      bank: b,
    };
  });

  return (
    <>
      <Paper {...paperProps} sx={{ overflow: "hidden" }}>
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
          }}
        >
          <Typography variant="h6">Bank Accounts</Typography>
          <IconButton
            size="small"
            color="primary"
            onClick={() => setAddOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        <DataGrid
          autoHeight
          hideFooter
          sx={{
            borderRadius: "unset",
          }}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? "even"
              : "odd-data-grid-row"
          }
        />
      </Paper>

      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <>
          <AddBankAccountForm setOpen={setAddOpen} />
        </>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <>
          {bankForMenu && (
            <EditBankAccountForm
              setOpen={setEditOpen}
              initialFormData={bankForMenu}
            />
          )}
        </>
      </Modal>
      <Menu
        id="bankaccount-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleMenuEdit}>Edit</MenuItem>
        <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default BankAccounts;
