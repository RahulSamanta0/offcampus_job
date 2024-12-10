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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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

      {/* Main Login Area */}
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Styled Form */}
        <div className="bg-white shadow-lg rounded-lg w-full md:w-96 p-6 transition-all transform duration-300 ease-in-out hover:scale-105">
          {/* Form Title */}
          <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Login to Your Account</h1>
          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Button Section */}
            {loading ? (
              <Button
                className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-200"
                type="button"
              >
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Please Wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-200"
              >
                Login
              </Button>
            )}

            {/* Signup Link */}
            <p className="text-sm text-center text-gray-600 mt-3">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-500 font-medium hover:text-indigo-700 transition"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
