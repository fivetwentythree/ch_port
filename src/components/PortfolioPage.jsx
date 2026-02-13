import { useState } from 'react'
import './PortfolioPage.css'

export default function PortfolioPage({ content }) {
  const { project, experience } = content

  return (
    <main>
      <header className="content gap-1rem">
        <h1>
          <span className="bold">Chethana Maha Arachchillegedara</span>
        </h1>
        <p className="subheadline">Civil & Infrastructure Engineer | Project Management Professional</p>
        <p className="large">
          I bridge the gap between engineering excellence and entrepreneurial leadership. With a background in structural design (RMIT Honours) and a current specialization in Construction Management (Columbia University), I offer technical expertise backed by the resilience of a business founder.
        </p>
        <p className="large">
          If you wish to get in contact, drop me an email.
          <br />
          <a href="mailto:hello@example.com">chethana625@gmail.com</a>
          <a href="./cv.pdf" target="_blank" rel="noopener noreferrer" className="cv-button-inline">
            my cv
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </p>
      </header>

      <div className="content">
        <h2>Professional Experience</h2>
        {experience.map((job, i) => (
          <ExperienceItem key={i} job={job} />
        ))}
      </div>

    </main>
  )
}

function ExperienceItem({ job }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`experience-item ${isOpen ? 'active' : ''}`}>
      <div className="company-card-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-column">
          <h3>{job.company}</h3>
        </div>
        <div className="flex-row">
          <p className="small">{job.role} · {job.location}</p>
          <p className="small grey">{job.period}</p>
        </div>
      </div>
      <div className="experience-details">
        <div className="experience-details-inner">
          <ul className="contribution-list">
            {job.contributions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

