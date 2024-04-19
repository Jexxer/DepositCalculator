import {
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { modalStyle } from "./styles";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import { BankAccountType } from "@/Types";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";

type FormDataType = {
  id: number | null;
  name: string;
  amount: number;
  portfolioId: number | null;
  isPercentage: boolean;
  percentageAmount: number;
  type: number;
};

type SavingsFormProps = {
  setOpen: (arg0: boolean) => void;
  initialFormData: BankAccountType;
};

const EditSavingsForm = (props: SavingsFormProps) => {
  const { setOpen, initialFormData } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    amount: initialFormData.amount,
    id: initialFormData.id,
    isPercentage: initialFormData.isPercentage,
    name: initialFormData.name,
    percentageAmount: initialFormData.percentageAmount,
    portfolioId: portfolio.id,
    type: initialFormData.type,
  });

  const handlePercentChange = async (
    _e: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    if (newValue === "percentage")
      setFormData((prev) => ({
        ...prev,
        isPercentage: true,
      }));
    if (newValue === "amount")
      setFormData((prev) => ({
        ...prev,
        isPercentage: false,
      }));
  };

  const handleSubmit = async () => {
    setBtnDisabled(true);
    axiosInstance.put(`/bankaccounts/${formData.id}`, formData).then((res) => {
      if (res.status === 200) {
        dispatch(fetchPortfolio());
        setOpen(false);
      }
    });
    setBtnDisabled(false);
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography variant="h6">Edit Savings</Typography>
        <ToggleButtonGroup
          size="small"
          value={formData.isPercentage ? "percentage" : "amount"}
          exclusive
          onChange={handlePercentChange}
          aria-label="text alignment"
        >
          <ToggleButton value="amount">
            <AttachMoneyIcon sx={{ color: "#1e5d81" }} />
          </ToggleButton>

          <ToggleButton value="percentage">
            <PercentIcon sx={{ color: "#1e5d81" }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Typography variant="caption">
        Percentage is based on take home, not including insurance
      </Typography>
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
      {formData.isPercentage && (
        <TextField
          label="Percentage of total income"
          value={formData.percentageAmount}
          type="number"
          onFocus={(e) => {
            e.target.select();
          }}
          onChange={(e) => {
            if (parseInt(e.target.value) > 100) {
              setFormData((prev) => {
                return {
                  ...prev,
                  percentageAmount: 100,
                };
              });
            } else if (parseInt(e.target.value) < 0) {
              setFormData((prev) => {
                return {
                  ...prev,
                  percentageAmount: 0,
                };
              });
            } else {
              setFormData((prev) => {
                return {
                  ...prev,
                  percentageAmount: parseFloat(e.target.value),
                };
              });
            }
          }}
        />
      )}
      {!formData.isPercentage && (
        <TextField
          label="Amount per month"
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
      )}
      <Button disabled={btnDisabled} onClick={handleSubmit} variant="contained">
        Save Changes
      </Button>
      <Button onClick={() => setOpen(false)} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default EditSavingsForm;
