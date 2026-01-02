import React from "react";

function ContactList({ contacts = [], onRefresh }) {
  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      });
      onRefresh();
    }
  };

  // 📅 DATE FORMATTER
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // 🔤 SORT CONTACTS A → Z (SAFE COPY)
  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Directory</h3>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {sortedContacts.length} Contacts
        </span>
      </div>

      {sortedContacts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400">
            No contacts found in your directory.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Contact
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Phone
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                  Message
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                  Added On
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sortedContacts.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  {/* CONTACT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {c.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {c.email || "—"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* PHONE */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {c.phone}
                  </td>

                  {/* MESSAGE */}
                  <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell italic max-w-xs truncate">
                    {c.message || (
                      <span className="text-gray-300">No message</span>
                    )}
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {c.createdAt ? formatDate(c.createdAt) : "—"}
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteContact(c._id)}
                      className="text-gray-400 hover:text-red-600 transition-colors p-2"
                      title="Delete Contact"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactList;
