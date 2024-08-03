import { AppStateType } from './redux-store'

// Для селектора, который не использует дополнительную логику, можно просто использовать:
export const getUsers = (state: AppStateType) => state.usersPage.users;

// Остальные селекторы:
export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress;
