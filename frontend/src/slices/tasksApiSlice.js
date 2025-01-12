import { TASKS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all tasks
    getTasks: builder.query({
      query: () => ({
        url: TASKS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Tasks'], // Tags for invalidating the list of tasks
    }),

    // Fetch task details by task ID
    getTaskDetails: builder.query({
      query: (taskId) => ({
        url: `${TASKS_URL}/${taskId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Create a new task
    createTask: builder.mutation({
      query: (data) => ({
        url: TASKS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tasks'], // Invalidates task list cache to trigger refetch
    }),

    // Update an existing task
    updateTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/${data.taskId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tasks'], // Invalidates task list cache after task update
    }),

    // Delete a specific task
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${TASKS_URL}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'], // Invalidate tasks list cache after task deletion
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