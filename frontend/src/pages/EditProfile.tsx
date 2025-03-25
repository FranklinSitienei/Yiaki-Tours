import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";

const EditProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    homeAddress: "",
    country: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setForm(data.user);
        setAvatarPreview(data.user.avatar || null);
      });
  }, []);

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setAvatarPreview(URL.createObjectURL(file));
    setForm(prev => ({ ...prev, avatarFile: file }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch("http://localhost:3000/users/update", {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      alert("Profile updated!");
      navigate("/profile");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-green-100 to-green-200 p-8">
      <motion.div
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={avatarPreview || "/default-avatar.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <label className="cursor-pointer text-sm text-blue-600 flex items-center gap-2">
              <FaUpload />
              <span>Upload New</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {["firstName", "lastName", "email", "homeAddress", "country"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfile;
