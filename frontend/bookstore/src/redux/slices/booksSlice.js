import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to Fetch Books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('http://localhost:5000/api/books'); // Adjust the API endpoint as necessary
  console.log(response.data)
  return response.data;
});

export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async (id) => {
    const response = await axios.get(`/api/books/${id}`);
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  'books/addReview',
  async ({ id, review }) => {
    const response = await axios.post(`/api/books/${id}/reviews`, review);
    return response.data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
    selectedBook: null,
  },
  reducers: {
    selectBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectBook } = booksSlice.actions;
export default booksSlice.reducer;
