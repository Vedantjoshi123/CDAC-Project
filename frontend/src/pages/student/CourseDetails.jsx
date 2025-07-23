import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Youtube from "react-youtube";
import Footer from '../../components/common/Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    currency
  } = useContext(AppContext);

  useEffect(() => {
    const fetchCourseData = async () => {
      const found = allCourses.find(course => course._id === id);
      setCourseData(found);
    };
    fetchCourseData();
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getShortDescription = (htmlText) => {
    const plainText = htmlText.replace(/<[^>]+>/g, '');
    return plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
  };

  return courseData ? (
    <>
      <div className="relative bg-background dark:bg-darkBackground text-gray-800 dark:text-gray-200 pt-20 md:px-36 px-6">
        {/* Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-[300px] -z-10 bg-gradient-to-b from-cyan-100/70 dark:from-gray-800"></div>

        <div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-start relative z-10">
          {/* Left Column */}
          <div className="max-w-3xl w-full">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-white">
              {courseData.courseTitle}
            </h1>

            <p className="pt-4 text-sm md:text-base text-gray-600 dark:text-gray-300">
              {getShortDescription(courseData.courseDescription)}
            </p>

            <div className="flex items-center space-x-3 pt-3 text-sm">
              <p>{calculateRating(courseData)}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt="star" className="w-4 h-4" />
                ))}
              </div>
              <p className="text-blue-600 dark:text-blue-400">({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
              <p>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 pt-1">
              Course by <span className="text-blue-600 dark:text-blue-400 underline">Elon Musk</span>
            </p>

            <div className="pt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Course Structure</h2>
              <div className="pt-5">
                {courseData.courseContent.map((chapter, index) => (
                  <div key={`chapter-${index}`} className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 mb-2 rounded">
                    <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={() => toggleSection(index)}>
                      <div className="flex items-center gap-2">
                        <img className={`transition-transform transform ${openSections[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="arrow" />
                        <p className="font-medium text-sm md:text-base text-gray-800 dark:text-white">{chapter.chapterTitle}</p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                      </p>
                    </div>

                    <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="pl-5 pr-4 py-2 text-gray-600 dark:text-gray-300 border-t border-gray-300 dark:border-gray-600">
                        {chapter.chapterContent.map((lecture, i) => (
                          <li key={`lecture-${index}-${i}`} className="flex items-start gap-2 py-1">
                            <img src={assets.play_icon} alt="play" className="w-4 h-4 mt-1" />
                            <div className="flex justify-between w-full items-center text-xs md:text-sm">
                              <p>{lecture.lectureTitle}</p>
                              <div className="flex gap-3 items-center">
                                {lecture.isPreviewFree && (
                                  <p className="text-blue-500 dark:text-blue-400 cursor-pointer" onClick={() => setPlayerData({ videoId: lecture.lectureUrl.split('/').pop() })}>
                                    Preview
                                  </p>
                                )}
                                <p>{humanizeDuration(lecture.lectureDuration * 60000, { units: ['h', 'm'] })}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-16 text-sm md:text-base text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Course Description</h3>
              <div
                className="pt-4 prose prose-sm md:prose-base max-w-none dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-li:marker:text-gray-500"
                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              ></div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full sm:w-[420px] max-w-md shadow-lg rounded bg-white dark:bg-gray-900 overflow-hidden">
            {playerData ? (
              <Youtube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName="w-full aspect-video" />
            ) : (
              <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="w-full object-cover" />
            )}

            <div className="p-5">
              <div className="flex items-center gap-2">
                <img className="w-4" src={assets.time_left_clock_icon} alt="clock" />
                <p className="text-red-500">
                  <span className="font-medium">5 days</span> left at this price!
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <p className="text-2xl font-semibold text-gray-800 dark:text-white">
                  {currency}
                  {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
                </p>
                <p className="text-sm line-through text-gray-500 dark:text-gray-400">{currency}{courseData.coursePrice}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{courseData.discount}% off</p>
              </div>

              <div className="flex items-center text-sm gap-4 pt-3 text-gray-500 dark:text-gray-300">
                <div className="flex items-center gap-1"><img src={assets.star} alt="star" /><p>{calculateRating(courseData)}</p></div>
                <div className="h-4 w-px bg-gray-400/30"></div>
                <div className="flex items-center gap-1"><img src={assets.time_clock_icon} alt="clock" /><p>{calculateCourseDuration(courseData)}</p></div>
                <div className="h-4 w-px bg-gray-400/30"></div>
                <div className="flex items-center gap-1"><img src={assets.lesson_icon} alt="lesson" /><p>{calculateNoOfLectures(courseData)} lessons</p></div>
              </div>

              <button className="mt-6 w-full py-3 rounded text-white font-medium transition">
                {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
              </button>

              <div className="pt-6">
                <p className="text-lg font-medium text-gray-800 dark:text-white">What's in the course?</p>
                <ul className="ml-4 pt-2 list-disc text-sm text-gray-500 dark:text-gray-300">
                  <li>Lifetime access with free updates</li>
                  <li>Step-by-step, hands-on project guidance</li>
                  <li>Downloadable resources with source files</li>
                  <li>Quizzes to test your knowledge</li>
                  <li>Certification of completion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Loading />;
};

export default CourseDetails;
