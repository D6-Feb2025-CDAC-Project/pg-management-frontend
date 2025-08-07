import React, { useState } from "react";
import { updateTenant } from "../../../../../services/TenantService";

const EditTenantModal = ({ tenant, onClose, onSave }) => {
  console.log("tenant " + tenant.username);
  const [form, setForm] = useState({
    username: tenant.name,
    email: tenant.email,
    contactNumber: tenant.number,
    roomNumber: tenant.room,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await updateTenant(tenant.id, form);
    onSave();
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Tenant</h2>
        <div className="space-y-3">
          {/* Username - non-editable */}
          <input
            name="username"
            value={form.username}
            placeholder="username"
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            readOnly
          />

          {/* Editable fields */}
          {["email", "contactNumber", "roomNumber"].map((field) => (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="w-full border p-2 rounded"
            />
          ))}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purpleDark text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTenantModal;
