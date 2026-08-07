import { useState } from "react";

import Button from "../../ui/Button";
import FormField from "../../ui/FormField";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import { validateProject } from "../../../utils/projectValidation";

const STATUS_OPTIONS = [
  { value: "planning", label: "Planning" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const DEFAULT_FORM = {
  name: "",
  description: "",
  status: "planning",
  priority: "medium",
  dueDate: "",
  technologies: "",
};

function getInitialFormData(project) {
  if (!project) {
    return { ...DEFAULT_FORM };
  }

  return {
    name: project.name,
    description: project.description,
    status: project.status,
    priority: project.priority,
    dueDate: project.dueDate,
    technologies: project.technologies.join(", "),
  };
}

function ProjectForm({
  project = null,
  submitLabel = "Create Project",
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => getInitialFormData(project));

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  }


  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateProject(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="Project Name"
        htmlFor="name"
        required
        error={errors.name}
      >
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
        />
      </FormField>

      <FormField label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the project"
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          label="Status"
          htmlFor="status"
          required
          error={errors.status}
        >
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={STATUS_OPTIONS}
            ariaLabel="Project Status"
            className="w-full"
          />
        </FormField>

        <FormField
          label="Priority"
          htmlFor="priority"
          required
          error={errors.priority}
        >
          <Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={PRIORITY_OPTIONS}
            ariaLabel="Project Priority"
            className="w-full"
          />
        </FormField>
      </div>

      <FormField label="Due Date" htmlFor="dueDate">
        <Input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </FormField>

      <FormField label="Technologies" htmlFor="technologies">
        <Input
          id="technologies"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Vite, Tailwind CSS"
        />
      </FormField>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default ProjectForm;
