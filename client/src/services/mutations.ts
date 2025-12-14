import { useMutation } from "@tanstack/react-query";
import {
  createContact,
  createProject,
  deleteProject,
  login,
  updateProject,
  verifyOtp,
} from "./api";
import { Contact, Project } from "@/types";

export const useCreateProjectMutation = () => {
  return useMutation({
    mutationFn: ({ project }: { project: Project }) => createProject(project),
  });
};

export const useUpdateProjectMutation = () => {
  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<Project> }) =>
      updateProject(id, project),
  });
};

export const useDeleteProjectMutation = () => {
  return useMutation({
    mutationFn: deleteProject,
  });
};

export const useCreateContactMutation = () => {
  return useMutation({
    mutationFn: ({ contact }: { contact: Contact }) => createContact(contact),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) => login(email),
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: ({ otp }: { otp: string }) => verifyOtp(otp),
  });
};
