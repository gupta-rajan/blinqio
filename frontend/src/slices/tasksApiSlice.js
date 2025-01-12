import { apiSlice } from './apiSlice';
import { TASKS_URL } from '../constants';

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: TASKS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getTaskDetails: builder.query({
      query: (id) => ({
        url: `${TASKS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: TASKS_URL,
        method: 'POST',
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ taskId, task }) => ({
        url: `${TASKS_URL}/${taskId}`,
        method: 'PUT',
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${TASKS_URL}/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskDetailsQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApiSlice;
