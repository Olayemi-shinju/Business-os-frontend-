import React, { useState, type ChangeEvent } from "react";
import { IoIosPerson, IoIosMail, IoIosLock } from "react-icons/io";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "../components/Input";
import toast from "react-hot-toast";
import { api } from "../utils/api";

interface CreateStaffProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const ROLE = import.meta.env.VITE_NEW_STAFF
const CreateStaff = ({ isOpen, onClose }: CreateStaffProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({ ...initialForm });

  if (!isOpen) return null;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
      return "Please fill in all fields";
    }
    // basic email format check
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(formData.email)) return "Please enter a valid email address";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const resetForm = () => setFormData({ ...initialForm });

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoader(true);
    try {
      const res = await api.post("register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role:ROLE
      });

      if (res?.success === true) {
        toast.success(res.message || "Account created");
        resetForm();
        onClose();
      } else {
        toast.error(res?.message || "Failed to create account");
      }
    } catch (error: any) {
      toast.error(error?.message || "Server error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-sm font-bold text-gray-900">Add New Staff Account</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-gray-600 cursor-pointer transition-colors">
            <FiX className="text-base" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              First Name
            </label>
            <Input
              icon={IoIosPerson}
              placeholder="e.g. John"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              autoComplete="given-name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Last Name
            </label>
            <Input
              icon={IoIosPerson}
              placeholder="e.g. Smith"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              autoComplete="family-name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <Input
              icon={IoIosMail}
              placeholder="john.smith@store.com"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Account Password / PIN
            </label>
            <div className="relative w-full flex items-center">
              <Input
                icon={IoIosLock}
                placeholder="••••••••"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-2 right-3 text-slate-400 hover:text-gray-600 transition-colors cursor-pointer z-10 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
              disabled={loader}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 cursor-pointer shadow-xs transition-colors"
              disabled={loader}
            >
              {loader ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;