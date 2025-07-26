import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/common/Footer'
import ContactUs from '../common/ContactUs'
import AboutUsSection from '../common/AboutUs'


const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center bg-[var(--color-bg)] text-[var(--color-text)]'>
      <Hero/>
      <CoursesSection/>
      <Companies/>
      <TestimonialsSection/>
      <AboutUsSection/>
      <ContactUs/>
      {/* <CallToAction/> */}
    </div>
  )
}

export default Home
