import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FeedState } from '../../services/types';

const initialState: FeedState = {
  tab: 'global',
  tag: '',
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction<{ tag: string }>) => {
      state.tag = action.payload.tag;
    },

    changeTab: (
      state,
      action: PayloadAction<{ tab: 'global' | 'feed' | 'tag' }>,
    ) => {
      state.tab = action.payload.tab;
    },
  },
});

export const { setTag, changeTab } = feedSlice.actions;
export default feedSlice.reducer;
