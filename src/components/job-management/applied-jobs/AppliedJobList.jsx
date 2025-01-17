// AppliedJobList.js
import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import SendService from '../../../services/send.service';
import AppliedJobCard from './AppliedJobCard';

const AppliedJobList = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    SendService.getSendNews()
      .then((data) => {
        setAppliedJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center mt-5">
        Không thể tải danh sách công việc: {error.message}
      </Alert>
    );
  }

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
        {appliedJobs.map((job, index) => (
          <AppliedJobCard key={index} job={job} />
        ))}
      </tbody>
    </Table>
  );
};

export default AppliedJobList;