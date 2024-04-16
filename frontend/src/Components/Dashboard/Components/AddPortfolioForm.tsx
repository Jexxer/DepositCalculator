import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { modalStyle } from "./styles";
import { useAppDispatch } from "@/Redux/hooks";
import { axiosInstance } from "@/Axios";
import { updatePortfolio } from "@/Redux/Slices/PortfolioSlice";
import { PortfolioType } from "@/Types";

type FormDataType = {
  name: string;
};

type IncomeFormProps = {
  setPortfolios: React.Dispatch<React.SetStateAction<PortfolioType[]>>;
  handleClose: () => void;
};

const AddPortfolioForm = (props: IncomeFormProps) => {
  const { handleClose, setPortfolios } = props;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
  });

  const handleSubmit = () => {
    axiosInstance.post("/portfolios", formData).then((res) => {
      if (res.status === 201) {
        // set local storage
        localStorage.setItem("lastViewedPortfolioId", res.data.id);

        const newPortfolio: PortfolioType = res.data;

        setPortfolios((prev) => [...prev, newPortfolio]);

        dispatch(updatePortfolio(newPortfolio));
        handleClose();
      }
    });
  };
  return (
    <Stack sx={modalStyle} spacing={2}>
      <Typography variant="h6">Create Portfolio</Typography>
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
      <Button onClick={handleSubmit} variant="contained">
        Create Portfolio
      </Button>
      <Button onClick={handleClose} variant="contained" color="error">
        Cancel
      </Button>
    </Stack>
  );
};

export default AddPortfolioForm;
