import React, { useState } from "react";

const EditForm = ({ initialDescription, onSave, onCancel }) => {
  const [editedDescription, setEditedDescription] =
    useState(initialDescription);

  const handleSave = (e) => {
    e.preventDefault();
    if (editedDescription.trim() === "") return;
    onSave(editedDescription);
  };

  return (
    <form onSubmit={handleSave}>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        className="w-full h-20 p-2 border bg-inputColor border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-2 flex space-x-2">
        <button
          type="submit"
          className="h-10 bg-blue-500 text-white px-4 py-2 flex items-center justify-center rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-10 bg-gray-300 text-black px-4 py-2 flex items-center justify-center rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
