import React from 'react';
import { Table } from 'react-bootstrap';
import AppliedJobCard from './AppliedJobCard';

const appliedJobs = [
  {
    id: 1,
    jobTitle: "Kỹ Sư Công Nghệ Thông Tin (Kỹ Sư IT) - Chuyên Viên Quản Lý Dự Án",
    company: "Công Ty Cổ Phần Cơ Khí Xây Dựng Biển Việt",
    applicationStatus: "Hồ sơ nộp nhanh",
    appliedDate: "04/11/2024",
    viewStatus: "Hồ sơ đã được xem"
  }
];

const AppliedJobList = () => {
  return (
    <Table hover className="align-middle">
      <thead>
        <tr>
          <th>Tên việc làm</th>
          <th>Hồ sơ ứng tuyển</th>
          <th>Ngày nộp</th>
          <th>Trạng thái</th>
          <th>Phản hồi về NTD</th>
        </tr>
      </thead>
      <tbody>
        {appliedJobs.map(job => (
          <AppliedJobCard key={job.id} job={job} />
        ))}
      </tbody>
    </Table>
  );
};

export default AppliedJobList;