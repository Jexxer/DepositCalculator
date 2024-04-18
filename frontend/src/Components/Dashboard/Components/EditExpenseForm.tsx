import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { ExpenseType } from "@/Types";
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
  initialFormData: ExpenseType;
};

type ExpenseFormData = {
  id: number;
  name: string;
  amount: number;
  frequency: number;
  bankAccountId: number;
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
  const { setOpen, initialFormData } = props;
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<ExpenseFormData>({
    id: initialFormData.id,
    name: initialFormData.name,
    amount: initialFormData.amount,
    frequency: initialFormData.frequency,
    bankAccountId: initialFormData.bankAccountId,
  });
  const { bankAccounts } = useAppSelector((state) => state.portfolio);
  const bankAccountsExcludingSavings = useMemo(
    () => bankAccounts.filter((b) => b.type === 0),
    [bankAccounts],
  );

  const handleSubmit = () => {
    axiosInstance.put(`/expenses/${formData.id}`, formData).then((res) => {
      if (res.status === 200) {
        dispatch(fetchPortfolio());
        setOpen(false);
      }
    });
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Edit Expense Form</Typography>
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
          label="Frequency"
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
      <Button onClick={handleSubmit} variant="contained">
        Save Changes
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default EditExpenseForm;
