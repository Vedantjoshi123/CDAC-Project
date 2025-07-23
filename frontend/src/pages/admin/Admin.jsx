import React from 'react'
import Testimonial from './Testimonial'
import AddTestimonial from './AddTestimonial'
import { Link, Outlet } from 'react-router-dom'

function Admin() {
  return (
   <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="flex gap-4 mb-4">
        <Link to="add-testimonial" className="text-blue-600 underline">Add Testimonial</Link>
        <Link to="" className="text-blue-600 underline">View Testimonials</Link>
      </div>

      <Outlet />
    </div>
  )
}

export default Admin