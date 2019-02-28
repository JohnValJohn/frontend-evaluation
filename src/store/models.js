export const file = {
  state: { name: "" },
  reducers: {
    updateFile(state, payload) {
      return payload;
    }
  }
};

export const numberOfFilesOnServer = {
  state: null,
  reducers: {
    updateNumberOfFilesOnServer(state, payload) {
      return payload;
    }
  }
};
