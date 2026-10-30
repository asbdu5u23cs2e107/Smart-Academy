import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

// Pages
import Home from '../pages/Home';
import PublicLiveClasses from '../pages/LiveClasses';
import LiveClassSession from '../pages/LiveClassSession';
import AssessmentIntro from '../pages/AssessmentIntro';
import AssessmentRunning from '../pages/AssessmentRunning';
import PublicCourses from '../pages/Courses';
import CourseDetails from '../pages/CourseDetails';
import CourseLearning from '../pages/CourseLearning';
import PracticeHub from '../pages/PracticeHub';
import Resources from '../pages/Resources';
import CareerHub from '../pages/CareerHub';
import ProjectsHub from '../pages/ProjectsHub';
import Placements from '../pages/Placements';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import PaymentSuccess from '../pages/PaymentSuccess';
import Assignment from '../pages/Assignment';
import Certificate from '../pages/Certificate';
import { useAuth } from '../context/AuthContext';
import TrainerDashboard from '../pages/TrainerDashboard';

const CertificatePageRouter = () => {
  const { user } = useAuth();
  if (user?.role === 'admin' || user?.role === 'super-admin') {
    return <Certificates />;
  }
  return <Certificate />;
};
import SuperAdminDashboard from '../pages/SuperAdminDashboard';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import FAQ from '../pages/FAQs';
import TrainersPage from '../pages/TrainersPage';
import TrainerDetails from '../pages/TrainerDetails';
import LiveCourseDetails from '../pages/course/LiveCourseDetails';
import EnrollmentPage from '../enrollment/EnrollmentPage';
import EnrollmentSuccess from '../enrollment/EnrollmentSuccess';

// Student Dashboard Module (modular sub-pages)
import StudentDashboardHome from '../pages/StudentDashboard/index';
import MyCourses from '../pages/StudentDashboard/MyCourses';
import Videos from '../pages/StudentDashboard/Videos';
import Notes from '../pages/StudentDashboard/Notes';

import Projects from '../pages/StudentDashboard/Projects';
import ExamsTests from '../pages/StudentDashboard/ExamsTests';
// import StudentCertificates from '../pages/StudentDashboard/Certificates';
import PaymentHistory from '../pages/StudentDashboard/PaymentHistory';
import PlacementsStudent from '../pages/StudentDashboard/Placements';
import ProjectDetailPage from '../pages/Projectdetailpage';

// Admin Dashboard Pages
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminUsers from '../pages/AdminDashboard/AdminUsers';
import Students from '../pages/AdminDashboard/Students';
import Trainers from '../pages/AdminDashboard/Trainers';
import Admins from '../pages/AdminDashboard/Admins';
import RolesPermissions from '../pages/AdminDashboard/RolesPermissions';
import UserActivity from '../pages/AdminDashboard/UserActivity';
import AdminLearningManagement from '../pages/AdminDashboard/LearningManagement';
import AdminCourses from '../pages/AdminDashboard/Courses';
import AdminEnrollments from '../pages/AdminDashboard/Enrollments';
// import AdminLiveClasses from '../pages/AdminDashboard/LiveClasses';
import AdminCertificates from '../pages/AdminDashboard/Certificates';
import AdminPractice from '../pages/AdminDashboard/AdminPractice';
import PracticeDashboard from '../pages/AdminDashboard/PracticeDashboard';
import PracticeQuestions from '../pages/AdminDashboard/PracticeQuestions';
import PracticeMCQTests from '../pages/AdminDashboard/PracticeMCQTests';
import PracticeCodingProblems from '../pages/AdminDashboard/PracticeCodingProblems';
import PracticeMockTests from '../pages/AdminDashboard/PracticeMockTests';
import PracticeQuizzes from '../pages/AdminDashboard/PracticeQuizzes';
import PracticeContests from '../pages/AdminDashboard/PracticeContests';
import PracticeCategories from '../pages/AdminDashboard/PracticeCategories';
import ProjectManagement from '../pages/AdminDashboard/ProjectManagement';
import AddProject from '../pages/AdminDashboard/AddProject';
import ProjectCategories from '../pages/AdminDashboard/ProjectCategories';
import ProjectSubmissions from '../pages/AdminDashboard/ProjectSubmissions';
import ProjectReviews from '../pages/AdminDashboard/ProjectReviews';
import AdminResources from '../pages/AdminDashboard/AdminResources';
import BlogArticles from '../pages/AdminDashboard/BlogArticles';
import InterviewQuestions from '../pages/AdminDashboard/InterviewQuestions';
import CheatSheets from '../pages/AdminDashboard/CheatSheets';
import Ebooks from '../pages/AdminDashboard/Ebooks';
import VideoResources from '../pages/AdminDashboard/VideoResources';
import DownloadsResources from '../pages/AdminDashboard/DownloadsResources';
import AdminCareer from '../pages/AdminDashboard/AdminCareer';
import AdminFinance from '../pages/AdminDashboard/AdminFinance';
import AdminWebsite from '../pages/AdminDashboard/AdminWebsite';
// import AdminCommunication from '../pages/AdminDashboard/AdminCommunication';
import AdminAnalytics from '../pages/AdminDashboard/AdminAnalytics';
import AdminSettings from '../pages/AdminDashboard/AdminSettings';
import AddStudent from '../pages/AdminDashboard/AddStudent'; 
import StudentList from '../pages/AdminDashboard/StudentList'; // Import StudentList component
import StudentAttendance from '../pages/AdminDashboard/StudentAttendance'; // Import StudentAttendance component
import FeeDetails from '../pages/AdminDashboard/FeeDetails';
import Certificates from "../pages/AdminDashboard/Certificates";
// import StudentCertificates from '../pages/AdminDashboard/StudentCertificates';
import AddTrainer from '../pages/AdminDashboard/AddTrainer';
import TrainerList from '../pages/AdminDashboard/TrainerList';
import AssignCourses from '../pages/AdminDashboard/AssignCourses';
import TrainerAttendance from '../pages/AdminDashboard/TrainerAttendance'; // Import TrainerAttendance component
import AddCourse from '../pages/AdminDashboard/AddCourse';
import ManageCourse from '../pages/AdminDashboard/ManageCourse';
import Assignments from '../pages/AdminDashboard/Assignments'; 
import CourseSchedule from "../pages/AdminDashboard/CourseSchedule";
import CourseAssignments from '../pages/AdminDashboard/Assignments';
import UploadNotes from '../pages/AdminDashboard/UploadNotes';
import UploadVideos from '../pages/AdminDashboard/UploadVideos';
import UploadPPT from '../pages/AdminDashboard/UploadPPT';
import  CodingFiles from '../pages/AdminDashboard/CodingFiles';
import ManageResources from '../pages/AdminDashboard/ManageResources';
import LiveClassMonitoring from '../pages/AdminDashboard/LiveClassMonitoring';
import  AIWarningPanel from '../pages/AdminDashboard/AIWarningPanel';
import Reports from '../pages/AdminDashboard/Reports';

// Protected Route Component - Fixed import path
import ProtectedRoute from '../components/ProtectedRoute';
const AppRoutes = () => {
  return (
    <Routes>
      {/* ======================================== */}
      {/* AUTH & CHECKOUT (Standalone) */}
      {/* ======================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />

      {/* ======================================== */}
      {/* LIVE EXAM & LIVE CLASS SESSIONS (Full Screen) */}
      {/* ======================================== */}
      <Route path="/live-class/:id" element={<LiveClassSession />} />
      <Route path="/assessment/:id/take" element={<AssessmentRunning />} />

      {/* ======================================== */}
      {/* MAIN PAGES (With Navbar and Footer) */}
      {/* ======================================== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<PublicCourses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/live-classes" element={<PublicLiveClasses />} />
        <Route path="/live-course/:slug" element={<LiveCourseDetails />} />
        <Route path="/practice" element={<PracticeHub />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/career" element={<CareerHub />} />
        <Route path="/projects" element={<ProjectsHub />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/trainerspage" element={<TrainersPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/assessment/:id" element={<AssessmentIntro />} />
        <Route path="/trainerdetail/:id" element={<TrainerDetails />} />
        <Route path="/enrollment" element={<EnrollmentPage />} />
        <Route path="/enrollment/success" element={<EnrollmentSuccess />} />
      </Route>

      {/* ======================================== */}
      {/* STUDENT DASHBOARD (With Student Sidebar) */}
      {/* ======================================== */}
      <Route element={<DashboardLayout />}>
        {/* Student Dashboard - Modular Sub-Routes */}
        <Route path="/student-dashboard" element={<StudentDashboardHome />} />
        <Route path="/student-dashboard/courses" element={<MyCourses />} />
        <Route path="/student-dashboard/videos" element={<Videos />} />
        <Route path="/student-dashboard/notes" element={<Notes />} />
        <Route path="/student-dashboard/assignments" element={<Assignments />} />
        <Route path="/student-dashboard/projects" element={<Projects />} />
        <Route path="/student-dashboard/exams" element={<ExamsTests />} />
        <Route path="/student-dashboard/certificates" element={<Certificate />} />
        <Route path="/student-dashboard/payments" element={<PaymentHistory />} />
        <Route path="/student-dashboard/placements" element={<PlacementsStudent />} />

        {/* Course Learning */}
        <Route path="/course/:id/learn" element={<CourseLearning />} />

        {/* Shared Dashboard Routes */}
        <Route path="/placements" element={<Placements />} />
        <Route path="/assignments" element={<Assignment />} />
        <Route path="/certificates" element={<CertificatePageRouter />} />

        {/* Trainer Role Dashboard */}
        <Route path="/trainer" element={<TrainerDashboard />} />
        <Route path="/trainer/:subView" element={<TrainerDashboard />} />

        {/* Super Admin Dashboard - Using Student Sidebar (if needed) */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
      </Route>

      {/* ======================================== */}
      {/* ADMIN DASHBOARD (With Admin Sidebar) */}
      {/* ======================================== */}
      <Route 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin Dashboard - Main */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Admin - Users Management */}
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/trainers" element={<Trainers />} />
        <Route path="/admin/admins" element={<Admins />} />
        <Route path="/admin/roles-permissions" element={<RolesPermissions />} />
        <Route path="/admin/user-activity" element={<UserActivity />} />
        <Route path="/admin/addStudent" element={<AddStudent />} />
        <Route path="/admin/studentList" element={<StudentList />} /> 
        <Route path="/admin/studentAttendance" element={<StudentAttendance />} />
        <Route path="/admin/feeDetails" element={<FeeDetails />}/>
        <Route path="/admin/certificates" element={<Certificates />} />
        <Route path="/admin/Certificates" element={<Certificates />} />
        <Route path="/admin/students/certificates" element={<Certificates />} />
        <Route path="/admin/students/Certificates" element={<Certificates />} />


               {/* // TRAINER DETAILS */}
        <Route path="/admin/addTrainer" element={<AddTrainer />} />
       < Route  path="/admin/TrainerList" element={<TrainerList />}/>
        <Route path="/admin/AssignCourses" element={<AssignCourses />}/>
        <Route path="/admin/TrainerAttendance" element={<TrainerAttendance />}/>


                {/* //COURSE MANAGEMENT */}
        <Route path="/admin/addCourse" element={<AddCourse />} />
        <Route path="/admin/courses/add" element={<AddCourse />} />
        <Route path="/admin/manageCourse" element={<ManageCourse />} />
        <Route path="/admin/courses/manage" element={<ManageCourse />} />
        <Route path="/admin/courseSchedule" element={<CourseSchedule />}/>
        <Route path="/admin/Assignments" element={<Assignments />}/>


        {/* //RESOURCE MANAGEMENT */}
        <Route path="/admin/uploadNotes" element={<UploadNotes />} />
        <Route path="/admin/UploadNotes" element={<UploadNotes />} />
        <Route path="/admin/resources/upload-notes" element={<UploadNotes />} />

        <Route path="/admin/uploadVideos" element={<UploadVideos />} />
        <Route path="/admin/Uploadvideos" element={<UploadVideos />} />
        <Route path="/admin/UploadVideos" element={<UploadVideos />} />
        <Route path="/admin/resources/upload-videos" element={<UploadVideos />} />

        <Route path="/admin/uploadPPT" element={<UploadPPT />} />
        <Route path="/admin/UploadPPT" element={<UploadPPT />} />
        <Route path="/admin/resources/upload-ppt" element={<UploadPPT />} />

        <Route path="/admin/codingFiles" element={<CodingFiles />} />
        <Route path="/admin/CodingFiles" element={<CodingFiles />} />
        <Route path="/admin/resources/coding-files" element={<CodingFiles />} />

        <Route path="/admin/manageResources" element={<ManageResources />} />
        <Route path="/admin/ManageResources" element={<ManageResources />} />
        <Route path="/admin/resources/manage" element={<ManageResources />} />

             {/* //LIVE CLASS MONITORING */}
        <Route path="/admin/liveClassMonitoring" element={<LiveClassMonitoring />}/>

            {/* //AI WARNING PANEL */}
        <Route path="/admin/AIWarningPanel" element={<AIWarningPanel />}/>


              {/* //REPORTS */}
        <Route path="/admin/reports" element={<Reports />}/>

        {/* Admin - Learning Management */}
        <Route path="/admin/learning" element={<AdminLearningManagement />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/enrollments" element={<AdminEnrollments />} />
        {/* <Route path="/admin/live-classes" element={<AdminLiveClasses />} /> */}
        <Route path="/admin/learning/certificates" element={<Certificates />} />
        
        {/* Admin - Practice Management */}
        <Route path="/admin/practice" element={<PracticeDashboard />} />
        <Route path="/admin/practice/questions" element={<PracticeQuestions />} />
        <Route path="/admin/practice/mcq-tests" element={<PracticeMCQTests />} />
        <Route path="/admin/practice/coding-problems" element={<PracticeCodingProblems />} />
        <Route path="/admin/practice/mock-tests" element={<PracticeMockTests />} />
        <Route path="/admin/practice/quizzes" element={<PracticeQuizzes />} />
        <Route path="/admin/practice/contests" element={<PracticeContests />} />
        <Route path="/admin/practice/categories" element={<PracticeCategories />} />
        
        {/* Admin - Projects Management */}
        <Route path="/admin/projects" element={<ProjectManagement />} />
        <Route path="/admin/projects/add" element={<AddProject />} />
        <Route path="/admin/projects/categories" element={<ProjectCategories />} />
        <Route path="/admin/projects/submissions" element={<ProjectSubmissions />} />
        <Route path="/admin/projects/reviews" element={<ProjectReviews />} />
        
        {/* Admin - Resources Management */}
        <Route path="/admin/resources" element={<AdminResources />} />
        <Route path="/admin/resources/blogs" element={<BlogArticles />} />
        <Route path="/admin/resources/interview-questions" element={<InterviewQuestions />} />
        <Route path="/admin/resources/cheat-sheets" element={<CheatSheets />} />
        <Route path="/admin/resources/ebooks" element={<Ebooks />} />
        <Route path="/admin/resources/videos" element={<VideoResources />} />
        <Route path="/admin/resources/downloads" element={<DownloadsResources />} />
        
        {/* Admin - Career Services */}
        {/* <Route path="/admin/career" element={<AdminCareer />} />
        <Route path="/admin/career/jobs" element={<AdminCareer />} />
        <Route path="/admin/career/applications" element={<AdminCareer />} />
        <Route path="/admin/career/interviews" element={<AdminCareer />} />
        <Route path="/admin/career/placements" element={<AdminCareer />} /> */}
        
        {/* Admin - Finance Management */}
        {/* <Route path="/admin/finance" element={<AdminFinance />} />
        <Route path="/admin/finance/transactions" element={<AdminFinance />} />
        <Route path="/admin/finance/payments" element={<AdminFinance />} />
        <Route path="/admin/finance/invoices" element={<AdminFinance />} />
        <Route path="/admin/finance/revenue" element={<AdminFinance />} /> */}
        
        {/* Admin - Website Management */}
        {/* <Route path="/admin/website" element={<AdminWebsite />} />
        <Route path="/admin/website/pages" element={<AdminWebsite />} />
        <Route path="/admin/website/banners" element={<AdminWebsite />} />
        <Route path="/admin/website/navigation" element={<AdminWebsite />} />
        <Route path="/admin/website/seo-settings" element={<AdminWebsite />} /> */}
        
        {/* Admin - Communication
        <Route path="/admin/communication" element={<AdminCommunication />} />
        <Route path="/admin/communication/announcements" element={<AdminCommunication />} />
        <Route path="/admin/communication/notifications" element={<AdminCommunication />} />
        <Route path="/admin/communication/messages" element={<AdminCommunication />} />
        <Route path="/admin/communication/campaigns" element={<AdminCommunication />} /> */}
        
        {/* Admin - Analytics */}
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        
        {/* Admin - Settings */}
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* ======================================== */}
      {/* SUPER ADMIN (Using Admin Layout) */}
      {/* ======================================== */}
      <Route 
        element={
          <ProtectedRoute requiredRole="super_admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/super-admin-dashboard"
           element={<SuperAdminDashboard />} />
        {/* Super Admin can also access admin pages */}
        <Route path="/super-admin/users" 
          element={<AdminUsers />} />
        <Route path="/super-admin/settings" 
          element={<AdminSettings />} />
      </Route>

      {/* ======================================== */}
      {/* CATCH-ALL: 404 - Redirect to Home */}
      {/* ======================================== */}

      <Route
       path="*" 
       element={<Navigate to="/" replace />}
        />
    </Routes>
  );
};

export default AppRoutes;