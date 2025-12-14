import axios from "axios";
import { Project, Contact } from "@/types";
const BASE_URL = process.env.NEXT_PUBLIC_ENV === "development" ? "http://localhost:4000" : process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProjects = async (limit: number, offset: number) => {
  const response = await axiosInstance.get("/projects", {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

export const getProjectById = async (id: string) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (project: Project) => {
  console.log(project);
  const response = await axiosInstance.post("/projects", project);
  return response.data;
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const response = await axiosInstance.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: string) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};

export const createContact = async (contact: Contact) => {
  const response = await axiosInstance.post("/contact", contact);
  return response.data;
};

export const login = async (email: string) => {
  const response = await axiosInstance.post("/auth/login", { email });
  return response.data;
};
export const verifyOtp = async (otp: string) => {
  const response = await axiosInstance.post("/auth/verify", { otp });
  return response.data;
};
export const getMe = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
