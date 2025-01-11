import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner, ListGroup, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecruitmentService from "../../services/recruitment.service";

const JobList = () => {
  // State để lưu danh sách tin tuyển dụng và trạng thái tải
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm lấy danh sách tin tuyển dụng
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await RecruitmentService.fetchRecruitmentList();
      setJobs(response.data); // Giả sử dữ liệu trả về nằm trong 'data'
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tuyển dụng:', error);
      setLoading(false);
      setError('Không thể tải danh sách tin tuyển dụng.');
    }
  };

  // Hàm gọi API thay đổi trạng thái khóa tin tuyển dụng
  const changeLockStatus = async (jobId, currentStatus) => {
    try {
      // Gọi API để thay đổi trạng thái khóa
      const response = await RecruitmentService.changeLock({ newsid: jobId });
      if (response) {
        fetchJobs();  // Lấy lại danh sách tin tuyển dụng sau khi thay đổi trạng thái khóa
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái khóa:', error);
      setError('Không thể thay đổi trạng thái khóa tin tuyển dụng.');
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="my-4">Danh sách tuyển dụng</h1>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {jobs.map((job) => (
            <Col key={job.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={job.logo || '/path/to/default-logo.png'} 
                  alt={job.title} 
                />
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Text>
                    <strong>Công ty:</strong> {job.employer?.company_name || 'Chưa có tên công ty'}<br />
                    <strong>Địa chỉ:</strong> {job.employer?.address || 'Không có thông tin'}<br />
                    <strong>Lương:</strong> {job.salary || 'Thỏa thuận'}<br />
                    <strong>Hạn nộp:</strong> {job.deadline || 'Không có thông tin'}
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item><strong>Kinh nghiệm:</strong> {job.experience || 'Không yêu cầu'}</ListGroup.Item>
                    <ListGroup.Item><strong>Bằng cấp:</strong> {job.qualifications || 'Không yêu cầu'}</ListGroup.Item>
                    <ListGroup.Item><strong>Hình thức làm việc:</strong> {job.workingmodel || 'Không có thông tin'}</ListGroup.Item>
                  </ListGroup>
                  
                  <Button 
                    variant="warning" 
                    className="w-100" 
                    as={Link} 
                    to={`/employer/post-job`} 
                    state={{ recruitmentId: job.id }}
                  >
                    Sửa tin tuyển dụng
                  </Button>

                  {/* Thêm nút khóa */}
                  <Button 
                    variant={job.isActive ? "success" : "danger"} 
                    className="w-100 mt-3" 
                    onClick={() => changeLockStatus(job.id, job.isActive)}
                  >
                    {job.isActive ? "Khóa tin tuyển dụng" : "Mở khóa"}
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default JobList;
