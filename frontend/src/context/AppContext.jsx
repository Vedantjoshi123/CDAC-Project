import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import axios from "axios";
import { toast } from "react-toastify";
import { getAllCourses } from "../services/courseService";
import { getAllCategories } from "../services/categoryService";  

// Create context
export const AppContext = createContext();

function AppContextProvider(props) {
  const navigate = useNavigate();
  const [courseCategories, setCourseCategories] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [categories, setCategories] = useState([]);     
  const isTeacher = user?.userRole?.toUpperCase() === "TEACHER";
  const isStudent = user?.userRole?.toUpperCase() === "STUDENT";
  const isLoggedIn = !!user && !!token;
  const userRole = user?.userRole || null;

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localToken = localStorage.getItem("token");

    if (localUser && localToken) {
      setUser(JSON.parse(localUser));
      setToken(localToken);
    }
  }, []);

  const addCategory = (category) => {
    if (!category || courseCategories.includes(category)) return;
    setCourseCategories((prev) => [...prev, category]);
  };

  const login = (userData, jwtToken) => {
     if (!userData || !jwtToken) {
    toast.error("Invalid login attempt.");
    return;
  }
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
    setUser(userData);
    setToken(jwtToken);
    toast.dismiss();
    if (userData.userRole === "STUDENT") navigate("/student/dashboard");
    else if (userData.userRole === "TEACHER") navigate("/teacher/dashboard");
    else if (userData.userRole === "ADMIN") navigate("/admin/dashboard");
    else navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

const fetchAllCourses = async () => {
  const result = await getAllCourses();

  if (result.status === "success") {
    const data = Array.isArray(result.data) ? result.data : [];
    console.log("Fetched Courses:", data); // 👈 See what each course object contains
    setAllCourses(data);
  } else {
    console.error("Failed to fetch courses:", result.message);
    setAllCourses([]);
  }
};


const fetchAllCategories = async () => {
  const result = await getAllCategories();
  if (result.status === "success") {
    const data = Array.isArray(result.data) ? result.data : [];
    setCategories(data);
  } else {
    console.error("Failed to fetch categories:", result.message);
    setCategories([]);
  }
};

const fetchUserEnrolledCourse = async () => {
  if (!user?.id || user?.userRole?.toUpperCase() !== "STUDENT") return;

  try {
    const response = await axios.get(`/enrollments/student/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = Array.isArray(response.data) ? response.data : []; // ✅ fix
    setEnrolledCourses(data);
  } catch (err) {
    console.error("Failed to fetch enrolled courses", err);
    setEnrolledCourses([]); // ✅ fallback on error
  }
};


  const calculateRating = (course) => {
    if (!course || !Array.isArray(course.courseRatings)) return "0.0";
    const ratings = course.courseRatings;
    if (!ratings.length) return "0.0";
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const calculateChapterTime = (chapter) => {
    const time = chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0);
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateCourseDuration = (course) => {
    let total = 0;
    course.courseContent.forEach((chapter) => {
      total += chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0);
    });
    return humanizeDuration(total * 60 * 1000, { units: ["h", "m"] });
  };

  const calculateNoOfLectures = (course) => {
    return course.courseContent.reduce((total, chapter) => {
      return total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0);
    }, 0);
  };

  useEffect(() => {
    if (token) {
      fetchAllCourses();
      if (user?.userRole?.toUpperCase() === "STUDENT") {
        fetchUserEnrolledCourse();
      }
    }
  }, [user, token]);

  const value = {
    navigate,
    allCourses,
    fetchAllCourses,
    enrolledCourses,
    fetchUserEnrolledCourse,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    user,
    token,
    login,
    logout,
    isLoggedIn,
    userRole,
    isTeacher,
    isStudent, 
    categories,
    fetchAllCategories,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}

export { AppContextProvider };
