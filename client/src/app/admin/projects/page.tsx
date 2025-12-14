"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,

} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "@/services/mutations";
import { useProjectsQuery } from "@/services/queries";
// Import your custom components
import AdminProjectCard from "@/components/admin/projects/admin-project-card";
import {
  ProjectForm,
  ProjectFormValues,
} from "@/components/admin/projects/project-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Project } from "@/types";

export default function ProjectsPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Queries & Mutations
  const { data: projects, isLoading } = useProjectsQuery(100, 0);
  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();
  const deleteMutation = useDeleteProjectMutation();

  // Handlers
  const handleCreate = (data: ProjectFormValues) => {
    createMutation.mutate({ project: data } as any, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  const handleUpdate = (data: ProjectFormValues) => {
    if (!editingProject) return;
    updateMutation.mutate({ id: editingProject.id, project: data } as any, {
      onSuccess: () => setEditingProject(null),
    });
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId);
      setDeletingId(null);
    }
  };

  const FormWrapper = ({
    open,
    onOpenChange,
    title,
    children,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
  }) => {
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={onOpenChange}>
         
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-orange-100 px-5 ">
            <ScrollArea className="h-[calc(100vh-10rem)] px-5 mt-4">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            </DialogHeader>
            {children}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-orange-50 max-h-[90vh]">
          <ScrollArea className="h-[calc(100vh-10rem)]">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">{title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">{children}</div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  };

  // --- Render ---
  return (
    <ScrollArea className="px-5 pt-10 pb-2">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              All Projects
            </h2>
            <p className="text-sm text-gray-500">
              Manage and update your portfolio items
            </p>
          </div>
        </div>
    <div
            onClick={() => setIsCreateOpen(true)}
            className="group relative min-h-[200px] w-full rounded-[20px] border-2 border-dashed border-orange-300 bg-orange-200/40 hover:bg-orange-200/80 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 p-6"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
              <Plus className="w-8 h-8 text-orange-600" />
            </div>
            <p className="font-semibold text-orange-900">Add New Project</p>
          </div>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gray-500">
              Loading projects...
            </div>
          ) : (
            projects?.map((project: Project,index:number) => (
              <div key={project.id} className="relative group">
           
                <div className="absolute top-3 right-3 z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                  <Button
                    size="icon"
                    className="h-9 w-9 bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-md rounded-full border border-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProject(project);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-9 w-9 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 shadow-md rounded-full border border-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingId(project.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* --- The Card --- */}
                <AdminProjectCard project={project} onEdit={() => setEditingProject(project)} onDelete={() => setDeletingId(project.id)} index={index}/>
              </div>
            ))
          )}
        </div>

        {/* --- Modals --- */}

        {/* 1. Create Modal */}
        <FormWrapper
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          title="Create New Project"
        >
          <ProjectForm
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </FormWrapper>

        {/* 2. Edit Modal */}
        <FormWrapper
          open={!!editingProject}
          onOpenChange={(open) => !open && setEditingProject(null)}
          title="Edit Project"
        >
          {editingProject && (
            <ProjectForm
              initialData={editingProject}
              onSubmit={handleUpdate}
              isLoading={updateMutation.isPending}
            />
          )}
        </FormWrapper>

        {/* 3. Delete Confirmation */}
        <AlertDialog
          open={!!deletingId}
          onOpenChange={(open) => !open && setDeletingId(null)}
        >
          <AlertDialogContent className="bg-orange-50 border-orange-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" /> Delete Project?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600">
                This action cannot be undone. This will permanently delete the
                project from your portfolio.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white hover:bg-gray-50 border-gray-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white border-0"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ScrollArea>
  );
}
