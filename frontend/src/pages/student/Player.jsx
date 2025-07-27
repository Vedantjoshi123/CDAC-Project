import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';
import { getFeedback, addFeedback } from '../../services/feedbackService';
import { getStudentById } from '../../services/studentService';
import { formatDistanceToNow } from 'date-fns';
// ...imports remain unchanged

const Player = () => {
  const { enrolledCourses, calculateChapterTime, user } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  const getCourseData = () => {
    const course = enrolledCourses.find(c => c._id === courseId);
    if (course) setCourseData(course);
  };

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!newRating || !newComment.trim()) {
      alert('Please provide a rating and comment.');
      return;
    }

    const newFeedback = {
      rating: newRating,
      comment: newComment,
      studentId: user?.id,
      courseId: courseId,
    };

    try {
      const savedFeedback = await addFeedback(courseId, newFeedback);
      const studentDetails = await getStudentById(user?.id);

      setFeedbackList(prev => [
        {
          ...savedFeedback,
          userName: `${studentDetails.firstName} ${studentDetails.lastName}`,
          userImage: studentDetails.image,
        },
        ...prev,
      ]);
      setNewRating(0);
      setNewComment('');
    } catch (error) {
      alert('Failed to submit feedback.');
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchFeedbackData() {
      try {
        const data = await getFeedback(courseId);
        if (Array.isArray(data)) {
          const enrichedFeedback = await Promise.all(
            data.map(async fb => {
              try {
                const student = await getStudentById(fb.studentId);
                return {
                  ...fb,
                  userName: `${student.firstName} ${student.lastName}`,
                  userImage: student.image,
                };
              } catch {
                return fb;
              }
            })
          );
          setFeedbackList(enrichedFeedback);
        } else {
          setFeedbackList([]);
        }
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
        setFeedbackList([]);
      }
    }

    getCourseData();
    if (courseId) fetchFeedbackData();
  }, [courseId, enrolledCourses]);

  return (
    <div className="p-4 sm:p-10 md:px-36 flex flex-col min-h-screen gap-6 bg-[var(--color-bg)] text-[var(--color-text)]">

      {/* Main Content Section */}
      <div className="md:grid md:grid-cols-2 gap-10 flex flex-col-reverse">
        {/* Left Column */}
        <div className="flex flex-col space-y-8">
          {/* Course Title & Description */}
          {courseData && (
            <div className="space-y-2 border-b pb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{courseData.courseTitle}</h1>
              <div
                className="text-[var(--color-text-secondary)] text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              />
            </div>
          )}

          {/* Course Structure */}
          <div>
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData?.courseContent.map((chapter, index) => (
                <div key={index} className="mb-2 rounded border border-[var(--color-border)]">
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={() => toggleSection(index)}>
                    <div className="flex items-center gap-2">
                      <img className={`transition-transform ${openSections[index] ? 'rotate-180' : ''}`} src={assets.down_arrow_icon} alt="Toggle" />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default text-[var(--color-text-secondary)]">
                      {chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 border-t border-[var(--color-border)]">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="Play" className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-xs md:text-sm">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.lectureUrl && (
                                <p onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })} className="text-[var(--color-primary)] cursor-pointer">
                                  Watch
                                </p>
                              )}
                              <p className="text-[var(--color-text-secondary)]">{humanizeDuration(lecture.lectureDuration * 60000, { units: ['h', 'm'] })}</p>
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

          {/* Feedback Section */}
          <div className="w-full border-t pt-6 border-[var(--color-border)]">
            <h3 className="text-lg font-semibold mb-4">Leave Your Feedback</h3>
            <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3 mb-6">
              <label className="flex items-center gap-2">
                <span>Rating:</span>
                <Rating initialRating={newRating} onChange={setNewRating} />
              </label>
              <textarea className="border rounded p-2" placeholder="Write your comments here..." rows={4} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
              <button type="submit" className="bg-[var(--color-primary)] text-white py-2 rounded hover:bg-[#005B3B] transition">Submit Feedback</button>
            </form>

            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Previous Feedback</h4>
              {feedbackList.length === 0 && <p>No feedback yet.</p>}
              {feedbackList.map((fb, i) => (
                <div key={i} className="flex gap-4 items-start border-b pb-3">
                  <img
                    src={fb.userImage ? fb.userImage : `https://ui-avatars.com/api/?name=${encodeURIComponent(fb.userName || 'User')}&background=6A1B9A&color=fff&rounded=true&size=128`}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{fb.userName || `User #${fb.studentId}`}</p>
                      <Rating initialRating={fb.rating} readonly />
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{fb.comment}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {fb.date ? formatDistanceToNow(new Date(fb.date), { addSuffix: true }) : 'just now'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Video or Thumbnail) */}
        <div className="md:mt-10 space-y-4">
          {playerData ? (
            <div className="rounded-xl overflow-hidden border shadow-md border-[var(--color-border)]">
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="w-full aspect-video" />
              <div className="flex justify-between items-center px-4 py-2 bg-[var(--color-bg-secondary)]">
                <p className="text-sm md:text-base font-medium">{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className="bg-[var(--color-primary)] text-white py-1 px-3 rounded hover:bg-[#005B3B] transition">Mark completed</button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border shadow-md border-[var(--color-border)]">
              {courseData?.courseThumbnail ? (
                <img src={courseData.courseThumbnail} alt="Course Thumbnail" className="w-full object-cover aspect-video" />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-100 text-gray-500">
                  No Course Thumbnail
                </div>
              )}
            </div>
          )}

          {/* Instructor Info */}
          {courseData && (
            <div className="p-4 border rounded-xl shadow-sm border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <h4 className="text-lg font-semibold mb-1">Instructor</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">{courseData.teacherName || 'Unknown Instructor'}</p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2">Category: {courseData.category}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">Duration: {courseData.duration} hours</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
