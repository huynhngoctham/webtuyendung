import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const JobDetail = () => {
  const { jobId } = useParams(); // Get the jobId from the URL

  // Sample data - you would typically fetch this from an API
  const jobDetails = {
    title: 'Nhân Viên Quản Trị Web',
    company: 'Công Ty Cổ Phần Đầu Tư Đoàn Công Nghệ Trường Thành',
    salary: '12 - 15 triệu',
    description: 'Mô tả công việc',
    requirements: 'Yêu cầu công việc',
    location: 'Hà Nội',
    logo: 'LOGO',
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center">
          <img src={jobDetails.logo} alt="Company Logo" className="mr-3" />
          <h5>{jobDetails.title}</h5>
        </div>
      </Card.Header>
      <Card.Body>
        <p>Công ty: {jobDetails.company}</p>
        <p>Mức lương: {jobDetails.salary}</p>
        <p>Địa điểm: {jobDetails.location}</p>
        <hr />
        <h6>Mô tả công việc:</h6>
        <p>{jobDetails.description}</p>
        <h6>Yêu cầu công việc:</h6>
        <p>{jobDetails.requirements}</p>
        <Button variant="primary">Ứng tuyển</Button>
      </Card.Body>
    </Card>
  );
};

export default JobDetail;