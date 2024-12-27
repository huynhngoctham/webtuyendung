import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button, ListGroup } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaHeart } from 'react-icons/fa'; // Import heart icon
import { useLocation, useNavigate } from 'react-router-dom';
import * as IndustryService from "../../services/industry.service";
import WorkplaceService from '../../services/workplace.service';
import SearchJobService from '../../services/search_job.service';
import JobService from '../../services/job.service';

const JobOpportunities = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    keyword: '',
    industry_id: '',
    workplace_id: '',
    experience: '',
    salary_range: '',
    job_level: '',
    education_level: '',
    job_type: ''
  });

  const [industries, setIndustries] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [favorites, setFavorites] = useState([]); // To store favorite job IDs

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const industriesData = await IndustryService.getAllIndustries();
        setIndustries(industriesData);

        const workplacesData = await WorkplaceService.getAllWorkplace();
        setWorkplaces(workplacesData);

        if (location.state && location.state.jobs) {
          const { searchParams, jobs } = location.state;
          setSearchParams(searchParams || {});
          setFilteredJobs(jobs || []);
        } else {
          const activeJobs = await JobService.getActiveRecruitments();
          setFilteredJobs(activeJobs);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [location.state]);

  const handleKeywordChange = async (e) => {
    const keyword = e.target.value;
    setSearchParams(prev => ({ ...prev, keyword }));

    if (keyword.length > 2) {
      try {
        const suggestionsData = await SearchJobService.getKeywordSuggestions(keyword);
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const jobs = await SearchJobService.filterJobs(searchParams);
      setFilteredJobs(jobs);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleSuggestionSelect = (job) => {
    navigate(`/job/${job.id}`);
    setSuggestions([]);
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const toggleFavorite = (jobId) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(jobId)
        ? prevFavorites.filter(id => id !== jobId)
        : [...prevFavorites, jobId];

      // After updating favorites, navigate to NotificationsPage
      navigate('/notifications', { state: { favorites: updatedFavorites } });
      return updatedFavorites;
    });
  };

  const renderJobDetails = (job) => {
    const companyName = job.employer?.company_name || 'Chưa có tên công ty';
    const salary = job.salary || 'Thỏa thuận';
    // const location = job.location || 'Không xác định';

    return `${companyName} | ${salary} `;
  };

  // Handle filter change
  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    const newSearchParams = { ...searchParams, [name]: value };
    setSearchParams(newSearchParams);

    try {
      const jobs = await SearchJobService.filterJobs(newSearchParams);
      setFilteredJobs(jobs); // Dynamically update job list based on selected filter
    } catch (error) {
      console.error('Error applying filter:', error);
    }
  };

  return (
    <div className="job-opportunities-section">
      <Container className="mt-4">
        {/* Job Search Section */}
        <div className="job-search-section bg-primary text-white py-3 mb-4 rounded-3">
          <Container>
            <Form onSubmit={handleSearch} className="bg-white p-3 rounded-3 shadow">
              <Row className="g-2">
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

                <Col lg={3}>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0">
                      <FaBriefcase />
                    </InputGroup.Text>
                    <Form.Select
                      name="industry_id"
                      value={searchParams.industry_id}
                      onChange={handleFilterChange}>
                      <option value="">Ngành Nghề</option>
                      {industries.map(industry => (
                        <option key={industry.id} value={industry.id}>
                          {industry.industry_name}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>

                <Col lg={3}>
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-end-0">
                      <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <Form.Select
                      name="workplace_id"
                      value={searchParams.workplace_id}
                      onChange={handleFilterChange}>
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

                <Col lg={2}>
                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: 'rgb(0, 123, 255)',
                      borderColor: 'rgb(0, 123, 255)',
                    }}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>

        {/* Filters Section */}
        <div className="filters-section mb-4">
          <Form>
            <Row className="g-2">
              {/* Filter Inputs */}
              <Col lg={2}>
                <Form.Select
                  name="experience"
                  value={searchParams.experience}
                  onChange={handleFilterChange}>
                  <option value="">Kinh Nghiệm</option>
                  <option value="chua">Chưa có kinh nghiệm</option>
                  <option value="duoi_1">Dưới 1 năm</option>
                  <option value="1">1 năm</option>
                  <option value="2">2 năm</option>
                  <option value="3">3 năm</option>
                  <option value="4">4 năm</option>
                  <option value="5">5 năm</option>
                  <option value="5+">5 năm trở lên</option>
                </Form.Select>
              </Col>

              <Col lg={2}>
                <Form.Select
                  name="salary_range"
                  value={searchParams.salary_range}
                  onChange={handleFilterChange}>
                  <option value="">Mức Lương</option>
                  <option value="1-5">1-5 triệu</option>
                  <option value="5-10">5-10 triệu</option>
                  <option value="10-15">10-15 triệu</option>
                  <option value="15-20">15-20 triệu</option>
                  <option value="20-25">20-25 triệu</option>
                  <option value="25-30">25-30 triệu</option>
                  <option value="30+">Trên 30 triệu</option>
                  <option value="thoathuan">Thỏa Thuận</option>
                </Form.Select>
              </Col>

              {/* More filters... */}
            </Row>
          </Form>
        </div>

        {/* Job Listings Section */}
        <Row>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <Col lg={4} key={job.id}>
                <Card className="mb-3 shadow-sm rounded-3">
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text>
                      {renderJobDetails(job)}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="link" onClick={() => handleJobClick(job.id)}>
                        Xem Chi Tiết
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => toggleFavorite(job.id)}
                        style={{ color: favorites.includes(job.id) ? 'red' : '' }}
                      >
                        <FaHeart />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>No jobs found</Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default JobOpportunities;
