import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(
      'https://64ead94fe51e1e82c576ce2f.mockapi.io/contacts'
    );
    return response.data;
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async contact => {
    const response = await axios.post(
      'https://64ead94fe51e1e82c576ce2f.mockapi.io/contacts',
      contact
    );
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async contactId => {
    await axios.delete(
      `https://64ead94fe51e1e82c576ce2f.mockapi.io/contacts/${contactId}`
    );
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    filter: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.status = 'loading';
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    [fetchContacts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;