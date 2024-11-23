import React from 'react';
import { Table, Dropdown } from 'react-bootstrap';

const AppliedJobCard = ({ job }) => {
  return (
    <tr>
      <td>
        <div>
          <div className="fw-bold">{job.jobTitle}</div>
          <div className="text-muted small">{job.company}</div>
        </div>
      </td>
      <td>{job.applicationStatus}</td>
      <td>{job.appliedDate}</td>
      <td>{job.viewStatus}</td>
      <td>
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-secondary" size="sm">
            Lựa chọn
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Xem chi tiết</Dropdown.Item>
            <Dropdown.Item>Liên hệ NTD</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default AppliedJobCard;