import { axiosInstance } from "@/Axios";
import { PortfolioType } from "@/Types";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: PortfolioType = {
  id: 0,
  name: "",
  splitMethod: null,
  bankAccounts: [],
  budgets: [],
  expenses: [],
  incomes: [],
  userAccess: [],
};

export const fetchPortfolio = createAsyncThunk(
  "portfolio/fetchLatest",
  async () => {
    const res = await axiosInstance.get("/portfolios");
    return res.data;
  },
);

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    updatePortfolio: (state, action: PayloadAction<PortfolioType>) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPortfolio.fulfilled,
      (state, action: PayloadAction<PortfolioType[]>) => {
        const port = action.payload.find((p) => p.id === state.id);
        return port;
      },
    );
  },
});

export const { updatePortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
