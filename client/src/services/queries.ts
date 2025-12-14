import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import { getMe, getProjectById, getProjects } from "./api";
export const useInfiniteProjectsQuery = (limit: number = 6) => {
  return useInfiniteQuery({
    queryKey: ["projects", "infinite"],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await getProjects(limit, pageParam);
     
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (!lastPage || lastPage.length < limit) {
        return undefined;
      }
      return allPages.length * limit;
    },
  });
};
export const useProjectsQuery = (limit: number, offset: number) => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: () => getProjects(limit, offset),
    });
};
export const useProjectByIdQuery = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectById(id),
    });
};
export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false, 
    staleTime: 1000 * 60 * 5, 
  });
};
