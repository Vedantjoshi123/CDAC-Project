import React, { useEffect, useRef, useState } from 'react'
import uniqid from "uniqid"
import Quill from "quill"
import { assets } from '../../assets/assets'
import { UploadCloud } from 'lucide-react'

const AddCourse = () => {

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("")
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter name")
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collpsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1
        }
        setChapters([...chapters, newChapter])
      }
    } else if (action === "remove") {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collpsed: !chapter.collpsed }
            : chapter
        )
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId)
      setShowPopup(true)
    } else if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1)
          }
          return chapter
        })
      )
    }
  }

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0
              ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
              : 1,
            lectureId: uniqid(),
          }
          chapter.chapterContent.push(newLecture)
        }
        return chapter
      })
    )
    setShowPopup(false)
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle submit
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow"
      })
    }
  }, [])

  return (
    <div
      className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 pt-8 pb-0'
      style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-xl w-full'>

        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder='Type here'
            className='outline-none md:py-2.5 py-2 px-3 rounded border'
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
            required
          />
        </div>

  <div className='flex flex-col gap-1'>
  <p>Course Description</p>
  <div
    ref={editorRef}
    className='ql-editor-container border rounded'
    style={{
      minHeight: '200px',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
      borderColor: 'var(--color-border)',
      padding: '10px'
    }}
  />
</div>


        <div className='flex items-center justify-between flex-wrap gap-4'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input
              type="number"
              onChange={e => setCoursePrice(e.target.value)}
              value={coursePrice}
              placeholder='0'
              className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border'
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
  <p>Course Thumbnail</p>
  <label
    htmlFor="thumbnailImage"
    className="flex md:flex-row flex-col items-center gap-4 p-3 border rounded cursor-pointer transition hover:bg-[var(--color-border)]"
    style={{
      backgroundColor: 'var(--color-bg)',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text)',
    }}
  >
    <div className="flex items-center gap-3">
      <UploadCloud className="w-6 h-6 text-[var(--color-text)]" />

      <span className="text-sm  text-[var(--color-text-secondary)]">
        {image ? "Change Thumbnail" : "Choose Image"}
      </span> 
    </div>

    <input
      type="file"
      id="thumbnailImage"
      onChange={(e) => setImage(e.target.files[0])}
      accept="image/*"
      hidden
    />

    {image && (
      <img
        src={URL.createObjectURL(image)}
        alt="Course Thumbnail"
        className="w-20 h-14 object-cover rounded border"
        style={{ borderColor: 'var(--color-border)' }}
      />
    )}
  </label>
</div>

        </div>

        <div className='flex flex-col gap-1'>
          <p className='text-[var(--color-text-secondary)]'>Discount %</p>
          <input
            type="number"
            onChange={e => setDiscount(e.target.value)}
            value={discount}
            min={0}
            max={100}
            placeholder='0'
            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border'
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
          />
        </div>

        {/* CHAPTERS */}
        <div className='w-full'>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className='border rounded-lg mb-4'
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <div className='flex justify-between items-center p-4 border-b' style={{ borderColor: 'var(--color-border)' }}>
                <div className='flex items-center'>
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    className={`mr-2 cursor-pointer transition-transform duration-300 ${chapter.collpsed ? '-rotate-90' : 'rotate-0'}`}
                    alt=""
                  />
                  <span className='font-semibold'>{chapterIndex + 1}. {chapter.chapterTitle}</span>
                </div>
                <span className='text-[var(--color-text-secondary)]'>{chapter.chapterContent.length} Lectures</span>
                <img onClick={() => handleChapter("remove", chapter.chapterId)} src={assets.cross_icon} alt="" className='cursor-pointer' />
              </div>
              {!chapter.collpsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -
                        <a href={lecture.lectureUrl} target='_blank' rel='noreferrer' className='text-blue-500'> Link</a> -
                        {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img src={assets.cross_icon} onClick={() => handleLecture("remove", chapter.chapterId, lectureIndex)} alt="" className='cursor-pointer' />
                    </div>
                  ))}
                  <div className='inline-flex bg-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white p-2 rounded cursor-pointer mt-2 text-sm transition' onClick={() => handleLecture("add", chapter.chapterId)}>+ Add Lecture</div>
                </div>
              )}
            </div>
          ))}
          <div
            className='flex justify-center items-center bg-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white transition p-2 rounded-lg cursor-pointer'
            onClick={() => handleChapter("add")}
          >
            + Add chapter
          </div>
        </div>

        {/* POPUP */}
        {showPopup && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50'>
            <div className='p-4 rounded relative w-full max-w-80' style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}>
              <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

              <div className='mb-2'>
                <p>Lecture Title</p>
                <input type="text" className='mt-1 block w-full border rounded py-1 px-2' style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} value={lectureDetails.lectureTitle} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} />
              </div>

              <div className='mb-2'>
                <p>Duration (minutes)</p>
                <input type="number" className='mt-1 block w-full border rounded py-1 px-2' style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} value={lectureDetails.lectureDuration} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} />
              </div>

              <div className='mb-2'>
                <p>Lecture Url</p>
                <input type="text" className='mt-1 block w-full border rounded py-1 px-2' style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }} value={lectureDetails.lectureUrl} onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} />
              </div>

              <div className='flex gap-2 my-4 items-center'>
                <p>Is Preview Free?</p>
                <input type="checkbox" className='scale-125' checked={lectureDetails.isPreviewFree} onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
              </div>

              <button type='button' className='w-full bg-[var(--color-primary)] hover:opacity-90 text-white px-4 py-2 rounded' onClick={addLecture}>Add</button>
              <img src={assets.cross_icon} onClick={() => setShowPopup(false)} className='absolute top-4 right-4 cursor-pointer' alt="" />
            </div>
          </div>
        )}

        <button
          type='submit'
          className='bg-[var(--color-primary)] hover:opacity-90 transition px-8 py-2.5 text-white font-medium rounded my-4'
        >
          ADD
        </button>
      </form>
    </div>
  )
}

export default AddCourse
