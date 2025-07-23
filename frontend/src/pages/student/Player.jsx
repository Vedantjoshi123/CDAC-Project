import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div
        className="p-4 sm:p-10 md:px-36 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 min-h-screen"
        style={{
          backgroundColor: 'var(--color-bg)',
          color: 'var(--color-text)',
        }}
      >
        {/* Left Column */}
        <div>
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="mb-2 rounded"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? 'rotate-180' : ''
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p
                        className="font-medium md:text-base text-sm"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p
                      className="text-sm md:text-default"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {chapter.chapterContent.length} lectures -{' '}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul
                      className="list-disc md:pl-10 pl-4 pr-4 py-2 border-t"
                      style={{
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          className="flex items-start gap-2 py-1"
                          key={i}
                          style={{ color: 'var(--color-text)' }}
                        >
                          <img
                            src={
                              false
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-xs md:text-sm">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  style={{
                                    color: 'var(--color-primary)',
                                    cursor: 'pointer',
                                  }}
                                >
                                  Watch
                                </p>
                              )}
                              <p style={{ color: 'var(--color-text-secondary)' }}>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ['h', 'm'] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p style={{ color: 'var(--color-text)' }}>
                  {playerData.chapter}.{playerData.lecture}{' '}
                  {playerData.lectureTitle}
                </p>
                <button
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff',
                    padding: '0.4rem 1rem',
                    borderRadius: '4px',
                    fontWeight: '600',
                    transition: 'background-color var(--transition-speed)',
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = '#005B3B')
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = 'var(--color-primary)')
                  }
                >
                  {false ? 'Completed' : 'Mark completed'}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={courseData ? courseData.courseThumbnail : ''}
              alt=""
              className="rounded w-full object-cover"
              style={{ border: '1px solid var(--color-border)' }}
            />
          )}
        </div>
      </div>

    </>
  );
};

export default Player;
