import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import Youtube from 'react-youtube';
import { getAverageRating } from '../../services/feedbackService';
import { config } from '../../services/config';
import { getTeacherById } from '../../services/teacherService';
import { getChaptersByCourse } from '../../services/chapterService';
import { FaArrowLeft } from 'react-icons/fa';

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

  const {
    fetchAllCourses,
    allCourses,
    currency
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
      getAverageRating(found.id)
        .then(setAverageRating)
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
        setChapters(response.data || []);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };
    fetchChapters();
  }, [id]);

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

  return courseData ? (
    <div className="relative bg-background dark:bg-darkBackground text-gray-800 dark:text-gray-200 pt-20 md:px-36 px-6">
      <div className="absolute top-0 left-0 w-full h-[300px] -z-10 bg-gradient-to-b from-cyan-100/70 dark:from-gray-800"></div>

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-white-600 hover:underline"
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
                      {chapter.lessons?.map((lesson) => (
                        <li key={lesson.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-1">
                          <div className="flex gap-2 items-start">
                            <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1" />
                            <div>
                              <p className="text-sm md:text-base">{lesson.title}</p>
                              <p className="text-xs text-gray-400">Published on: {formatDate(lesson.createdOn)}</p>
                            </div>
                          </div>
                          {lesson.available && (
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
                                  alert('Invalid video URL');
                                }
                              }}
                            >
                              Preview
                            </p>
                          )}
                        </li>
                      ))}
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

            <button className="mt-6 w-full py-3 rounded text-white font-medium transition bg-[var(--color-primary)] hover:bg-[#005B3B]">
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default CourseDetails;
