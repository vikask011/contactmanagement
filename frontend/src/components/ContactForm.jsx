import { useState } from "react";

function ContactForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await fetch("https://contactmanagement-inky.vercel.app/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    onSuccess();
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white max-w-xl mx-auto p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6"
    >
      {/* HEADER */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-800">
          Add New Contact
        </h3>
        <p className="text-sm text-gray-500">
          Fill in the details below
        </p>
      </div>

      {/* NAME */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          className={`w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 transition
            ${
              errors.name
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          placeholder="John Doe"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email (optional)
        </label>
        <input
          className={`w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 transition
            ${
              errors.email
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          placeholder="example@email.com"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          className={`w-full rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 transition
            ${
              errors.phone
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          placeholder="10-digit mobile number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </div>

      {/* MESSAGE */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          rows={3}
          className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          placeholder="Add a short note (optional)"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
        >
          Save Contact
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 rounded-lg font-medium transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
