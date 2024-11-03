import AppNavBar from "../AppNavBar/AppNavBar";
import { Box, Grid, Stack } from "@mui/material";
import Overview from "./Overview";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import Savings from "./Savings";
import BankAccounts from "./BankAccounts";
import Portfolios from "./Portfolios";

const Dashboard = () => {
  return (
    <>
      <AppNavBar />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Box
          component={Grid}
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          display={{ md: "none", lg: "none", xl: "none" }}
        >
          <Portfolios paperProps={{ sx: { p: 1 } }} />
        </Box>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Stack spacing={2}>
            <Overview />
            {/* <PieCharts /> */}
            <Expenses />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Grid container spacing={2} alignContent="stretch">
            <Box
              component={Grid}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              display={{
                xs: "none",
                sm: "none",
                md: "grid",
                lg: "grid",
                xl: "grid",
              }}
            >
              <Portfolios paperProps={{ sx: { p: 1 } }} />
            </Box>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Incomes paperProps={{}} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Savings paperProps={{}} />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <BankAccounts paperProps={{}} />
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
            {/*   <Expenses /> */}
            {/* </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
