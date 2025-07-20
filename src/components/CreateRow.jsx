import React from "react";
import { useFieldArray, useWatch, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { X } from "lucide-react";

const CreateRow = ({ control, fieldPath, remove, nestIndex, isNested }) => {
  const field = useWatch({ control, name: fieldPath });

  const {
    fields,
    append,
    remove: removeNested,
  } = useFieldArray({
    control,
    name: `${fieldPath}.fields`,
  });

  return (
    <div className="border rounded-md p-4 bg-white space-y-4">
      <div className="flex items-center gap-4">
        <Controller
          name={`${fieldPath}.name`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} placeholder="Field name" className="w-1/3 cursor-pointer" />
          )}
        />

        <Controller
          name={`${fieldPath}.type`}
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <SelectTrigger className="w-48 cursor-pointer">
                <SelectValue placeholder="Field Type" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer">
                <SelectItem value="Nested">Nested</SelectItem>
                <SelectItem value="String">String</SelectItem>
                <SelectItem value="Number">Number</SelectItem>
                <SelectItem value="Boolean">Boolean</SelectItem>
                <SelectItem value="Float">Float</SelectItem>
                <SelectItem value="ObjectId">ObjectId</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => remove(nestIndex)}
          className="text-red-500"
        >
          <X size={18} />
        </Button>
      </div>

      {field?.type === "Nested" && (
        <div className="ml-6 pl-4 border-l-4  border-gray-400 space-y-4">
          {fields.map((nestedField, idx) => (
            <CreateRow
              key={nestedField.id}
              control={control}
              remove={removeNested}
              nestIndex={idx}
              fieldPath={`${fieldPath}.fields.${idx}`}
              isNested={true}
            />
          ))}
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-500 p-4 hover:text-white cursor-pointer"
            onClick={() => append({ name: "", type: undefined, fields: [] })}
          >
            + Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateRow;
