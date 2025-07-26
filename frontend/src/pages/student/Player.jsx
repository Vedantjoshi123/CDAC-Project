import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';
import { getFeedback, addFeedback } from '../../services/feedbackService';
import { formatDistanceToNow } from 'date-fns';


const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const { user } = useContext(AppContext);
  

  // const getCourseData = () => {
  //   enrolledCourses.forEach((course) => {
  //     if (course._id === courseId) {
  //       setCourseData(course);
  //     }
  //   });
  // };
  const getCourseData = () => {
    const course = enrolledCourses.find(course => course._id === courseId);
    if (course) {
      setCourseData(course);
    }
  };


  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    console.log(newRating);

    if (newRating === 0) {
      alert("Please give a rating.");
      return;
    }
    if (newComment.trim() === '') {
      alert("Please enter a comment.");
      return;
    }

    const newFeedback = {
      rating: newRating,
      comment: newComment,
      userId: user?.id,
      courseId: courseId,
    };


    try {
      const savedFeedback = await addFeedback(courseId, newFeedback);
      setFeedbackList((prev) => [savedFeedback, ...prev]);
      setNewRating(0);
      setNewComment('');
    } catch (error) {
      alert("Failed to submit feedback.");
      console.error(error);
    }

  };

  // useEffect(() => {
  //   getCourseData();
  // }, [enrolledCourses]);
  useEffect(() => {
    async function fetchFeedbackData() {
      try {
        const data = await getFeedback(courseId);
        console.log(data);

        // SAFETY CHECK
        if (Array.isArray(data)) {
          setFeedbackList(data);
        } else {
          console.warn('Expected an array, but got:', data);
          setFeedbackList([]); // fallback
        }
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
        setFeedbackList([]); // fallback
      }

    }

    getCourseData();
    if (courseId) {
      fetchFeedbackData();
    }
  }, [courseId, enrolledCourses]);

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
        <div className='left-column flex flex-col space-y-8'>
          <div className='course-section'>
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
                          className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''
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
                      className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'
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
          </div>

          <div className='feedback-section'>
            {/* <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course</h1>
            <Rating initialRating={0} />
          </div> */}
            <div
              className="w-96 flex-shrink-0 border-l pl-6 max-h-[70vh] overflow-y-auto"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h3 className="text-lg font-semibold mb-4">Leave Your Feedback</h3>

              <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3 mb-6">
                <label className="flex items-center gap-2">
                  <span>Rating:</span>
                  <Rating initialRating={newRating} onChange={setNewRating} />
                </label>

                <textarea
                  className="border rounded p-2"
                  placeholder="Write your comments here..."
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />

                <button
                  type="submit"
                  className="bg-[var(--color-primary)] text-white py-2 rounded hover:bg-[#005B3B] transition"
                >
                  Submit Feedback
                </button>
              </form>

              <div className="space-y-6">
                <h4 className="font-semibold text-lg">Previous Feedback</h4>
                {feedbackList.length === 0 && <p>No feedback yet.</p>}

                {/* {feedbackList.map((fb, i) => (
                  <div key={i} className="flex gap-4 items-start border-b pb-3">
                    <img src="/default-avatar.png" alt="User" className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">User #{fb.userId}</p>
                        <Rating initialRating={fb.rating} readonly />
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">{fb.comment}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {new Date(fb.date || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))} */}
                {feedbackList.map((fb, i) => (
  <div key={i} className="flex gap-4 items-start border-b pb-3">
    <img
      src={
        fb.userImage
          ? fb.userImage
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(fb.userName || 'User')}&background=6A1B9A&color=fff&rounded=true&size=128`
      }
      alt="User"
      className="w-10 h-10 rounded-full"
    />
    <div>
      <div className="flex items-center gap-2">
        <p className="font-semibold">{fb.userName || `User #${fb.userId}`}</p>
        <Rating initialRating={fb.rating} readonly />
      </div>
      {/* <p className="text-xs text-[var(--color-text-secondary)]">{fb.role || 'student'}</p> */}
      <p className="text-sm text-[var(--color-text-secondary)]">{fb.comment}</p>
      {/* <p className="text-xs text-[var(--color-text-secondary)]">
  {formatDistanceToNow(new Date(fb.date || Date.now()), { addSuffix: true })}
</p> */}
<p className="text-xs text-[var(--color-text-secondary)]">
  {fb.date
    ? formatDistanceToNow(new Date(fb.date), { addSuffix: true })
    : 'just now'}
</p>


    </div>
  </div>
))}


              </div>
            </div>
          </div>



        </div>

        {/* Right Column */}
        <div className="md:mt-10 right-column">
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
          ) : courseData?.courseThumbnail ? (
            <img
              src={courseData.courseThumbnail}
              alt="Course Thumbnail"
              className="rounded w-full object-cover"
              style={{ border: '1px solid var(--color-border)' }}
            />
          ) : (
            <div
              className="rounded w-full h-48 flex items-center justify-center"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
            >
              No Course Thumbnail
            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default Player;
