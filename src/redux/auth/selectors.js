export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectStatistics = (state) => state.statistics.transactions.data || [];
export const selectBalanсe = (state) => state.finance.totalBalance;