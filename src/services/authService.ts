import axiosInstance from "./axiosInstance";

const setup = (token: string | null, refreshToken: string | null = null) => {
  if (token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axiosInstance.post("/auth/refresh", {
      refresh_token: refreshToken
    });
    
    const { access_token, refresh_token: new_refresh_token } = response.data;
    
    setup(access_token, new_refresh_token);
    
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

export const authService = {
  setup,
  refreshAccessToken
};