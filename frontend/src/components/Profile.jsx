import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-gradient-to-r from-indigo-100 via-blue-100 to-green-100 border border-gray-200 rounded-2xl my-5 p-8 shadow-lg transition-shadow hover:shadow-2xl'>
                <div className="bg-white shadow rounded-lg p-6 transition-transform transform hover:scale-105">
                    {/* Profile Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <Avatar className="h-28 w-28 rounded-full overflow-hidden shadow-lg transition-shadow hover:shadow-2xl">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto || '/default-avatar.png'}
                                    alt={`${user?.fullname}'s profile`}
                                />
                            </Avatar>
                            {/* User Info */}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-200">
                                    {user?.fullname || 'User Name'}
                                </h1>
                                <p className="text-gray-600 mt-1">{user?.profile?.bio || 'Add a bio here'}</p>
                            </div>
                        </div>
                        {/* Edit Button */}
                        <Button
                            onClick={() => setOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white border border-blue-600 rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-all"
                            variant="outline"
                        >
                            <Pen className="h-5 w-5" />
                            <span>Edit</span>
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="my-6 transition-all hover:bg-gray-50 p-2 rounded-md">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h2>
                        <div className="flex items-center gap-4 text-gray-600 my-2 hover:text-blue-500 transition">
                            <Mail className="h-5 w-5 text-gray-500" />
                            <span>{user?.email || 'Email not provided'}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 my-2 hover:text-blue-500 transition">
                            <Contact className="h-5 w-5 text-gray-500" />
                            <span>{user?.phoneNumber || 'Phone number not provided'}</span>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="my-6 transition duration-200 ">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {user?.profile?.skills?.length
                                ? user.profile.skills.map((item, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm transition hover:bg-blue-400 hover:text-white"
                                    >
                                        {item}
                                    </Badge>
                                ))
                                : <span className="text-gray-500">No skills added yet</span>}
                        </div>
                    </div>
                </div>

                {/* Resume Section */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-bold"></Label>
                    <Card className="resume-card transition-transform hover:scale-105">
                        <CardHeader>
                            <CardTitle className="text-indigo-600 hover:text-indigo-800 transition">{isResume ? "Resume" : "No Resume"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isResume ? (
                                <>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={user?.profile?.resume}
                                        className="text-blue-500 hover:underline cursor-pointer transition duration-200"
                                    >
                                        {user?.profile?.resumeOriginalName || "View/Download Resume"}
                                    </a>
                                    {/* Render image preview */}
                                    {user?.profile?.resume?.match(/\.(jpg|jpeg|png)$/) ? (
                                        <img
                                            src={user?.profile?.resume}
                                            alt="Resume Preview"
                                            className="mt-2 w-full rounded-lg shadow-md transition-transform hover:scale-105"
                                        />
                                    ) : (
                                        <p className="mt-2 text-red-500 transition duration-200">Unsupported format</p>
                                    )}
                                </>
                            ) : (
                                <span>No Resume Uploaded</span>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-4'>
                <h1 className='font-bold text-lg my-5 text-indigo-700 hover:text-indigo-900 transition duration-300'>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
