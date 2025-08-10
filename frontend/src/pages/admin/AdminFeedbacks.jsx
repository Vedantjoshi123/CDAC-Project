import React, { useEffect, useState } from 'react';
import { getAllFeedbacks } from '../../services/feedbackService';

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllFeedbacks() {
      try {
        const data = await getAllFeedbacks();
        setFeedbacks(data);
        // console.log("data"+data)
      } catch (err) {
        // console.log("no data"+data)

        setError('Failed to load feedback');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAllFeedbacks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Course Feedbacks</h2>

      {loading && <p>Loading feedback...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && feedbacks.length === 0 && (
        <p className="text-gray-500">No feedback found.</p>
      )}

      {!loading && feedbacks.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Comment</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr key={fb.id || index} className="text-sm">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{fb.courseId || 'N/A'}</td>
                  <td className="border px-4 py-2">{fb.userName || 'N/A'}</td>
                  <td className="border px-4 py-2">{fb.comment}</td>
                  <td className="border px-4 py-2">{fb.rating} / 5</td>
                  <td className="border px-4 py-2">
                    {fb.createdAt
                      ? new Date(fb.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbacks;
