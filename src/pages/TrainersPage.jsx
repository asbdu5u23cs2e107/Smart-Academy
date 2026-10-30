
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  Briefcase,
  GraduationCap,
  MapPin,
  Eye,
} from "lucide-react";

const trainers = [
  {
    id: 1,
    name: "John Smith",
    role: "Senior Full Stack Trainer",
    course: "MERN Stack",
    department: "Web Development",
    experience: "8 Years",
    students: "3200+",
    location: "Chennai",
    status: "Available",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Python Trainer",
    course: "Python Full Stack",
    department: "Programming",
    experience: "6 Years",
    students: "2800+",
    location: "Bangalore",
    status: "Available",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "David Wilson",
    role: "Java Trainer",
    course: "Java Full Stack",
    department: "Programming",
    experience: "10 Years",
    students: "4000+",
    location: "Hyderabad",
    status: "Available",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emma Brown",
    role: "React Trainer",
    course: "React JS",
    department: "Frontend",
    experience: "5 Years",
    students: "2200+",
    location: "Coimbatore",
    status: "Available",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "Michael Lee",
    role: "Node.js Trainer",
    course: "Backend Development",
    department: "Backend",
    experience: "7 Years",
    students: "2500+",
    location: "Pune",
    status: "Available",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Sophia Taylor",
    role: "UI/UX Trainer",
    course: "Figma & UI Design",
    department: "Design",
    experience: "6 Years",
    students: "1900+",
    location: "Chennai",
    status: "Available",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 7,
    name: "Daniel Thomas",
    role: "DevOps Trainer",
    course: "AWS & Docker",
    department: "Cloud",
    experience: "9 Years",
    students: "2600+",
    location: "Delhi",
    status: "Available",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 8,
    name: "Olivia Martin",
    role: "Data Science Trainer",
    course: "Machine Learning",
    department: "AI",
    experience: "8 Years",
    students: "3100+",
    location: "Mumbai",
    status: "Available",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 9,
    name: "James Anderson",
    role: "Cloud Trainer",
    course: "Microsoft Azure",
    department: "Cloud",
    experience: "8 Years",
    students: "2400+",
    location: "Noida",
    status: "Available",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 10,
    name: "Emily Davis",
    role: "Testing Trainer",
    course: "Automation Testing",
    department: "QA",
    experience: "7 Years",
    students: "2100+",
    location: "Trichy",
    status: "Available",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

export default function TrainersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
const [selectedTrainer, setSelectedTrainer] = useState(null);

  const filtered = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(search.toLowerCase()) ||
      trainer.course.toLowerCase().includes(search.toLowerCase()) ||
      trainer.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Meet Our Expert Trainers
          </h1>

          <p className="text-lg text-indigo-100 max-w-3xl mx-auto">
            Learn from experienced industry professionals who have trained
            thousands of students and helped them build successful careers.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <Users className="mx-auto text-indigo-600 mb-3" size={35} />
            <h2 className="text-3xl font-bold">10+</h2>
            <p className="text-gray-500">Expert Trainers</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <GraduationCap className="mx-auto text-green-600 mb-3" size={35} />
            <h2 className="text-3xl font-bold">25000+</h2>
            <p className="text-gray-500">Students Trained</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <Briefcase className="mx-auto text-orange-600 mb-3" size={35} />
            <h2 className="text-3xl font-bold">40+</h2>
            <p className="text-gray-500">Courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <MapPin className="mx-auto text-red-600 mb-3" size={35} />
            <h2 className="text-3xl font-bold">8</h2>
            <p className="text-gray-500">Cities</p>
          </div>

        </div>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search trainer, course or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Trainer Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

          {filtered.map((trainer) => (

            // <div
            //   key={trainer.id}
            //   className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            // >

            

            //   <div className="p-5">

            //     <h2 className="text-xl font-bold">
            //       {trainer.name}
            //     </h2>

            //     <p className="text-indigo-600 font-medium mb-4">
            //       {trainer.role}
            //     </p>

            //     <div className="space-y-2 text-sm text-gray-600">

            //       <p><span className="font-semibold">Course:</span> {trainer.course}</p>
            //       <p><span className="font-semibold">Department:</span> {trainer.department}</p>
            //       <p><span className="font-semibold">Experience:</span> {trainer.experience}</p>
            //       <p><span className="font-semibold">Students:</span> {trainer.students}</p>
            //       <p><span className="font-semibold">Location:</span> {trainer.location}</p>

            //       <p>
            //         <span className="font-semibold">Status:</span>
            //         <span className="ml-2 text-green-600 font-semibold">
            //           {trainer.status}
            //         </span>
            //       </p>

            //     </div>

            //     <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex items-center justify-center gap-2">
            //       <Eye size={18} />
            //       View Profile
            //     </button>
            <div className="p-3">
                <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-40 object-cover"
              />

  <h2 className="text-lg font-semibold">
    {trainer.name}
  </h2>

  <p className="text-sm text-indigo-600 font-medium">
    {trainer.department}
  </p>


 <button
  onClick={() => navigate(`/trainerdetail/${trainer.id}`)}
  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
>
  <Eye size={16} />
  View Profile
</button>
</div>


          ))}

        </div>

      </section>

    </div>
  );
}
