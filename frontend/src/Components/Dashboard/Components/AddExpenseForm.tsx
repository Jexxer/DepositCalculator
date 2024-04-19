import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { useMemo, useState } from "react";
import { modalStyle } from "./styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type ExpenseFormProps = {
  setOpen: (arg0: boolean) => void;
};

type ExpenseFormData = {
  name: string;
  amount: number;
  frequency: number;
  bankAccountId: number;
  portfolioId: number;
};

const frequencies = [
  {
    name: "Monthly",
    value: 0,
  },
  {
    name: "Quarterly",
    value: 1,
  },
  {
    name: "Annually",
    value: 2,
  },
];

const EditExpenseForm = (props: ExpenseFormProps) => {
  const { setOpen } = props;
  const dispatch = useAppDispatch();

  const portfolio = useAppSelector((state) => state.portfolio);
  const bankAccounts = portfolio.bankAccounts;
  const bankAccountsExcludingSavings = useMemo(
    () => bankAccounts.filter((b) => b.type === 0),
    [bankAccounts],
  );
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<ExpenseFormData>({
    name: "",
    amount: 0.0,
    frequency: 0,
    bankAccountId: bankAccountsExcludingSavings[0].id,
    portfolioId: portfolio.id,
  });

  const handleSubmit = async () => {
    setBtnDisabled(true);
    await axiosInstance.post(`/expenses`, formData).then((res) => {
      if (res.status === 201) {
        dispatch(fetchPortfolio());
        setOpen(false);
      }
    });
    setBtnDisabled(false);
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Add Expense</Typography>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => {
          setFormData((prev) => {
            return {
              ...prev,
              name: e.target.value,
            };
          });
        }}
      />
      <TextField
        label="Amount"
        value={formData.amount}
        type="number"
        onChange={(e) => {
          setFormData((prev) => {
            return {
              ...prev,
              amount: parseFloat(e.target.value),
            };
          });
        }}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="bil-frequency-select-label">Frequency</InputLabel>
        <Select
          value={formData.frequency.toString()}
          label="Account Type"
          inputProps={{ id: "bil-frequency-select-label" }}
          onChange={(e: SelectChangeEvent) => {
            setFormData((prev) => {
              return {
                ...prev,
                frequency: parseInt(e.target.value),
              };
            });
          }}
        >
          {frequencies.map((f) => (
            <MenuItem key={`frequencies-${f.value}`} value={f.value}>
              {f.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="bank-account-type-select-label">
          Bank Account
        </InputLabel>
        <Select
          value={formData.bankAccountId.toString()}
          label="Account Type"
          inputProps={{ id: "bank-account-type-select-label" }}
          onChange={(e: SelectChangeEvent) => {
            setFormData((prev) => {
              return {
                ...prev,
                bankAccountId: parseInt(e.target.value),
              };
            });
          }}
        >
          {bankAccountsExcludingSavings.map((b) => (
            <MenuItem key={`bank-account-${b.id}`} value={b.id}>
              {b.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button disabled={btnDisabled} onClick={handleSubmit} variant="contained">
        Add Expense
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default EditExpenseForm;
