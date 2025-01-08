export const handleMultipleAsyncThunks = (builder, thunks) => {
  thunks.forEach(({ thunk, config: { name, dataKey } }) => {
    builder
      .addCase(thunk.pending, (state) => {
        state[`${name}Status`] = "loading";
        state[`${name}Error`] = null;
      })
      .addCase(thunk.fulfilled, (state, action) => {
        state[`${name}Status`] = "succeeded";
        state[dataKey] = action.payload;
      })
      .addCase(thunk.rejected, (state, action) => {
        state[`${name}Status`] = "failed";
        state[`${name}Error`] = action.payload;
      });
  });
};
