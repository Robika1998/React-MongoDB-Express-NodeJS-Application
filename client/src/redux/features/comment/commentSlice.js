import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || "Failed to create comment"
      );
    }
  }
);

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch comments"
      );
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save error to state
      })
      // Get post comments
      .addCase(getPostComments.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state
      })
      .addCase(getPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getPostComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save error to state
      });
  },
});

export default commentSlice.reducer;
