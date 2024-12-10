import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Camera } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-blue-100 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Signup Area */}
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Styled Form Card */}
        <div className="bg-white shadow-lg rounded-lg w-full md:w-96 p-6 transition-all transform duration-300 ease-in-out hover:scale-105">
          {/* Form Title */}
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Create an Account</h1>
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Full Name */}
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="User Name"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="user@gmail.com"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="+91 **********"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="user@123"
                className="w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              />
            </div>

            {/* Role Selection */}
            <div className="flex items-center gap-6 my-3">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer w-4 h-4"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </div>

            {/* Profile Photo Section with Icon and Preview */}
            <div className="flex items-center gap-4 my-3">
              <div className="relative w-16 h-16 rounded-full bg-gray-100 border-2 border-indigo-400 flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <Camera className="h-6 w-6 text-indigo-600" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <span className="text-sm text-gray-700">Upload your profile photo</span>
            </div>

            {/* Submit Button */}
            {loading ? (
              <Button
                className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-200"
                type="button"
              >
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-200"
              >
                Signup
              </Button>
            )}

            {/* Login Link */}
            <p className="text-sm text-center text-gray-600 mt-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-500 font-medium hover:text-indigo-700 transition"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
