import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { modalStyle } from "./styles";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { IncomeType } from "@/Types";

type FormDataType = {
  id: number | null;
  name: string;
  amount: number;
  payFrequency: number;
  portfolioId: number | null;
  isInsuranceProvider: boolean;
  insuranceAmount: number;
  bankAccountId: number | undefined;
};

const payFrequencies = [
  {
    name: "Weekly",
    value: 0,
  },
  {
    name: "BiWeekly",
    value: 1,
  },
  {
    name: "BiMonthly",
    value: 2,
  },
];

type IncomeFormProps = {
  setOpen: (arg0: boolean) => void;
  initialFormData: IncomeType;
};

const AddIncomeForm = (props: IncomeFormProps) => {
  const { setOpen, initialFormData } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const bankAccounts = portfolio.bankAccounts;
  const checkingAccounts = bankAccounts.filter((b) => b.type === 0);
  const [formData, setFormData] = useState<FormDataType>({
    id: initialFormData.id,
    name: initialFormData.name,
    amount: initialFormData.amount,
    payFrequency: initialFormData.payFrequency,
    portfolioId: portfolio.id,
    isInsuranceProvider: initialFormData.isInsuranceProvider,
    insuranceAmount: initialFormData.insuranceAmount,
    bankAccountId: initialFormData.bankAccount?.id,
  });

  const handleSubmit = () => {
    axiosInstance.put(`/incomes/${formData.id}`, formData).then((res) => {
      if (res.status === 200) {
        dispatch(fetchPortfolio());
        setOpen(false);
      }
    });
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Edit Income</Typography>
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
        onFocus={(e) => {
          e.target.select();
        }}
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
        <InputLabel htmlFor="income-edit-pay-freq-label">
          Pay Frequency
        </InputLabel>
        <Select
          value={formData.payFrequency.toString()}
          label="Pay Frequency"
          inputProps={{ id: "income-edit-pay-freq-label" }}
          onChange={(e: SelectChangeEvent) => {
            setFormData((prev) => {
              return {
                ...prev,
                payFrequency: parseInt(e.target.value),
              };
            });
          }}
        >
          {payFrequencies.map((p) => (
            <MenuItem key={`pay-frequency-${p.value}`} value={p.value}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Divider />
      <Stack
        spacing={2}
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormControl fullWidth required>
          <InputLabel htmlFor="income-edit-remain-label">
            Remaining funds account
          </InputLabel>
          <Select
            size="small"
            value={formData.bankAccountId?.toString() || ""}
            label="Remaining funds account"
            inputProps={{ id: "income-edit-remain-label" }}
            onChange={(e: SelectChangeEvent) => {
              setFormData((prev) => {
                return {
                  ...prev,
                  bankAccountId: parseInt(e.target.value),
                };
              });
            }}
          >
            {checkingAccounts.map((c) => (
              <MenuItem key={`pay-frequency-${c.id}`} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Tooltip title="The account you want the remaining funds to go into. This can be changed at anytime.">
            <IconButton size="small" sx={{ backgroundColor: "#D8E8EB" }}>
              <QuestionMarkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id="isInsurance-checkbox"
                checked={formData.isInsuranceProvider}
                onChange={(e) => {
                  if (!e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      isInsuranceProvider: e.target.checked,
                      insuranceAmount: 0,
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      isInsuranceProvider: e.target.checked,
                    }));
                  }
                }}
              />
            }
            label="Insurance Provider"
          />
        </FormGroup>

        <Box>
          <Tooltip title="Provides the sole insurance on portfolio. This is really only useful if splitting the remaining funds based on income. WARNING: Only one income may be marked as the insurance provider.">
            <IconButton sx={{ backgroundColor: "#D8E8EB" }}>
              <QuestionMarkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      <TextField
        label="Insurance Amount"
        disabled={!formData.isInsuranceProvider}
        size="small"
        value={formData.insuranceAmount}
        type="number"
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            insuranceAmount: parseInt(e.target.value),
          }));
        }}
      />
      <Button onClick={handleSubmit} variant="contained">
        Save Changes
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default AddIncomeForm;
