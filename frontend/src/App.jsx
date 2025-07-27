import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/student/Home';
import CoursesList from './pages/student/CoursesList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
// import Studentdashboard from './pages/student/Sdashboard';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Teacher from './pages/teacher/Teacher';
import Student from './pages/student/Student'
import Register from './pages/common/Register';
import TDashboard from './pages/teacher/Dashboard';
import AddCourse from './pages/teacher/AddCourse';
import MyCourses from './pages/teacher/MyCourses';
import StudentsEnrolled from './pages/teacher/StudentsEnrolled';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import "quill/dist/quill.snow.css";
import { ToastContainer } from 'react-toastify';
import Login from './pages/common/Login';
import Admin from './pages/admin/Admin';
import PrivateRoute from './routes/PrivateRoute';
import RoleBasedRoute from './routes/RoleBasedRoute';
import Feedbacks from './pages/teacher/Feedbacks';
import Settings from './pages/teacher/Settings';
import AdminSettings from './pages/admin/AdminSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTestimonial from './pages/admin/AdminTestimonial';
import AdminTeachersList from './pages/admin/AdminTeachersList';
import AdminCoursesList from './pages/admin/AdminCoursesList';
import AllContactUs from './pages/admin/AllContactUs';
import ContactUs from './pages/common/ContactUs';
import AboutUsSection from './pages/common/AboutUs';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentProfile from './pages/student/StudentProfile';
import StudentSettings from './pages/student/StudentSettings';


const App = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <ToastContainer />
      <Navbar />


      <div className="flex-grow pb-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/course-list" element={<CoursesList />} />
          <Route path="/course-list/:input" element={<CoursesList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/my-enrollments" element={
            <PrivateRoute><MyEnrollments /></PrivateRoute>
          } />
          <Route path="/player/:courseId" element={
            <PrivateRoute><Player /></PrivateRoute>
          } />

          <Route path="/loading/:path" element={<Loading />} />

          <Route path="/teacher" element={
            <RoleBasedRoute allowedRoles={['TEACHER']}><Teacher /></RoleBasedRoute>
          }>
            <Route index element={<TDashboard />} />

            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="settings" element={<Settings />} />
            <Route path="student-enrolled" element={<StudentsEnrolled />} />
          </Route>

          <Route path="/student" element={
            <RoleBasedRoute allowedRoles={['STUDENT']}>
              <Student />
            </RoleBasedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            <Route path="student-dashboard" element={<StudentDashboard />} />
            <Route path="student-courses" element={<StudentCourses />} />
            <Route path="student-profile" element={<StudentProfile />} />
            <Route path="student-settings" element={<StudentSettings />} />
            {/* Add other student routes here */}
          </Route>
          <Route path="/admin" element={
            <RoleBasedRoute allowedRoles={['ADMIN']}><Admin /></RoleBasedRoute>
          } />

          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="testimonials" element={<AdminTestimonial />} />
            <Route path="teachers" element={<AdminTeachersList />} />
            <Route path="courses" element={<AdminCoursesList />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="allContactUs" element={<AllContactUs />} />

          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
