import { cookies } from "next/headers";
import axios from "axios";

const BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:4000";

export const getUserStatus = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const response = await axios.get(`${BASE_URL}/auth/tokenverify`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // console.error("Error verifying token:", error);
    return null;
  }
};
