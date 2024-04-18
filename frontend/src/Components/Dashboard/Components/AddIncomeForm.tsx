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

type FormDataType = {
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
};

const AddIncomeForm = (props: IncomeFormProps) => {
  const { setOpen } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const bankAccounts = portfolio.bankAccounts;
  const checkingAccounts = bankAccounts.filter((b) => b.type === 0);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    amount: 0.0,
    payFrequency: 0,
    portfolioId: portfolio.id,
    isInsuranceProvider: false,
    insuranceAmount: 0.0,
    bankAccountId: checkingAccounts[0].id,
  });

  const handleSubmit = () => {
    axiosInstance.post("/incomes", formData).then((res) => {
      if (res.status === 201) {
        dispatch(fetchPortfolio());
        setOpen(false);
      }
    });
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Add Income</Typography>
      <TextField
        required
        label="Name"
        size="small"
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
        required
        label="Amount"
        size="small"
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
      <FormControl fullWidth required>
        <InputLabel id="pay-frequency-select-label">Pay Frequency</InputLabel>
        <Select
          size="small"
          labelId="pay-frequency-select-label"
          id="pay-frequency-select"
          value={formData.payFrequency.toString()}
          label="Pay Frequency"
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
      <Stack
        spacing={2}
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <FormControl fullWidth required>
          <InputLabel id="pay-frequency-select-label">
            Remaining funds account
          </InputLabel>
          <Select
            size="small"
            labelId="pay-frequency-select-label"
            id="pay-frequency-select"
            value={formData.bankAccountId?.toString() || ""}
            label="Remaining funds account"
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
      <Divider />
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
            <IconButton size="small" sx={{ backgroundColor: "#D8E8EB" }}>
              <QuestionMarkIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
      {formData.isInsuranceProvider && (
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
      )}
      <Divider />
      <Button onClick={handleSubmit} variant="contained">
        Add Income
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default AddIncomeForm;
