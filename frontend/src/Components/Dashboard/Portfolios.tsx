import { axiosInstance } from "@/Axios";
import { updatePortfolio } from "@/Redux/Slices/PortfolioSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { PortfolioType } from "@/Types";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  PaperProps,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddPortfolioForm from "./Components/AddPortfolioForm";
import EditPortfolioForm from "./Components/EditPortfolioForm";

type Props = {
  paperProps: PaperProps | null;
};

const Portfolios = (props: Props) => {
  const { paperProps } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([]);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const hasPortfolios = portfolios.length > 0;
  const isPortfolioPresent =
    hasPortfolios && portfolios.some((p) => p.id === portfolio.id);

  const handleChange = (e: SelectChangeEvent) => {
    const selectedPort = portfolios.find(
      (p) => p.id === parseInt(e.target.value),
    );
    if (selectedPort) {
      dispatch(updatePortfolio(selectedPort));
      if (selectedPort.id) {
        localStorage.setItem(
          "lastViewedPortfolioId",
          selectedPort.id.toString(),
        );
      }
    }
  };

  const updatePortfolios = async () => {
    const res = await axiosInstance.get("/portfolios");
    if (res.status === 200) {
      setPortfolios(res.data);
    }
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleEditClick = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    updatePortfolios();
  };

  const handleAddClose = () => {
    setOpenAdd(false);
    updatePortfolios();
  };

  useEffect(() => {
    const getPortfolios = () => {
      const lastViewedPortfolioId = localStorage.getItem(
        "lastViewedPortfolioId",
      );
      axiosInstance.get("/portfolios").then((res) => {
        const newPortfolios: PortfolioType[] = res.data;
        setPortfolios(newPortfolios);
        if (lastViewedPortfolioId) {
          const lastPort = newPortfolios.find(
            (p: PortfolioType) => p.id === parseInt(lastViewedPortfolioId),
          );
          if (lastPort) dispatch(updatePortfolio(lastPort));
          else dispatch(updatePortfolio(res.data[0]));
        } else dispatch(updatePortfolio(res.data[0]));
      });
    };
    getPortfolios();
  }, [dispatch]);

  return (
    <>
      <Paper {...paperProps}>
        <Stack spacing={2} direction="row">
          <FormControl fullWidth>
            <InputLabel id="portfolio-select-label">Portfolio</InputLabel>
            {isPortfolioPresent && (
              <Select
                name="portfolio-select"
                size="small"
                labelId="portfolio-select-label"
                id="portfolio-select"
                value={portfolio.id?.toString() || ""}
                label="Portfolio"
                onChange={handleChange}
              >
                {portfolios.map((p) => (
                  <MenuItem key={`portfolio-${p.id}`} value={p.id?.toString()}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit current portfolio">
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={handleEditClick}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create new portfolio">
              <IconButton
                aria-label="create"
                color="primary"
                onClick={handleAddClick}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>
      <Modal open={openAdd} onClose={handleAddClose}>
        <>
          <AddPortfolioForm
            handleClose={handleAddClose}
            setPortfolios={setPortfolios}
          />
        </>
      </Modal>
      <Modal open={openEdit} onClose={handleEditClose}>
        <>
          <EditPortfolioForm handleClose={handleEditClose} />
        </>
      </Modal>
    </>
  );
};

export default Portfolios;
