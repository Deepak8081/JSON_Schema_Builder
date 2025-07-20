import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import FieldRow from "./CreateRow";
import Preview from "./Preview";

const CreateSchema = () => {
  const { control, watch } = useForm({
    defaultValues: {
      fields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const addField = () => {
    append({ name: "", type:"", fields: [] });
  };

  const formData = watch("fields");

  return (
    <div className="flex flex-col md:flex-row gap-6 p-12">
      <div className="w-full md:w-2/3 space-y-4">
        <h2 className="text-xl font-semibold">JSON Schema Builder</h2>
        {fields.map((field, index) => (
          <FieldRow
            key={field.id}
            control={control}
            remove={remove}
            nestIndex={index}
            fieldPath={`fields.${index}`}
            isNested={false}
          />
        ))}
        <button
          onClick={addField}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow cursor-pointer hover:bg-blue-700"
        >
          + Add Field
        </button>
      </div>
      <Preview data={formData} />
    </div>
  );
};

export default CreateSchema;
