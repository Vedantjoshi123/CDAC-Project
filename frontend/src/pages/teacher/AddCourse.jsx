import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllCategories } from "../../services/categoryService"; // Adjust the path as needed

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeChapterIndex, setActiveChapterIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  const maxWords = 150;

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(null);
      
      try {
        const result = await getAllCategories();
        
        if (result.status === "success") {
          setCategories(result.data);
        } else {
          setCategoriesError(result.message);
          console.error("Failed to fetch categories:", result.message);
        }
      } catch (error) {
        setCategoriesError("Network error while fetching categories");
        console.error("Error fetching categories:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categories_dummy = [
    { id: 1, name: "Programming" },
    { id: 2, name: "Design" },
    { id: 3, name: "Marketing" },
  ];

  const handleThumbnailUpload = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount <= maxWords) {
      setDescription(text);
    }
  };

  const handleSubmitCourse = async () => {
    // Validate required fields
    if (!title || !description || !price || !discount || !thumbnail || !selectedCategory) {
      alert("Please fill in all required course fields");
      return;
    }

    if (chapters.length === 0) {
      alert("Please add at least one chapter");
      return;
    }

    // Validate chapters and lessons
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      if (!chapter.title.trim()) {
        alert(`Chapter ${i + 1} title is required`);
        return;
      }
      if (chapter.lessons.length === 0) {
        alert(`Chapter ${i + 1} must have at least one lesson`);
        return;
      }
      for (let j = 0; j < chapter.lessons.length; j++) {
        const lesson = chapter.lessons[j];
        if (!lesson.title.trim() || !lesson.videoUrl.trim()) {
          alert(`All lessons in Chapter ${i + 1} must have both title and video URL`);
          return;
        }
      }
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("thumbnail", thumbnail);
    formData.append("categoryId", selectedCategory);

    try {
      // Note: These API calls will fail until your backend is properly set up
      const addCourse = await axios.post("BASE_URL", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const courseId = addCourse.data.id;

      for (const chapter of chapters) {
        const chapterRes = await axios.post("/api/chapter", {
          title: chapter.title,
          courseId,
          pdfUrl: chapter.pdfUrl,
          isPreview: false,
          isAvailable: true,
        });
        const chapterId = chapterRes.data.id;

        for (const lesson of chapter.lessons) {
          await axios.post("/api/lesson", {
            title: lesson.title,
            content: lesson.videoUrl,
            chapterId,
            isPreview: lesson.isPreview,
            isAvailable: lesson.isAvailable,
          });
        }
      }

      alert("Course submitted successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setThumbnail(null);
      setChapters([]);
      setSelectedCategory("");
      setShowChapterModal(false);
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response?.status === 404) {
        alert("API endpoint not found. Please ensure your backend server is running and the API routes are properly configured.");
      } else if (error.code === "ERR_NETWORK" || error.message.includes("Network Error")) {
        alert("Network error. Please check if your backend server is running on the correct port.");
      } else {
        alert(`Failed to submit course: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Don't submit here anymore, just open the modal if not already open
    if (!showChapterModal) {
      setShowChapterModal(true);
    }
  };

  // Enhanced chapter management functions
  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${chapters.length + 1}`,
      lessons: [],
      pdfUrl: "",
    };
    setChapters([...chapters, newChapter]);
    setActiveChapterIndex(chapters.length);
  };

  const handleDeleteChapter = (index) => {
    const updated = chapters.filter((_, i) => i !== index);
    setChapters(updated);
    if (activeChapterIndex === index) setActiveChapterIndex(null);
    else if (activeChapterIndex > index) setActiveChapterIndex(activeChapterIndex - 1);
  };

  const updateChapterPdfUrl = (index, pdfUrl) => {
    const updated = [...chapters];
    updated[index].pdfUrl = pdfUrl;
    setChapters(updated);
  };

  const updateChapterTitle = (index, newTitle) => {
    const updated = [...chapters];
    updated[index].title = newTitle;
    setChapters(updated);
  };

 const handleAddLesson = (chapterIndex) => {
  const updated = [...chapters];
  updated[chapterIndex].lessons.push({ title: "", videoUrl: "", isAvailable: true, isPreview: false });
  setChapters(updated);
};


  const handleLessonChange = (chapterIndex, lessonIndex, field, value) => {
    const updated = [...chapters];
    updated[chapterIndex].lessons[lessonIndex][field] = value;
    setChapters(updated);
  };

  const deleteLesson = (chapterIndex, lessonIndex) => {
    const updated = [...chapters];
    updated[chapterIndex].lessons = updated[chapterIndex].lessons.filter(
      (_, i) => i !== lessonIndex
    );
    setChapters(updated);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "800px", margin: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <label>Select Category:</label>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
        <option value="">
          {categoriesLoading ? "Loading categories..." : "-- Choose a category --"}
        </option>
        {categoriesError ? (
          <option value="" disabled style={{ color: "red" }}>
            Error loading categories
          </option>
        ) : (
          categories.map((cat) => (
            <option key={cat.id || cat._id} value={cat.id || cat._id}>
              {cat.title || cat.name}
            </option>
          ))
        )}
      </select>
      {categoriesError && (
        <small style={{ color: "red", fontSize: "0.75rem" }}>
          {categoriesError}. Using fallback categories.
        </small>
      )}

      <h2>Add New Course</h2>

      <input type="text" placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Description (Max {maxWords} words):</label>
      <textarea
        rows="5"
        placeholder="Enter a short course description..."
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <small>
        Word count: {description.trim().split(/\s+/).filter(Boolean).length} / {maxWords}
      </small>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label>Course Price (₹):</label>
        <input
          type="number"
          placeholder="Enter course price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={() => {
            const val = parseFloat(price);
            if (isNaN(val) || val < 1) {
              alert("Price must be at least ₹1");
              setPrice("");
            } else {
              setPrice(val.toString());
            }
          }}
          required
        />

        <label>Discount (%)</label>
        <input
          type="number"
          placeholder="Enter discount percentage"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          onBlur={() => {
            const val = parseInt(discount);
            if (isNaN(val) || val < 0 || val > 100) {
              alert("Discount must be between 0 and 100%");
              setDiscount("");
            } else {
              setDiscount(val.toString());
            }
          }}
          required
        />
      </div>

      <label>Thumbnail:</label>
      <input type="file" accept="image/*" onChange={handleThumbnailUpload} required />

      <button type="button" onClick={() => setShowChapterModal(true)}>Manage Chapters</button>

      <button type="submit">Review & Submit Course</button>

      {showChapterModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#00000099",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              width: "700px",
              maxHeight: "90vh",
              overflowY: "auto",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3>Manage Chapters</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handleSubmitCourse}
                  style={{ 
                    background: "#28a745", 
                    color: "white", 
                    border: "none", 
                    padding: "0.5rem 1rem", 
                    borderRadius: "4px", 
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  DONE & SUBMIT
                </button>
                <button
                  type="button"
                  onClick={() => setShowChapterModal(false)}
                  style={{ background: "#f0f0f0", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
                >
                  Cancel
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddChapter}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                marginBottom: "1rem"
              }}
            >
              + Add Chapter
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    overflow: "hidden",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  {activeChapterIndex === index ? (
                    <div style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <input
                          type="text"
                          value={chapter.title}
                          onChange={(e) => updateChapterTitle(index, e.target.value)}
                          style={{
                            border: "1px solid #ccc",
                            padding: "0.5rem",
                            width: "100%",
                            marginRight: "0.5rem",
                            borderRadius: "4px"
                          }}
                          placeholder="Chapter Title"
                          required
                        />
                        <div style={{ display: "flex", gap: "0.25rem" }}>
                          <button
                            onClick={() => setActiveChapterIndex(null)}
                            style={{
                              background: "#f8f9fa",
                              border: "1px solid #ddd",
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.75rem"
                            }}
                            title="Collapse"
                          >
                            Collapse
                          </button>
                          <button
                            onClick={() => handleDeleteChapter(index)}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.75rem"
                            }}
                            title="Delete Chapter"
                          >
                            ❌
                          </button>
                        </div>
                      </div>

                      {/* PDF URL Field */}
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem", fontWeight: "500" }}>
                          Chapter Summary PDF (Optional):
                        </label>
                        <input
                          type="url"
                          value={chapter.pdfUrl}
                          onChange={(e) => updateChapterPdfUrl(index, e.target.value)}
                          style={{
                            border: "1px solid #ccc",
                            padding: "0.5rem",
                            width: "100%",
                            borderRadius: "4px"
                          }}
                          placeholder="https://example.com/chapter-summary.pdf"
                        />
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {chapter.lessons.map((lesson, lIndex) => (
                          <div key={lIndex} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.5rem", border: "1px solid #eee", borderRadius: "4px" }}>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                              <input
                                type="text"
                                value={lesson.title}
                                placeholder="Lesson Title"
                                onChange={(e) => handleLessonChange(index, lIndex, "title", e.target.value)}
                                style={{
                                  border: "1px solid #ccc",
                                  padding: "0.5rem",
                                  flex: 1,
                                  borderRadius: "4px"
                                }}
                                required
                              />
                              <button
                                onClick={() => deleteLesson(index, lIndex)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "0.75rem"
                                }}
                                title="Delete Lesson"
                              >
                                ❌
                              </button>
                            </div>
                            <input
                              type="url"
                              value={lesson.videoUrl}
                              placeholder="Video URL"
                              onChange={(e) => handleLessonChange(index, lIndex, "videoUrl", e.target.value)}
                              style={{
                                border: "1px solid #ccc",
                                padding: "0.5rem",
                                width: "100%",
                                borderRadius: "4px"
                              }}
                              required
                            />
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                <input
                                  type="checkbox"
                                  checked={lesson.isAvailable}
                                  onChange={(e) => handleLessonChange(index, lIndex, "isAvailable", e.target.checked)}
                                  title="Is Available"
                                  id={`available-${index}-${lIndex}`}
                                />
                                <label htmlFor={`available-${index}-${lIndex}`} style={{ fontSize: "0.75rem" }}>Available</label>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                <input
                                  type="checkbox"
                                  checked={lesson.isPreview}
                                  onChange={(e) => handleLessonChange(index, lIndex, "isPreview", e.target.checked)}
                                  title="Is Preview"
                                  id={`preview-${index}-${lIndex}`}
                                />
                                <label htmlFor={`preview-${index}-${lIndex}`} style={{ fontSize: "0.75rem" }}>Preview</label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleAddLesson(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#007bff",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          marginTop: "0.5rem"
                        }}
                      >
                        + Add Lesson
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#f8f9fa",
                        padding: "1rem",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ fontWeight: "600", fontSize: "0.875rem" }}>
                        {chapter.title} ({chapter.lessons.length} lessons)
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button
                          onClick={() => setActiveChapterIndex(index)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.875rem"
                          }}
                          title="Edit Chapter"
                        >
                          🖉
                        </button>
                        <button
                          onClick={() => handleDeleteChapter(index)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.75rem"
                          }}
                          title="Delete Chapter"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddCourse;