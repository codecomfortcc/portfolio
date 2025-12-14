"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Link as LinkIcon, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/projects/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { TECH_OPTIONS } from "@/constants/tech-map";

// --- Zod Schema Updated ---
const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 chars"),
  repo: z.string().url("Must be a valid URL"),
  // Allow empty string or valid URL for demo
  demo: z.string().optional().or(z.literal("")),
  // Logo is optional string (URL)
  logo: z.string().optional(),
  currentStatus: z.enum([
    "development",
    "completed",
    "planning",
    "paused",
    "deprecated",
  ]),
  futureStatus: z.enum([
    "maintained",
    "unmaintained",
    "community",
    "archived",
    "none",
  ]),
  imageSrc: z.string().min(1, "Cover image is required"),
  technologies: z.array(z.string()).min(1, "Select at least one technology"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export function ProjectForm({
  initialData,
  onSubmit,
  isLoading,
}: ProjectFormProps) {
  const defaultTechnologies =
    initialData?.technologies?.map((t: any) => t.name.toLowerCase()) || [];

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      repo: initialData?.repo || "",
      demo: initialData?.demo || "",
      logo: initialData?.logo || "", // Default value for logo
      currentStatus: initialData?.currentStatus || "planning",
      futureStatus: initialData?.futureStatus || "none",
      imageSrc: initialData?.imageSrc || "",
      technologies: defaultTechnologies,
    },
  });

  const handleSubmit = (values: ProjectFormValues) => {
    // Transform form data (string array) -> API data (object array)
    const formattedData = {
      ...values,
      // Handle empty demo string as undefined if needed by backend, 
      // or keep as empty string depending on your DTO logic.
      demo: values.demo === "" ? undefined : values.demo,
      technologies: values.technologies.map((techKey) => ({
        name: techKey,
        icon: techKey,
      })),
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        
        {/* --- Section 1: Visual Assets (Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cover Image */}
          <FormField
            control={form.control}
            name="imageSrc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image *</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Logo Upload (New) */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Logo (Optional)</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- Section 2: Core Details --- */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Polykit Dashboard"
                  className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 resize-none h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the tech stack and features..."
                  className="resize-none h-24 bg-orange-100/70 border-[3px] border-dashed border-gray-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Section 3: Links (Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="repo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Github size={14} /> GitHub Repo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/..."
                    className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Demo URL (New) */}
          <FormField
            control={form.control}
            name="demo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                   <LinkIcon size={14} /> Live Demo URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://my-project.com"
                    className="bg-orange-100/70 border-[3px] border-dashed border-gray-500 resize-none"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- Section 4: Technologies --- */}
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <MultiSelect onValuesChange={field.onChange} values={field.value}>
                <FormControl>
                  <MultiSelectTrigger className="w-full bg-orange-100/70 border-[3px] border-dashed border-gray-500 min-h-[44px]">
                    <MultiSelectValue placeholder="Select technologies..." />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent className="max-h-[300px]">
                  <MultiSelectGroup>
                    {TECH_OPTIONS.map((tech) => (
                      <MultiSelectItem key={tech.value} value={tech.value}>
                        <div className="flex items-center gap-2">
                          <tech.icon className="h-4 w-4" />
                          <span>{tech.label}</span>
                        </div>
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Section 5: Status --- */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="currentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-orange-100/70 border-[3px] border-dashed border-gray-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="deprecated">Deprecated</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="futureStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Future Plans</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-orange-100/70 border-[3px] border-dashed border-gray-500">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="maintained">Maintained</SelectItem>
                    <SelectItem value="unmaintained">Unmaintained</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- Submit --- */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 font-medium"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save Project"
          )}
        </Button>
      </form>
    </Form>
  );
}
