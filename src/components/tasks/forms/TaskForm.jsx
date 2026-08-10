import { useState } from "react";

import Button from "../../ui/Button";
import FormField from "../../ui/FormField";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";

import { validateTask } from "../../../utils/taskValidation";

const STATUS_OPTIONS = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const DEFAULT_FORM = {
  title: "",
  description: "",
  projectId: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

function TaskForm({
  task = null,
  projects,
  submitLabel = "Create Task",
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState(() => {
    if (!task) {
      return {
        ...DEFAULT_FORM,
        projectId: projects[0]?.id ?? "",
      };
    }

    return {
      title: task.title,
      description: task.description,
      projectId: task.projectId,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
    };
  });

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

    const validationErrors = validateTask(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      projectId: formData.projectId,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField
        label="Task Title"
        htmlFor="title"
        required
        error={errors.title}
      >
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
        />
      </FormField>

      <FormField label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the task"
        />
      </FormField>

      <FormField
        label="Project"
        htmlFor="projectId"
        required
        error={errors.projectId}
      >
        <Select
          name="projectId"
          value={formData.projectId}
          onValueChange={(value) =>
            handleChange({
              target: {
                name: "projectId",
                value,
              },
            })
          }
          options={projects.map((project) => ({
            value: project.id,
            label: project.name,
          }))}
          ariaLabel="Task project"
          className="w-full"
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
            value={formData.status}
            onValueChange={(value) =>
              handleChange({
                target: {
                  name: "status",
                  value,
                },
              })
            }
            options={STATUS_OPTIONS}
            ariaLabel="Task status"
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
            value={formData.priority}
            onValueChange={(value) =>
              handleChange({
                target: {
                  name: "priority",
                  value,
                },
              })
            }
            options={PRIORITY_OPTIONS}
            ariaLabel="Task priority"
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

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default TaskForm;
