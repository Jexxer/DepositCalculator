import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
//import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";
import AccountBalanceTwoToneIcon from "@mui/icons-material/AccountBalanceTwoTone";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import QuestionMark from "@mui/icons-material/QuestionMark";
import { axiosInstance } from "@/Axios";
import { fetchPortfolio } from "@/Redux/Slices/PortfolioSlice";
import { Portfolio } from "@/Utils/Models/Portfolio";
import { Income } from "@/Utils/Models/Income";

type Props = {
  paperProps?: PaperProps;
};

const Overview = (props: Props) => {
  const { paperProps } = props;
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio);
  const splitMethod = portfolio.splitMethod;
  const { incomes, expenses } = portfolio;

  const handleSplitChange = async (
    _event: React.MouseEvent<HTMLElement>,
    newValue: number,
  ) => {
    if (newValue === null) return;
    const res = await axiosInstance.put(
      `/portfolios/${portfolio.id}/splitMethod?splitMethod=${newValue}`,
    );
    if (res.status === 200) {
      dispatch(fetchPortfolio());
    }
  };


  return (
    <Paper {...paperProps}>
      <Stack
        direction="row"
        justifyContent="space-between"
        width="100%"
        alignItems="center"
        paddingTop={2}
        paddingX={2}
        paddingBottom={expenses.length > 0 ? 0 : 2}
      >
        <Typography variant="h6">Direct deposits</Typography>
        <Stack spacing={1} direction="row" alignItems="center">
          <Box>
            <Tooltip title="Method used to split expenses">
              <IconButton size="small" sx={{ backgroundColor: "#D8E8EB" }}>
                <QuestionMark fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <ToggleButtonGroup
            size="small"
            color="primary"
            exclusive
            value={splitMethod}
            onChange={handleSplitChange}
          >
            <ToggleButton value={0}>Income Based</ToggleButton>
            <ToggleButton value={1}>Equally</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {expenses.length > 0 && (
        <Grid
          container
          spacing={2}
          height={{ sm: "auto", md: "100%", lg: "100%", xl: "100%" }}
          sx={{ p: 2 }}
        >
          {incomes.map((income) => {
            const incomeObj = new Income(income);
            const deposit = incomeObj.generateDeposit(new Portfolio(portfolio));
            return (
              <Grid key={income.id} item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "#D2E8F2",
                    border: "1px solid #81c784",
                  }}
                >
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack
                        spacing={1}
                        width="100%"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {/* <MonetizationOnTwoToneIcon */}
                        {/*   color="success" */}
                        {/*   sx={{ fontSize: 60 }} */}
                        {/* /> */}
                        <Stack spacing={1} justifyContent="center">
                          <Typography alignSelf="center" variant="h6">
                            {income.name}
                          </Typography>
                          <Box alignSelf="center">
                            <Chip
                              sx={{ bgcolor: "#81c784" }}
                              label={"$ " + income.amount.toLocaleString()}
                            />
                          </Box>
                        </Stack>
                      </Stack>
                      <Divider />
                      {deposit?.checkings.map((b, index) => {
                        if (b.amount === 0) {
                          return;
                        }
                        return (
                          <Stack
                            key={index}
                            spacing={1}
                            direction="row"
                            width="100%"
                          >
                            <AccountBalanceTwoToneIcon color="info" />
                            <Typography width="60%" variant="body1">
                              {b.name}
                            </Typography>
                            <Typography width="40%" variant="body1">
                              {`$${b.amount}`}
                            </Typography>
                          </Stack>
                        );
                      })}
                      {deposit.savings.map((b, index) => {
                        return (
                          <Stack
                            key={index}
                            spacing={1}
                            direction="row"
                            width="100%"
                          >
                            <SavingsTwoToneIcon color="error" />
                            <Typography width="60%" variant="body1">
                              {b.name}
                            </Typography>
                            <Typography width="40%" variant="body1">
                              {`$${b.amount}`}
                            </Typography>
                          </Stack>
                        );
                      })}
                      <Divider />
                      <Stack spacing={1} direction="row" width="100%">
                        <CelebrationTwoToneIcon color="success" />
                        <Typography width="60%" variant="body1">
                          {deposit.remainder.name}
                        </Typography>
                        <Typography width="40%" variant="body1">
                          {`$${deposit.remainder.amount}`}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Paper>
  );
};

export default Overview;
