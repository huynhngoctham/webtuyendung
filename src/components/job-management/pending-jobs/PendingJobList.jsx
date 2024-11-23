// PendingJobList.jsx
import React from 'react';
import PendingJobCard from './PendingJobCard';

const PendingJobList = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job, index) => (
        <PendingJobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default PendingJobList;
