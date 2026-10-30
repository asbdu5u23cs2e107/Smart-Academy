import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  BookOpen,
  Users,
  Award,
  Clock,
  CheckCircle,
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
    // email: "johnsmith@gmail.com",
    // phone: "+91 9876543210",
    skills: [
      "React JS",
      "Node JS",
      "MongoDB",
      "Express JS",
      "JavaScript",
    ],
    qualification: "M.Tech Computer Science",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    about:
      "John Smith is an experienced Full Stack Developer and trainer. He has trained thousands of students in modern web technologies and helps learners build industry-ready projects.",
  },
];


export default function TrainerDetails() {

  const { id } = useParams();
  const navigate = useNavigate();


  const trainer = trainers.find(
    (item) => item.id === Number(id)
  );


  if (!trainer) {
    return (
      <div className="p-10 text-center text-xl">
        Trainer Not Found
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-slate-50 p-6">


      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        <ArrowLeft size={18}/>
        Back
      </button>



      <div className="max-w-6xl mx-auto">


        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col md:flex-row gap-8">


          <img
            src={trainer.image}
            alt={trainer.name}
            className="w-44 h-44 rounded-full object-cover border-4 border-indigo-500"
          />


          <div className="flex-1">


            <h1 className="text-3xl font-bold text-gray-800">
              {trainer.name}
            </h1>


            <p className="text-indigo-600 text-lg font-semibold mt-1">
              {trainer.role}
            </p>


            <p className="text-gray-500 mt-2">
              {trainer.department}
            </p>


            <span className="inline-block mt-4 bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
              {trainer.status}
            </span>


          </div>


        </div>




        {/* Information Cards */}
        <div className="grid md:grid-cols-3 gap-5 mt-6">


          <div className="bg-white p-5 rounded-xl shadow">
            <BookOpen className="text-indigo-600"/>
            <h3 className="font-bold mt-2">
              Course
            </h3>
            <p className="text-gray-600">
              {trainer.course}
            </p>
          </div>



          <div className="bg-white p-5 rounded-xl shadow">
            <Users className="text-green-600"/>
            <h3 className="font-bold mt-2">
              Students Trained
            </h3>
            <p className="text-gray-600">
              {trainer.students}
            </p>
          </div>



          <div className="bg-white p-5 rounded-xl shadow">
            <Clock className="text-orange-500"/>
            <h3 className="font-bold mt-2">
              Experience
            </h3>
            <p className="text-gray-600">
              {trainer.experience}
            </p>
          </div>


        </div>




        {/* About Trainer */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">

          <h2 className="text-xl font-bold mb-3">
            About Trainer
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {trainer.about}
          </p>

        </div>




        {/* Skills */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">

          <h2 className="text-xl font-bold mb-4">
            Skills
          </h2>


          <div className="flex flex-wrap gap-3">

            {trainer.skills.map((skill,index)=>(
              <span
                key={index}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>




        {/* Details */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">


          <h2 className="text-xl font-bold mb-4">
            Trainer Information
          </h2>


          <div className="grid md:grid-cols-2 gap-4 text-gray-600">


            <p>
              <b>Qualification:</b> {trainer.qualification}
            </p>


            {/* <p>
              <b>Email:</b> {trainer.email}
            </p> */}


            {/* <p>
              <b>Phone:</b> {trainer.phone}
            </p> */}


            <p className="flex gap-2">
              <MapPin size={18}/>
              {trainer.location}
            </p>


          </div>


        </div>




        {/* Action */}
        <button
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:bg-indigo-700"
        >
          <CheckCircle size={18}/>
          Assign Course
        </button>



      </div>


    </div>

  );
}