import React from 'react';
import { FaLinkedin, FaGithub } from "react-icons/fa";

const stats = [
  { title: "Courses", value: 120 },
  { title: "Students", value: "25K+" },
  { title: "Teachers", value: 80 },
  { title: "Certificates Issued", value: "5K+" },
];

const teamMembers = [
  {
    name: "Aware Gaurav",
    image: "src/assets/gaurav.jpeg",
    links: {
      linkedin: "https://linkedin.com/in/gaurav-aware-109096284",
      github: "https://github.com/"
    }
  },
  {
    name: "Vedant Joshi",
    image: "src/assets/vedant.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/joshivedant/",
      github: "https://github.com/Vedantjoshi123"
    }
  },
  {
    name: "Abhishek Athare",
    image: "src/assets/abhishek.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/abhishekathare2002/",
      github: "https://github.com/AbhishekAthare"
    }
  },
   {
    name: "Tushar Chavan",
    image: "src/assets/tushar.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/tushar-chavan-a5b157268",
      github: "#"
    }
  }
];

const AboutUsSection = () => {
  return (
    <section className="bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] py-16 px-6 md:px-20">

      {/* Mission */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">About Us</h2>
        <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          We aim to make quality education accessible to everyone, everywhere. Our platform empowers learners through flexible, affordable, and engaging online courses designed by experts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-16">
        {stats.map((stat, index) => (
          <div key={index}>
            <h3 className="text-3xl font-bold text-[var(--color-primary)]">{stat.value}</h3>
            <p className="text-[var(--color-text-secondary)]">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="text-center py-10 my-10">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Meet the Team</h2>
        <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
          A team of enthusiasts combining technology and education to build impactful e-learning experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-6 max-w-6xl mx-auto">

          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[var(--color-bg)] p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={member.image}
                className="w-24 h-24 mx-auto rounded-full object-contain mb-4"
                alt={member.name}
              />
              <h3 className="text-l font text-[var(--color-text)]">{member.name}</h3>
              <div className="flex justify-center space-x-4 text-[var(--color-primary)] text-xl mt-2">
                <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
