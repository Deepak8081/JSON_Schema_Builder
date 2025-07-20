import React from "react";

const buildJson = (fields) => {
  const result = {};
  fields.forEach((field) => {
    if (!field.name) return;

    if (field.type === "Nested") {
      result[field.name] = buildJson(field.fields || []);
    } else {
      switch (field.type) {
        case "Number":
          result[field.name] = "number";
          break;
        case "Float":
          result[field.name] = "float";
          break;
        case "Boolean":
          result[field.name] = "Boolean";
          break;
        case "ObjectId":
          result[field.name] = "objectId";
          break;
        case "String":
          result[field.name] = "string";
          break;
        default:
          result[field.name] = "";
      }
    }
  });
  return result;
};

const Preview = ({ data }) => {
  const jsonOutput = buildJson(data || []);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
  };

  return (
    <div className="w-full md:mt-10 md:w-1/2 p-4 border rounded bg-black/80 text-green-400 overflow-auto max-h-[70vh]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg text-white font-semibold">Live JSON Output</h2>
        <button
          onClick={handleCopy}
          className="text-sm px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Copy JSON
        </button>
      </div>

      {Object.keys(jsonOutput).length === 0 ? (
        <p className="text-gray-400 italic">Add fields to see JSON preview.</p>
      ) : (
        <pre>{JSON.stringify(jsonOutput, null, 2)}</pre>
      )}
    </div>
  );
};

export default Preview;
