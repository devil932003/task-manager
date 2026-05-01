import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./authSlice";

const API_URI = "http://localhost:8800/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  credentials: "include",
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Task", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
    }),
    getDashboardStats: builder.query({
      query: () => "/task/dashboard",
      providesTags: ["Task", "User"],
    }),
    getTasks: builder.query({
      query: ({ status = "", isTrashed = false } = {}) => {
        const params = new URLSearchParams();

        if (status) params.set("stage", status);
        if (isTrashed) params.set("isTrashed", "true");

        const queryString = params.toString();
        return `/task${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["Task"],
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: "/task/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    createSubTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/create-subtask/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Task"],
    }),
    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `/task/duplicate/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),
    trashTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Task"],
    }),
    deleteRestoreTask: builder.mutation({
      query: ({ id = "", actionType }) => ({
        url: `/task/delete-restore/${id}?actionType=${actionType}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
    getTeamList: builder.query({
      query: () => "/user/get-team",
      providesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutUserMutation,
  useGetDashboardStatsQuery,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCreateSubTaskMutation,
  useDuplicateTaskMutation,
  useTrashTaskMutation,
  useDeleteRestoreTaskMutation,
  useGetTeamListQuery,
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = apiSlice;
