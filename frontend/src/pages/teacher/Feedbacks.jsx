import React from 'react';

const dummyFeedbacks = [
  {
    courseId: 101,
    courseTitle: "Java Full Stack",
    feedbacks: [
      { id: 1, comment: "Great content!", rating: 5 },
      { id: 2, comment: "Well explained but needs more examples.", rating: 4 },
    ]
  },
  {
    courseId: 102,
    courseTitle: "Spring Boot with Microservices",
    feedbacks: [
      { id: 3, comment: "Too fast-paced for beginners.", rating: 3 },
      { id: 4, comment: "Loved the real-world projects.", rating: 5 },
    ]
  },
  {
    courseId: 103,
    courseTitle: "React with Tailwind",
    feedbacks: [
      { id: 5, comment: "UI section was awesome!", rating: 5 },
      { id: 6, comment: "Need deeper explanation of hooks.", rating: 4 },
    ]
  }
];

function Feedbacks() {
  return (
    <div className="p-4 text-default">
      <h2 className="text-2xl font-bold mb-4">Course-wise Feedbacks</h2>
      {dummyFeedbacks.map(course => (
        <div key={course.courseId} className="mb-6 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2 text-primary">{course.courseTitle}</h3>
          <ul className="space-y-2">
            {course.feedbacks.map(feedback => (
              <li key={feedback.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="italic">"{feedback.comment}"</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Rating: {feedback.rating} / 5</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Feedbacks;
