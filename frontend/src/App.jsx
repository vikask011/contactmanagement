import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🔔 SHOW TOAST
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto relative">
      {/* TOAST */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white transition
            ${
              toast.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
        >
          {toast.message}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Management App</h2>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          {showForm ? "Close Form" : "Add Contact"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <ContactForm
          onSuccess={() => {
            fetchContacts();
            setShowForm(false);
            showToast("Contact added successfully ✅");
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* LIST */}
      <ContactList
        contacts={contacts}
        onRefresh={() => {
          fetchContacts();
          showToast("Contact deleted successfully ❌", "error");
        }}
      />
    </div>
  );
}

export default App;
