import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "../utills/callApi";
import config from "../config";

export const fetchPlaylists = createAsyncThunk("playlist/fetchPlaylists", () =>
  callAPI(config.BASE_URL + "/playlists")
);

export const fetchPlayListData = createAsyncThunk(
  "playlist/fetchPlayListData",
  (id) => callAPI(config.TRACK_URL + `/playlists/${id}`)
);

const playlistStore = createSlice({
  name: "Playlist",
  initialState: {
    playlists: [],
    selectedPlaylistId: null,
    isLoading: false,
    selectedPlaylistData: null,
  },
  reducers: {
    selectPlaylist: (state, action) => {
      state.selectedPlaylistId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylists.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      
      
      state.playlists = action.payload?.items;
      state.isLoading = false;
    });
    builder.addCase(fetchPlaylists.rejected, (state, action) => {
      state.playlists = [];
      state.isLoading = false;
    });

    // fetch selected playlist data
    builder.addCase(fetchPlayListData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlayListData.fulfilled, (state, action) => {
      const response = action.payload;

      const selectedPlaylist = {
        id: response?.id,
        name: response?.name,
        description: response?.description?.startsWith("<a")
          ? ""
          : response?.description,
        image: response?.images && response?.images[0].url,
        tracks:
          response?.tracks?.items &&
          response?.tracks?.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[0] && track.album.images[0].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
      };
      state.selectedPlaylistData = selectedPlaylist;
      state.isLoading = false;
    });
    builder.addCase(fetchPlayListData.rejected, (state, action) => {
      state.selectedPlaylistData = null;
      state.isLoading = false;
    });
  },
});

export const playlistActions = playlistStore.actions;
export default playlistStore.reducer;
