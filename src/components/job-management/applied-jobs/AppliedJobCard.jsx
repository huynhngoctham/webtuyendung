import React, { useState } from 'react';
import { Dropdown, Badge, OverlayTrigger, Tooltip, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GmailService from '../../../services/gmail.service';

const AppliedJobCard = ({ job }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [emailData, setEmailData] = useState({ email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

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

  const handleViewDetail = () => {
    // Navigate to JobDetail with the correct job ID from the news_id
    navigate(`/job/${job.news_id}`);
  };

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      await GmailService.sendEmailToEmployer(emailData);
      alert('Email đã được gửi thành công!');
      setShowModal(false);
    } catch (error) {
      alert('Gửi email thất bại: ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleShowModal = () => {
    setEmailData({ email: '', message: '' });
    setShowModal(true);
  };

  return (
    <>
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
              {/* <Dropdown.Item onClick={handleViewDetail}>
                <i className="bi bi-eye me-2"></i>Xem chi tiết
              </Dropdown.Item> */}
              <Dropdown.Item onClick={handleShowModal}>
                <i className="bi bi-envelope me-2"></i>Liên hệ NTD
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>

      {/* Modal Gửi Email */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Liên hệ Nhà Tuyển Dụng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Nhà Tuyển Dụng</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={emailData.email}
                onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Nhập nội dung liên hệ"
                value={emailData.message}
                onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={handleSendEmail}
            disabled={isSending || !emailData.email.trim() || !emailData.message.trim()}
          >
            {isSending ? 'Đang gửi...' : 'Gửi Email'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AppliedJobCard;