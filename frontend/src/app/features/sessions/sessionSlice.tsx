import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, getCurrentUser, loginWithEmailAndPassword, logoutUserWithToken, requestAccessTokenWithRefreshToken, updateUserProfile } from "../../api/sessionAPI";
import { RootState, AppThunk } from "../../store";


export interface User {
  id?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserUpdateData {
  currentPassword: string;
  token: string | undefined;
  email?: string;
  password?: string;
}

interface AuthState {
  currentUser?: User;
  loading: boolean;
  error: boolean;
  errorMessages: string[];
  accessToken?: string;
  refreshToken?: string | null;
  expiresIn?: number;
  tokenType?: string;
  currentRoute?: string;
}

const initialState: AuthState = {
  currentUser: {
    id: undefined,
    email: undefined,
    role: undefined,
    createdAt: undefined
  },
  loading: true,
  error: false,
  errorMessages: [],
  accessToken: undefined,
  refreshToken: getRefreshToken(),
  expiresIn: undefined,
  tokenType: undefined
}


export const signUpUser = createAsyncThunk(
  "session/signUpUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    const response = await createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );
    if (response.errors) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(response);
    }

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  "session/updateProfile",
  async (payload: UserUpdateData, { rejectWithValue }) => {
    const response = await updateUserProfile(
      payload.currentPassword,
      payload.token,
      payload?.email,
      payload?.password
    );
    if (response.errors) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(response);
    }
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    const loginResponse = await loginWithEmailAndPassword(
      payload.email,
      payload.password
    );
    if (loginResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(loginResponse);
    }
    const userResponse = await getCurrentUser(loginResponse.access_token);
    if (userResponse.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(userResponse.data);
    }
    const response = {
      ...loginResponse,
      ...userResponse,
    };
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const logoutUser = createAsyncThunk(
  "session/logoutUser",
  async (payload: string, { rejectWithValue }) => {
    const response = await logoutUserWithToken(payload);

    console.log(response);
    if (response.error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(response);
    }

    return response;
  }
);

export const refreshAccessToken = createAsyncThunk(
  "session/refreshAccessToken",
  async (refreshToken: string | undefined | null, { rejectWithValue }) => {
    if (!refreshToken) {
      return rejectWithValue("No refresh token");
    }

    const refreshResponse = await requestAccessTokenWithRefreshToken(
      refreshToken
    );
    if (refreshResponse.error) {

      return rejectWithValue(refreshResponse.data);
    }
    const userResponse = await getCurrentUser(refreshResponse.access_token);
    if (userResponse.error) {

      return rejectWithValue(userResponse.data);
    }
    const response = {
      ...refreshResponse,
      ...userResponse,
    };

    return response;
  }
);



export const sessionSlice = createSlice({
  name: "session",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    resetErrorState: (state) => {
      state.error = false;
      state.errorMessages = [];
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;
        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      }).addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = ["Invalid credentials. Did you enter them correctly?"];
      }).addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(refreshAccessToken.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(logoutUser.fulfilled, (state, action: any) => {
        state.currentUser = {
          id: undefined,
          email: undefined,
          role: undefined,
          createdAt: undefined,
        };
        state.accessToken = undefined;
        state.refreshToken = undefined;
        state.expiresIn = undefined;
        state.tokenType = undefined;
        removeRefreshToken();

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = [action.payload.error];
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateProfile.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;
        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
        state.errorMessages = [];
      })
      .addCase(updateProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessages = action.payload.errors;
      });
  },
});

export const { resetErrorState } = sessionSlice.actions;

export default sessionSlice.reducer;

function storeRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token);
}

function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}