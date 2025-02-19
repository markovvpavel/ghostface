import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isMenu: boolean;
  pageScroll: number;
}

const initialState: State = {
  isMenu: false,
  pageScroll: 0,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setIsMenu: (state, action: PayloadAction<boolean>) => {
      state.isMenu = action.payload;
    },

    setPageScroll: (state, action: PayloadAction<number>) => {
      state.pageScroll = action.payload;
    },

    restoreLayout: (_, action: PayloadAction<State>) => action.payload,
  },
});

export const { setIsMenu, setPageScroll, restoreLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
