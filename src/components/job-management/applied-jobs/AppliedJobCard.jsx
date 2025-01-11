import React from 'react';
import { Dropdown, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppliedJobCard = ({ job }) => {
  const navigate = useNavigate();

  const renderStatusBadge = (status) => {
    let variant;
    switch (status) {
      case 'Đã xem':
        variant = 'success';
        break;
      case 'Chưa xem':
        variant = 'warning';
        break;
      case 'Từ chối':
        variant = 'danger';
        break;
      default:
        variant = 'secondary';
    }
    return <Badge bg={variant} className="px-3 py-2">{status || 'Chưa xử lý'}</Badge>;
  };

  // Hàm điều hướng đến trang chi tiết công việc
  const handleViewDetail = () => {
    navigate(`/job/${job.id}`); // Điều hướng đến trang chi tiết với ID công việc
  };

  return (
    <tr className="align-middle">
      <td>
        <div>
          <div className="fw-bold text-primary">{job.news || 'Không xác định'}</div>
        </div>
      </td>
      <td>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Hồ sơ đã được gửi</Tooltip>}
        >
          <Badge bg="info" className="px-3 py-2">Đã gửi</Badge>
        </OverlayTrigger>
      </td>
      <td className="text-secondary">{new Date(job.send.created_at).toLocaleDateString()}</td>
      <td>{renderStatusBadge(job.send.status)}</td>
      <td>
        <Dropdown align="end">
          <Dropdown.Toggle variant="outline-primary" size="sm" className="text-uppercase fw-bold">
            Lựa chọn
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* Thêm lựa chọn để xem chi tiết công việc */}
            <Dropdown.Item onClick={handleViewDetail}>
              <i className="bi bi-eye me-2"></i>Xem chi tiết
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="bi bi-envelope me-2"></i>Liên hệ NTD
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default AppliedJobCard;
