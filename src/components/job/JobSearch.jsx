import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup, Button, Row, Col, Carousel, ListGroup } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Correct import for services
import * as IndustryService from "../../services/industry.service";
import WorkplaceService from '../../services/workplace.service';
import SearchJobService from '../../services/search_job.service';

const JobSearch = () => {
  const navigate = useNavigate();

  // State for search parameters and options
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    industry_id: '',
    workplace_id: ''
  });

  // State for dropdown options
  const [industries, setIndustries] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);

  // State for search suggestions
  const [suggestions, setSuggestions] = useState([]);

  // Fetch industries and workplaces on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch industries using the imported service
        const industriesData = await IndustryService.getAllIndustries();
        setIndustries(industriesData);

        // Fetch workplaces
        const workplacesData = await WorkplaceService.getAllWorkplace();
        setWorkplaces(workplacesData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Handle keyword search and suggestions
  const handleKeywordChange = async (e) => {
    const keyword = e.target.value;
    setSearchParams(prev => ({ ...prev, keyword }));

    if (keyword.length > 2) {
      try {
        // Fetch job suggestions based on keyword
        const suggestionsData = await SearchJobService.searchJobs(keyword);
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Perform filtered job search
      const filteredJobs = await SearchJobService.filterJobs({
        keyword: searchParams.keyword,
        industry_id: searchParams.industry_id,
        workplace_id: searchParams.workplace_id
      });

      // Pass data via navigate to JobOpportunities
      navigate('/job-opportunities', {
        state: {
          searchParams,
          jobs: filteredJobs
        }
      });

    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (job) => {
    // Navigate to job detail page
    navigate(`/job/${job.id}`);
    setSuggestions([]); // Clear suggestions
  };

  // Promotional slides (can be fetched from API in a real-world scenario)
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
              <img 
                className="d-block w-100" 
                src={slide.image} 
                alt={`Slide ${index + 1}`} 
                onClick={() => navigate(slide.link)}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Search Form */}
        <Form onSubmit={handleSearch} className="bg-white p-3 rounded-3 shadow">
          <Row className="g-2">
            {/* Keyword Search with Suggestions */}
            <Col lg={4} className="position-relative">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm Kiếm ..."
                  value={searchParams.keyword}
                  onChange={handleKeywordChange}
                />
              </InputGroup>
              {suggestions.length > 0 && (
                <ListGroup className="position-absolute w-100" style={{ zIndex: 1000 }}>
                  {suggestions.map(job => (
                    <ListGroup.Item 
                      key={job.id} 
                      action 
                      onClick={() => handleSuggestionSelect(job)}
                    >
                      {job.title} - {job.employer?.company_name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>

            {/* Industry Selection */}
            <Col lg={3}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaBriefcase />
                </InputGroup.Text>
                <Form.Select
                  value={searchParams.industry_id}
                  onChange={(e) => setSearchParams(prev => ({ 
                    ...prev, 
                    industry_id: e.target.value 
                  }))}>
                  <option value="">Ngành Nghề</option>
                  {industries.map(industry => (
                    <option key={industry.id} value={industry.id}>
                      {industry.industry_name}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Workplace Selection */}
            <Col lg={3}>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <FaMapMarkerAlt />
                </InputGroup.Text>
                <Form.Select
                  value={searchParams.workplace_id}
                  onChange={(e) => setSearchParams(prev => ({ 
                    ...prev, 
                    workplace_id: e.target.value 
                  }))}>
                  <option value="">Địa Điểm</option>
                  {workplaces.length > 0 ? (
                    workplaces.map(workplace => (
                      <option key={workplace.id} value={workplace.id}>
                        {workplace.city || workplace.location}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>Loading workplaces...</option>
                  )}
                </Form.Select>
              </InputGroup>
            </Col>

            {/* Search Button */}
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
