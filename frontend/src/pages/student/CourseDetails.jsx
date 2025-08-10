import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import Youtube from 'react-youtube';
import { getAverageRating, getFeedback } from '../../services/feedbackService';
import { addFeedback } from '/src/services/feedbackService.js';
import { config } from '../../services/config';
import { getTeacherById } from '../../services/teacherService';
import { getChaptersByCourse } from '../../services/chapterService';
import { FaArrowLeft } from 'react-icons/fa';
import { enrollCourse, checkEnrollment } from '../../services/purchaseService';

const extractYouTubeVideoId = (url) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }
    return null;
  } catch {
    return null;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [teacherName, setTeacherName] = useState('Loading...');
  const [videoLoading, setVideoLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentChapterTitle, setCurrentChapterTitle] = useState('');
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [enrollError, setEnrollError] = useState(null);

  // Feedback related state
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);
  const [ratingInput, setRatingInput] = useState(0); // 1..5
  const [commentInput, setCommentInput] = useState('');
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [userHasSubmitted, setUserHasSubmitted] = useState(false);

  const {
    fetchAllCourses,
    allCourses,
    currency,
    user
  } = useContext(AppContext);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) {
      fetchAllCourses();
      return;
    }
    const found = allCourses.find(course => course.id?.toString() === id);
    if (found) {
      setCourseData({
        ...found,
        courseTitle: found.title || '',
        courseDescription: found.description || '',
        courseThumbnail: found.thumbnail || '',
        coursePrice: found.price || 0,
        discount: found.discount || 0,
        enrolledStudents: found.enrolledStudents || [],
        courseContent: found.courseContent || [],
        courseRatings: found.courseRatings || [],
        createdOn: found.createdOn || null,
      });
      // Get average rating (service may return number or response.data)
      getAverageRating(found.id)
        .then((res) => {
          const avg = (res && typeof res === 'object' && res.data !== undefined) ? res.data : res;
          setAverageRating(Number(avg || 0));
        })
        .catch(() => setAverageRating(0));

      if (found.teacherId) {
        getTeacherById(found.teacherId)
          .then((teacher) => {
            if (teacher) setTeacherName(`${teacher.firstName} ${teacher.lastName}`);
            else setTeacherName('Unknown');
          })
          .catch(() => setTeacherName('Unknown'));
      } else {
        setTeacherName('Unknown');
      }
    }
  }, [allCourses, id, fetchAllCourses]);

  useEffect(() => {
    if (!id) return;
    const fetchChapters = async () => {
      try {
        const response = await getChaptersByCourse(id);
        const data = response?.data ?? response;
        setChapters(data || []);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
    fetchChapters();
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;
    const checkUserEnrollment = async () => {
      try {
        const enrolled = await checkEnrollment(user.id, id);
        const val = enrolled?.data ?? enrolled;
        setIsAlreadyEnrolled(Boolean(val));
      } catch (error) {
        console.error('Error checking enrollment:', error);
        setIsAlreadyEnrolled(false);
      }
    };
    checkUserEnrollment();
  }, [user, id]);

  // Fetch feedbacks for this course
  const fetchFeedbacks = async () => {
    if (!id) return;
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const response = await getFeedback(id);
      const data = response?.data ?? response;
      setFeedbacks(Array.isArray(data) ? data : []);
      // detect if current user already submitted feedback (if studentId present in DTO)
      if (user && Array.isArray(data)) {
        const already = data.some(f => String(f.studentId) === String(user.id));
        setUserHasSubmitted(already);
      }
    } catch (err) {
      console.error('Error loading feedbacks', err);
      setFeedbackError('Failed to load feedbacks');
      setFeedbacks([]);
    } finally {
      setFeedbackLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [id, user, isAlreadyEnrolled]);

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getTotalLessons = () => {
    if (!Array.isArray(chapters)) return 0;
    return chapters.reduce((total, chapter) => {
      return total + (Array.isArray(chapter.lessons) ? chapter.lessons.length : 0);
    }, 0);
  };

  const getShortDescription = (description) => {
    if (!description || typeof description !== 'string') return '';
    return description.replace(/\s/g, '').length > 100
      ? description.substring(0, 120) + '...'
      : description;
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error("You must be logged in to enroll");
      return;
    }
    setEnrollLoading(true);
    setEnrollError(null);
    try {
      const result = await enrollCourse(user.id, id);
      const data = result?.data ?? result;
      if (data?.status === 'success' || data === 'success' || result.status === 'success') {
        setIsAlreadyEnrolled(true);
        toast.success('Enrollment successful!');
        // refresh feedbacks (maybe now they can submit)
        fetchFeedbacks();
      } else {
        const msg = data?.message || result?.message || 'Enrollment failed';
        setEnrollError(msg);
      }
    } catch (error) {
      setEnrollError(error.message || 'Enrollment failed');
    } finally {
      setEnrollLoading(false);
    }
  };

const handleSubmitFeedback = async () => {
  if (!user) {
    toast.error('Please login to submit feedback.');
    return;
  }
  if (!isAlreadyEnrolled) {
    toast.error('Only students who purchased the course can submit feedback.');
    return;
  }
  if (ratingInput < 1 || ratingInput > 5) {
    toast.error('Please select a rating (1 to 5 stars).');
    return;
  }
  if (!commentInput || commentInput.trim().length < 5) {
    toast.error('Please enter a comment (at least 5 characters).');
    return;
  }

  setFeedbackSubmitting(true);
  try {
    const feedbackData = {
      studentId: user.id,
      rating: ratingInput,
      comment: commentInput.trim(),
    };

    const response = await addFeedback(Number(id), feedbackData);

    // Refresh feedbacks and average rating
    await fetchFeedbacks();
    const avgResp = await getAverageRating(id);
    const avg = avgResp?.data ?? avgResp;
    setAverageRating(Number(avg || 0));
    setCommentInput('');
    setRatingInput(0);
    setUserHasSubmitted(true);
    toast.success('Thank you for your feedback!');
  } catch (err) {
    console.error('Error submitting feedback', err);
    toast.error('Failed to submit feedback. Please try again later.');
  } finally {
    setFeedbackSubmitting(false);
  }
};


  const handleStarClick = (star) => {
    setRatingInput(star);
  };

  // Navigate to quiz page (only for enrolled students)
  const handleSolveQuiz = () => {
    // adjust route as per your app routing
    navigate(`/courses/${id}/quiz`);
  };

  return courseData ? (
    <div className="relative bg-background dark:bg-darkBackground text-gray-800 dark:text-gray-200 pt-20 md:px-36 px-6">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-10 bg-gradient-to-b from-cyan-100/70 dark:from-gray-800"></div>

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-white-600 bg-var(--color-bg)"
      >
        <FaArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-start relative z-10">
        {/* Left Column */}
        <div className="max-w-3xl w-full">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white">
            {courseData.courseTitle}
          </h1>

          <p className="pt-4 text-sm md:text-base text-gray-600 dark:text-gray-300">
            {getShortDescription(courseData.courseDescription)}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Published on: {formatDate(courseData.createdOn)}
          </p>

          <div className="flex items-center space-x-3 pt-3 text-sm">
            <p>{averageRating.toFixed(1)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={i < Math.floor(averageRating) ? assets.star : assets.star_blank} alt="star" className="w-4 h-4" />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 pt-1">
            Course by <span className="text-blue-600 dark:text-blue-400">{teacherName}</span>
          </p>

          {/* Course Structure */}
          <div className="pt-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Course Structure</h2>
            <div className="pt-5">
              {(!Array.isArray(chapters) || chapters.length === 0) && (
                <p className="text-gray-600 dark:text-gray-300">No chapters found.</p>
              )}
              {Array.isArray(chapters) && chapters.map((chapter, index) => (
                <div key={chapter.id} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 mb-2 rounded">
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          className={`transition-transform transform ${openSections[index] ? 'rotate-180' : ''}`}
                          src={assets.down_arrow_icon}
                          alt="arrow"
                        />
                        <p className="font-medium text-sm md:text-base text-gray-800 dark:text-white">
                          {chapter.title}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 md:items-center text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        <p>
                          {chapter.lessons?.length || 0} lessons • Published on: {formatDate(chapter.createdOn)}
                        </p>
                        {chapter.resource && (
                          <a
                            href={`${config.serverUrl}/${chapter.resource}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 dark:text-blue-400 text-xs underline hover:no-underline"
                          >
                            Download Resource
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="pl-5 pr-4 py-2 text-gray-600 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600">
                      
                     {chapter.lessons?.map((lesson) => {
  // Decide if lesson is visible to the user
  const canViewLesson = isAlreadyEnrolled || lesson.available;

  if (!canViewLesson) {
    // If not allowed, show lesson title but no preview button or a disabled preview
    return (
      <li key={lesson.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-1 opacity-50 cursor-not-allowed">
        <div className="flex gap-2 items-start">
          <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1" />
          <div>
            <p className="text-sm md:text-base">{lesson.title} (Restricted)</p>
            <p className="text-xs text-gray-400">Published on: {formatDate(lesson.createdOn)}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 cursor-not-allowed select-none">Locked</p>
      </li>
    );
  }

  return (
    <li key={lesson.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-1">
      <div className="flex gap-2 items-start">
        <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1" />
        <div>
          <p className="text-sm md:text-base">{lesson.title}</p>
          <p className="text-xs text-gray-400">Published on: {formatDate(lesson.createdOn)}</p>
        </div>
      </div>
      {lesson.content && (
        <p
          className="text-blue-500 dark:text-blue-400 text-sm cursor-pointer"
          onClick={() => {
            const videoId = extractYouTubeVideoId(lesson.content);
            if (videoId) {
              setPlayerData({ videoId });
              setVideoLoading(true);
              setCurrentLesson(lesson);
              setCurrentChapterTitle(chapter.title);
            } else {
              toast.error('Invalid video URL');
            }
          }}
        >
          watch
        </p>
      )}
    </li>
  );
})}


                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="pt-16 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Course Description</h3>
            <div
              className="pt-4 prose prose-sm md:prose-base max-w-none dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-li:marker:text-gray-500"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></div>
          </div>

          {/* Feedback Section */}
          <div className="pt-10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Student Feedback</h3>

            <div className="mt-4">
              <div className="flex items-center gap-3">
                <p className="text-2xl font-semibold">{averageRating.toFixed(1)}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={i < Math.round(averageRating) ? assets.star : assets.star_blank} alt="star" className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-2">({feedbacks.length} reviews)</p>
              </div>

              {/* Feedback list */}
              <div className="mt-4 space-y-3">
                {feedbackLoading && <p className="text-gray-500">Loading feedbacks...</p>}
                {feedbackError && <p className="text-red-500">{feedbackError}</p>}
                {!feedbackLoading && feedbacks.length === 0 && (
                  <p className="text-gray-500">No feedback yet. Be the first to review this course!</p>
                )}
                {!feedbackLoading && feedbacks.map((f) => (
                  <div key={f.id || `${f.studentId}-${f.courseId}`} className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">
                          {f.studentName || f.studentFullName || `Student #${f.studentId}`}
                        </p>
                        <p className="text-xs text-gray-400">{formatDate(f.createdOn || f.updatedOn)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <img key={i} src={i < f.rating ? assets.star : assets.star_blank} alt="star" className="w-4 h-4" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{f.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback form (only for enrolled students) */}
            <div className="mt-6">
              {isAlreadyEnrolled ? (
                userHasSubmitted ? (
                  <p className="text-sm text-gray-500">You have already submitted feedback for this course. Thank you!</p>
                ) : (
                  <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
                    <h4 className="font-semibold">Leave a review</h4>
                    <p className="text-sm text-gray-500 mt-1">Select stars and write your thoughts about the course.</p>

                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        {[1,2,3,4,5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleStarClick(s)}
                            className={`p-1 rounded ${ratingInput >= s ? 'scale-105' : ''} bg-transparent hover:bg-transparent`}
                            aria-label={`${s} star`}
                          >
                            <img src={ratingInput >= s ? assets.star : assets.star_blank} alt={`${s} star`} className="w-6 h-6" />
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        rows={4}
                        className="mt-3 w-full p-2 border rounded bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                        placeholder="Write your review..."
                      />

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={handleSubmitFeedback}
                          disabled={feedbackSubmitting}
                          className={`px-4 py-2 rounded font-semibold text-white ${feedbackSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                          {feedbackSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>

                        <button
                          onClick={() => { setRatingInput(0); setCommentInput(''); }}
                          type="button"
                          className="px-3 py-2 rounded text-sm border border-gray-300 dark:border-gray-600"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <p className="text-sm text-gray-500">Only students who purchased the course can leave feedback.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-[480px] shadow-lg rounded bg-white dark:bg-gray-900 overflow-hidden mb-8">
          <div className="w-full aspect-video relative bg-gray-100 dark:bg-gray-800">
            {videoLoading && playerData && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {playerData ? (
              <Youtube
                videoId={playerData.videoId}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full h-full"
                onReady={() => setVideoLoading(false)}
                onStateChange={(e) => {
                  if (e.data === 1) setVideoLoading(false);
                }}
              />
            ) : (
              <img
                src={courseData.courseThumbnail ? `${config.serverUrl}/${courseData.courseThumbnail}` : '/default-thumbnail.jpg'}
                alt="Course Thumbnail"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {currentLesson && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{currentChapterTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 pt-1">{currentLesson.title}</p>
            </div>
          )}

          <div className="p-5">
            <div className="flex items-center gap-3 pt-10">
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                {currency}{(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
              </p>
              <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                {currency}{courseData.coursePrice}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{courseData.discount}% off</p>
            </div>

            <div className="flex items-center text-sm gap-4 pt-3 text-gray-500 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star" />
                <p>{averageRating.toFixed(1)}</p>
              </div>

              <div className="h-4 w-px bg-gray-400/30"></div>

              <div className="flex items-center gap-1">
                <p><strong>{chapters.length}</strong> chapters</p>
              </div>

              <div className="h-4 w-px bg-gray-400/30"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson" />
                <p>{getTotalLessons()} lessons</p>
              </div>
            </div>

            {/* Enrollment Button or Message */}
            {isAlreadyEnrolled ? (
              <>
                <div className="text-green-600 dark:text-green-400 font-semibold text-center py-3">
                  You are enrolled in this course.
                </div>

                {/* Solve Quiz button visible only to enrolled students */}
                <button
                  onClick={handleSolveQuiz}
                  className="w-full mt-3 px-4 py-2 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Solve Quiz
                </button>
              </>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrollLoading}
                className={`w-full px-4 py-2 rounded-md font-semibold text-white ${
                  enrollLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {enrollLoading ? 'Enrolling...' : `Enroll Now`}
              </button>
            )}
            {enrollError && (
              <p className="text-red-600 dark:text-red-400 mt-2 text-sm text-center">{enrollError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default CourseDetails;
