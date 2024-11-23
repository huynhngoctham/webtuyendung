import React, { useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col, Carousel } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({ keyword: '', location: '', category: '' });

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchParams); // Truyền tham số tìm kiếm ra ngoài qua props
    console.log('Searching jobs with params:', searchParams);
  };

  // Danh sách các slide trong carousel
  const slides = [
    {
      image: 'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fboschgl_hrbn24_129117.png&w=1920&q=75',
      link: '/company/bosch',
    },
    {
      image: 'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fvinfast_hrbn424_129058.jpg&w=1920&q=75',
      link: '/company/vinfast',
    },
    {
      image: 'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fbeiersdorf_hrbn924_128551.jpg&w=1920&q=75',
      link: '/company/beiersdorf',
    },
  ];

  return (
    <div className="job-search-section bg-primary text-white py-4">
      <Container>
        {/* Carousel for promotional banners */}
        <Carousel className="mb-4">
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <Link to={slide.link}>
                <img className="d-block w-100" src={slide.image} alt={`Slide ${index + 1}`} />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Search Form */}
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
                  <option value="finance">Finance</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col lg={2}>
              <Button type="submit" variant="primary" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default JobSearch;
