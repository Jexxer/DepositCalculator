import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { ExpenseType } from "@/Types";
import MoreVert from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import {
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  PaperProps,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditExpenseForm from "./Components/EditExpenseForm";
import AddExpenseForm from "./Components/AddExpenseForm";

type Props = {
  paperProps?: PaperProps;
};

const Expenses = (props: Props) => {
  const { paperProps } = props;
  const dispatch = useAppDispatch();
  const { expenses, bankAccounts } = useAppSelector((state) => state.portfolio);
  const hasAvailableChecking = bankAccounts.some((b) => b.type === 1);
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [columnVisible, setColumnVisible] = useState({
    name: true,
    amount: true,
    frequency: true,
    bankId: true,
  });

  useEffect(() => {
    const mobile_columns = {
      name: true,
      amount: true,
      frequency: false,
      bankId: false,
    };

    const desktop_columns = {
      name: true,
      amount: true,
      frequency: true,
      bankId: true,
    };
    const newColumns = matches ? desktop_columns : mobile_columns;
    setColumnVisible(newColumns);
  }, [matches]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expenseForMenu, setExpenseForMenu] = useState<ExpenseType | undefined>(
    undefined,
  );
  const open = Boolean(anchorEl);

  const handleMenuEdit = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const handleDelete = (n: number) => {
    axiosInstance.delete(`/expenses/${n}`).then((res) => {
      if (res.status === 204) {
        dispatch(fetchPortfolio());
      } else {
        // TODO: Show error
        console.log("error deleting budget");
      }
    });
  };

  const handleMenuDelete = () => {
    const expenseID = expenseForMenu?.id;
    if (expenseID) handleDelete(expenseID);
    setAnchorEl(null);
  };

  const frequencies = {
    0: "Monthly",
    1: "Quarterly",
    2: "Annually",
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => {
        return `$ ${params.value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
      },
    },
    {
      field: "frequency",
      headerName: "Frequency",
      flex: 1,
      renderCell: (params) => {
        return frequencies[params.value];
      },
    },
    {
      field: "bankId",
      headerName: "Account",
      flex: 1.5,
      renderCell: (params) => {
        const handleChange = async (e: SelectChangeEvent) => {
          const res = await axiosInstance.put(
            `/expenses/${params.row.id}/updatebank/${e.target.value}`,
          );
          if (res.status === 200) {
            dispatch(fetchPortfolio());
          }
        };

        return (
          <Select
            id="bank-select-filled"
            value={params.value}
            name="bank-select"
            onChange={handleChange}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 0,
              "& .MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
              backgroundColor: "transparent",
            }}
            size="small"
          >
            {bankAccounts.map((b) => {
              if (b.type === 1) return null;
              return (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              );
            })}
          </Select>
        );
      },
    },
    {
      field: "expense",
      headerName: "",
      align: "right",
      width: 50,
      hideSortIcons: true,
      renderCell: (params) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
          setExpenseForMenu(params.row.expense);
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

  const rows = sortedExpenses.map((e) => {
    return {
      id: e.id,
      name: e.name,
      amount: e.amount,
      frequency: e.frequency,
      bankId: e.bankAccountId,
      expense: e,
    };
  });

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
          <Typography variant="h6">Expenses</Typography>
          <IconButton
            size="small"
            color="primary"
            onClick={() => setAddOpen(true)}
            disabled={!hasAvailableChecking}
          >
            <AddIcon />
          </IconButton>
        </Stack>
        {expenses.length > 0 && (
          <DataGrid
            autoHeight
            density="compact"
            hideFooter
            sx={{
              borderRadius: "unset",
            }}
            rows={rows}
            columns={columns}
            columnVisibilityModel={columnVisible}
            disableRowSelectionOnClick
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "even"
                : "odd-data-grid-row"
            }
          />
        )}
      </Paper>
      <Menu
        id="expense-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleMenuEdit}>Edit</MenuItem>
        <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
      </Menu>
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <>
          {expenseForMenu && (
            <EditExpenseForm
              setOpen={setEditOpen}
              initialFormData={expenseForMenu}
            />
          )}
        </>
      </Modal>
      <Modal open={addOpen} onClose={() => setAddOpen(false)}>
        <>{hasAvailableChecking && <AddExpenseForm setOpen={setAddOpen} />}</>
      </Modal>
    </>
  );
};

export default Expenses;
