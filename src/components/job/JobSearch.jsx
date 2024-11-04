import React, { useState } from 'react';
import { Container, Form, InputGroup, Button, Row, Col, Carousel } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for routing

const JobSearch = () => {
  const [searchParams, setSearchParams] = useState({ keyword: '', location: '', category: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching jobs with params:', searchParams);
  };

  // Define the slides with images and links
  const slides = [
    {
      image: 'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fboschgl_hrbn24_129117.png&w=1920&q=75',
     
      title: 'Explore New Career Opportunities',
      description: 'Find jobs that match your skills and passion.',
    },
    {
      image: 'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fvinfast_hrbn424_129058.jpg&w=1920&q=75',
      title: 'Join a Leading Company',
      description: 'Advance your career with us.',
    },
    {
      image: 'https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2Fbeiersdorf_hrbn924_128551.jpg&w=1920&q=75',
      title: 'Unlock Your Potential',
      description: 'Find opportunities that fit your passion.',
    },
  ];

  return (
    <div className="job-search-section bg-primary text-white py-3">
      <Container>
        <Carousel className="mb-3">
          {/* Carousel Items */}
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <Link to={slide.link}> {/* Wrap each image with a Link */}
                <img className="d-block w-100" src={slide.image} alt={`Slide ${index + 1}`} />
                <Carousel.Caption>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>

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
  );
};

export default JobSearch;
