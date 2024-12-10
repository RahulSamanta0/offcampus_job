import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg sticky top-0 z-50">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <div className="flex items-center gap-4">
                    {/* Logo Section */}
                    <img
                        src="/job.png"
                        alt="OffcampusJobs Logo"
                        className="h-12 w-12 object-contain hover:rotate-12 transition-transform duration-300"
                    />
                    <h1 className="text-2xl font-bold text-white">
                        Off<span className="text-yellow-400">campus✨</span>
                    </h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className="hover:text-yellow-300 transition-colors">Companies</Link></li>
                                <li><Link to="/admin/jobs" className="hover:text-yellow-300 transition-colors">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link></li>
                                <li><Link to="/jobs" className="hover:text-yellow-300 transition-colors">Jobs</Link></li>
                                <li><Link to="/browse" className="hover:text-yellow-300 transition-colors">Browse</Link></li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline" className="hover:bg-white hover:text-purple-500 transition-all">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-yellow-400 hover:bg-yellow-300 text-black hover:scale-105 transition-transform">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                {/* Avatar with hover and bounce animation */}
                                <Avatar className="cursor-pointer hover:shadow-lg hover:animate-bounce transition-transform transform hover:scale-110">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || "/default-avatar.png"}
                                        alt="User Avatar"
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-80 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg rounded-lg p-4 animate-fade-in animate-slide-down"
                            >
                                {/* Header Section */}
                                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                                    <Avatar className="w-16 h-16 rounded-full shadow-md">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || "/default-avatar.png"}
                                            alt="User Avatar"
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold text-white text-lg">
                                            {user?.fullname || "Full Name"}
                                        </h4>
                                        <p className="text-sm text-gray-200">
                                            {user?.profile?.bio || "Add a short bio about yourself"}
                                        </p>
                                    </div>
                                </div>

                                {/* Menu Options */}
                                <div className="flex flex-col gap-3 text-white">
                                    {user && user.role === "student" && (
                                        <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-200 transition-colors">
                                            <User2 className="text-white animate-slide-in" />
                                            <Button variant="link">
                                                <Link
                                                    to="/profile"
                                                    className="hover:underline animate-slide-in"
                                                >
                                                    View Profile
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-200 transition-colors">
                                        <LogOut className="text-white animate-slide-in" />
                                        <Button
                                            onClick={logoutHandler}
                                            variant="link"
                                            className="hover:underline animate-slide-in"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

