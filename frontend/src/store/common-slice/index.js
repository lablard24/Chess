import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// GET FEATURE IMAGES
export const getFeatureImages = createAsyncThunk(
  "feature/getFeatureImages",
  async () => {
    const response = await axios.get("http://localhost:5000/api/common/feature/get");
    return response.data;
  }
);

// ADD FEATURE IMAGE
export const addFeatureImage = createAsyncThunk(
  "feature/addFeatureImage",
  async (image) => {
    const response = await axios.post("http://localhost:5000/api/common/feature/add", { image });
    return response.data;
  }
);

// DELETE FEATURE IMAGE
export const deleteFeatureImage = createAsyncThunk(
  "feature/deleteFeatureImage",
  async (id) => {
    await axios.delete(`http://localhost:5000/api/common/feature/delete/${id}`);
    return id; // Return the deleted image ID to update the state
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = state.featureImageList.filter(
          (image) => image._id !== action.payload
        );
      });
  },
});

export default commonSlice.reducer;
