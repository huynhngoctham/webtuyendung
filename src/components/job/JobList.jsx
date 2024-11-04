import React from 'react';
import { Row } from 'react-bootstrap';
import JobCard from './JobCard';

const JobList = ({ jobs }) => (
  <div className="job-list">
    <h2 className="mb-4"></h2>
    <Row className="g-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </Row>
  </div>
);

export default JobList;
