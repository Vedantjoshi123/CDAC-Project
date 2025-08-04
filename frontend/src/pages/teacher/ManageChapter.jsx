import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getChaptersByCourse,
  addChapter,
  deleteChapter,
  updateChapter
} from '../../services/chapterService';
import {
  getLessonsByChapter,
  addLesson,
  updateLesson,
  deleteLesson
} from '../../services/lessonService';
import { toast } from 'react-toastify';

const ManageChaptersPage = () => {
  const { courseId } = useParams();
  const [chapters, setChapters] = useState([]);
  const [chapterForm, setChapterForm] = useState({ title: '', resource: null });
  const [lessonForms, setLessonForms] = useState({});
  const [editChapterId, setEditChapterId] = useState(null);
  const [editLessonId, setEditLessonId] = useState(null);

  useEffect(() => {
    fetchChapters();
  }, [courseId]);

  const fetchChapters = async () => {
    const { status, data, message } = await getChaptersByCourse(courseId);
    if (status === 'success') {
      const enrichedChapters = await Promise.all(
        data.map(async (chapter) => {
          const res = await getLessonsByChapter(chapter.id);
          return {
            ...chapter,
            lessons: res.status === 'success' ? res.data : []
          };
        })
      );
      setChapters(enrichedChapters);
    } else {
      toast.error(message);
    }
  };

  const handleChapterChange = (e) => {
    const { name, value } = e.target;
    setChapterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChapterFileChange = (e) => {
    const file = e.target.files[0];
    setChapterForm(prev => ({ ...prev, resource: file }));
  };

  const handleLessonChange = (chapterId, e) => {
    const { name, value, type, checked } = e.target;
    setLessonForms(prev => ({
      ...prev,
      [chapterId]: {
        ...prev[chapterId],
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleChapterSubmit = async (e) => {
    e.preventDefault();
    if (!chapterForm.title.trim()) return toast.warn('Chapter title required');

    const formData = new FormData();
    formData.append('title', chapterForm.title);
    if (chapterForm.resource) {
      formData.append('resource', chapterForm.resource);
    }

    try {
      if (editChapterId) {
        const { status, message } = await updateChapter(editChapterId, formData);
        if (status === 'success') {
          toast.success('Chapter updated');
          setEditChapterId(null);
        } else {
          toast.error(message);
        }
      } else {
        const { status, message } = await addChapter(courseId, formData);
        if (status === 'success') {
          toast.success('Chapter added');
        } else {
          toast.error(message);
        }
      }
      setChapterForm({ title: '', resource: null });
      fetchChapters();
    } catch (error) {
      toast.error('Error while saving chapter');
    }
  };

  const handleEditChapter = (chapter) => {
    setEditChapterId(chapter.id);
    setChapterForm({
      title: chapter.title,
      resource: null
    });
  };

  const handleDeleteChapter = async (chapterId) => {
    if (window.confirm('Delete this chapter?')) {
      const { status, message } = await deleteChapter(chapterId);
      if (status === 'success') {
        toast.success('Chapter deleted');
        fetchChapters();
      } else {
        toast.error(message);
      }
    }
  };

  const handleLessonSubmit = async (chapterId) => {
    const form = lessonForms[chapterId];
    if (!form || !form.title?.trim() || !form.content?.trim()) {
      return toast.warn('Lesson title and content required');
    }

    try {
      if (editLessonId) {
        const { status, message } = await updateLesson(editLessonId, form);
        if (status === 'success') {
          toast.success('Lesson updated');
          setEditLessonId(null);
        } else {
          toast.error(message);
          return;
        }
      } else {
        const { status, message } = await addLesson(chapterId, form);
        if (status === 'success') {
          toast.success('Lesson added');
        } else {
          toast.error(message);
          return;
        }
      }

      setLessonForms(prev => ({
        ...prev,
        [chapterId]: { title: '', content: '', isAvailable: false }
      }));
      fetchChapters();
    } catch (error) {
      toast.error('Error while saving lesson');
    }
  };

  const handleEditLesson = (chapterId, lesson) => {
    setEditLessonId(lesson.id);
    setLessonForms(prev => ({
      ...prev,
      [chapterId]: {
        title: lesson.title,
        content: lesson.content,
        isAvailable: lesson.isAvailable
      }
    }));
  };

  const handleDeleteLesson = async (lessonId) => {
    if (window.confirm('Delete this lesson?')) {
      const { status, message } = await deleteLesson(lessonId);
      if (status === 'success') {
        toast.success('Lesson deleted');
        fetchChapters();
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Manage Chapters & Lessons</h2>

      {/* Chapter Add/Edit Form */}
      <form onSubmit={handleChapterSubmit} className="space-y-4 mb-8 border p-4 rounded bg-gray-50">
        <h3 className="font-semibold text-lg">{editChapterId ? 'Edit Chapter' : 'Add Chapter'}</h3>

        <input
          type="text"
          name="title"
          value={chapterForm.title}
          onChange={handleChapterChange}
          placeholder="Chapter Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="resource"
          onChange={handleChapterFileChange}
          className="w-full"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {editChapterId ? 'Update Chapter' : 'Add Chapter'}
        </button>
        {editChapterId && (
          <button
            type="button"
            className="ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={() => {
              setEditChapterId(null);
              setChapterForm({ title: '', resource: null });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Chapters and Lessons */}
      {chapters.map((chapter) => (
        <div key={chapter.id} className="border rounded p-4 mb-6 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold text-xl">{chapter.title}</h4>
              {chapter.resource ? (
                <a
                  href={`http://localhost:8080/${chapter.resource}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View Resource
                </a>
              ) : (
                <p className="text-sm italic text-gray-500">No resource uploaded</p>
              )}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditChapter(chapter)}
                className="px-3 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Edit Chapter
              </button>
              <button
                onClick={() => handleDeleteChapter(chapter.id)}
                className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete Chapter
              </button>
            </div>
          </div>

          {/* Lessons */}
          <div className="ml-4">
            <h5 className="font-semibold mb-2">Lessons</h5>

            {chapter.lessons.length === 0 && (
              <p className="italic text-gray-500 mb-2">No lessons added yet.</p>
            )}

            {chapter.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex justify-between items-center border p-2 rounded mb-2 bg-gray-50"
              >
                <div>
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-sm text-gray-700 truncate max-w-xl">{lesson.content}</p>
                  <p className="text-xs text-green-600">
                    {!!lesson.isAvailable ? 'Public' : 'Restricted'}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditLesson(chapter.id, lesson)}
                    className="px-2 py-1 text-xs rounded bg-yellow-400 text-white hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="px-2 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Add/Edit Lesson Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLessonSubmit(chapter.id);
              }}
              className="mt-4 space-y-2"
            >
              <input
                type="text"
                name="title"
                value={lessonForms[chapter.id]?.title || ''}
                onChange={(e) => handleLessonChange(chapter.id, e)}
                placeholder="Lesson Title"
                className="w-full p-2 border rounded"
              />
              <textarea
                name="content"
                value={lessonForms[chapter.id]?.content || ''}
                onChange={(e) => handleLessonChange(chapter.id, e)}
                placeholder="Lesson Content"
                className="w-full p-2 border rounded resize-y"
                rows={3}
              />
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={!!lessonForms[chapter.id]?.isAvailable}
                  onChange={(e) => handleLessonChange(chapter.id, e)}
                />
                <span>Public</span>
              </label>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editLessonId ? 'Update Lesson' : 'Add Lesson'}
                </button>
                {editLessonId && (
                  <button
                    type="button"
                    className="ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => {
                      setEditLessonId(null);
                      setLessonForms(prev => ({
                        ...prev,
                        [chapter.id]: { title: '', content: '', isAvailable: false }
                      }));
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageChaptersPage;
