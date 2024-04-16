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
import { useState } from "react";
import { modalStyle } from "./styles";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";

type FormDataType = {
  name: string;
  portfolioId: number | null;
  type: number;
};

const bankTypes = [
  {
    name: "Checking",
    value: 0,
  },
  {
    name: "Savings",
    value: 1,
  },
];

type BankAccountFormProps = {
  setOpen: (arg0: boolean) => void;
  savings?: boolean;
};

const AddBankAccountForm = (props: BankAccountFormProps) => {
  const { setOpen, savings } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    portfolioId: portfolio.id,
    type: savings ? 1 : 0,
  });

  const handleSubmit = () => {
    axiosInstance.post("/bankaccounts", formData).then((res) => {
      if (res.status === 200) {
        dispatch(fetchPortfolio());
        setOpen(false);
      }
    });
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Add Bank Account</Typography>
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
      <FormControl fullWidth>
        <InputLabel id="bank-account-type-select-label">
          Account Type
        </InputLabel>
        <Select
          labelId="bank-account-type-select-label"
          id="bank-account-type-select"
          value={formData.type.toString()}
          label="Account Type"
          disabled={savings ? true : false}
          onChange={(e: SelectChangeEvent) => {
            setFormData((prev) => {
              return {
                ...prev,
                type: parseInt(e.target.value),
              };
            });
          }}
        >
          {bankTypes.map((p) => (
            <MenuItem key={`bank-account-type-${p.value}`} value={p.value}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} variant="contained">
        Add Account
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default AddBankAccountForm;
