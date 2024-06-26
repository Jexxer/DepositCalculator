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
import { BankAccountType } from "@/Types";

type FormDataType = {
  id: number;
  name: string;
  portfolioId: number | null;
  type: number;
  isPercentage: boolean;
  percentageAmount: number;
  amount: number;
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
  initialFormData: BankAccountType;
};

const EditBankAccountForm = (props: BankAccountFormProps) => {
  const { setOpen, initialFormData } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    id: initialFormData.id,
    name: initialFormData.name,
    portfolioId: portfolio.id,
    type: initialFormData.type,
    isPercentage: initialFormData.isPercentage,
    percentageAmount: initialFormData.percentageAmount,
    amount: initialFormData.amount,
  });

  const handleSubmit = async () => {
    setBtnDisabled(true);
    await axiosInstance
      .put(`/bankaccounts/${formData.id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchPortfolio());
          setOpen(false);
        }
      });
    setBtnDisabled(false);
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Edit Bank Account</Typography>
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
        <InputLabel htmlFor="bank-account-type-select-label">
          Account Type
        </InputLabel>
        <Select
          value={formData.type.toString()}
          inputProps={{ id: "bank-account-type-select-label" }}
          label="Account Type"
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
      <Button disabled={btnDisabled} onClick={handleSubmit} variant="contained">
        Add Account
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default EditBankAccountForm;
