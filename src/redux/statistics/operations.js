// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getTransactionsS = createAsyncThunk(
//   "transactions/fetchAllTransaction",
//   async ({ start, end }, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const token = state.auth.token;
//       const response = await axios.get(
//         `http://localhost:3000/transactions/filter/by-date?`,
//         {
//           params: { start, end },
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       // console.log(response.data.data);
//       return response.data.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );
