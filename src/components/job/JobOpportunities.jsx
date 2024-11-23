import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const JobOpportunities = () => {
  const [searchParams, setSearchParams] = useState({ keyword: '', location: '', category: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching jobs with params:', searchParams);
  };

  const jobList = [
    {
      title: 'Chuyên Viên Tư Vấn Sản Phẩm (Telesales - Data Tiềm Năng Có Sẵn)',
      company: 'Công Ty TNHH MTV Healthpost',
      salary: '15 - 25 triệu',
      location: 'TP.HCM',
      urgent: true,
      feedbackTime: 'Phản hồi trong 48h',
    },
    {
      title: 'Trợ Lý Kế Toán Dịch Vụ',
      company: 'Công Ty TNHH Dịch Vụ Tư Vấn Và Đại Lý Thuế Anh Minh',
      salary: '12 - 18 triệu',
      location: 'TP.HCM',
      urgent: true,
      feedbackTime: 'Phản hồi trong 48h',
    },
  ];

  return (
    <Container className="mt-4">
      {/* Job Search Section */}
      <div className="job-search-section bg-primary text-white py-3 mb-4 rounded-3">
        <Container>
          <Form onSubmit={handleSearch} className="bg-white p-3 rounded-3 shadow">
            <Row className="g-2">
              <Col lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchParams.keyword}
                    onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                  />
                </InputGroup>
              </Col>
              <Col lg={3}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Select
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  >
                    <option value="">All Locations</option>
                    <option value="hanoi">Hanoi</option>
                    <option value="hcm">Ho Chi Minh City</option>
                    <option value="danang">Da Nang</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col lg={3}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <FaBriefcase />
                  </InputGroup.Text>
                  <Form.Select
                    value={searchParams.category}
                    onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                  >
                    <option value="">All Categories</option>
                    <option value="it">IT</option>
                    <option value="marketing">Marketing</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col lg={2}>
                <Button type="submit" variant="primary" className="w-100">Search</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      {/* Bộ lọc việc làm */}
      <Row className="mb-4">
        <Col md={10}>
          <Row>
            {['Tuyển gấp', 'Kinh nghiệm', 'Mức lương', 'Cấp bậc', 'Trình độ', 'Loại công việc'].map((filter, index) => (
              <Col md={2} key={index}>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id={`dropdown-${index}`}>
                    {filter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/">Tất cả</Dropdown.Item>
                    <Dropdown.Item href="#/">Tùy chọn 1</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={2}>
          <Form.Select>
            <option>Phù hợp nhất</option>
            <option>Mới nhất</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Tiêu đề */}
      <h4 className="mb-4">
        Tuyển dụng <strong>15,557 việc làm</strong> mới nhất năm 2024
      </h4>

      {/* Danh sách công việc */}
      {jobList.map((job, index) => (
        <Card className="mb-3 shadow-sm" key={index}>
          <Card.Body>
            <Row>
              <Col md={2} className="d-flex align-items-center">
                {job.urgent && <Badge bg="danger" className="p-2">GẤP</Badge>}
              </Col>
              <Col md={8}>
                <h5 className="mb-1">{job.title}</h5>
                <p className="mb-1">
                  <strong>{job.company}</strong> | {job.salary} | {job.location}
                </p>
              </Col>
              <Col md={2} className="text-end">
                <small className="text-muted">{job.feedbackTime}</small>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default JobOpportunities;
