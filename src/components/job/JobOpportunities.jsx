import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup, Button, ListGroup } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaHeart } from 'react-icons/fa';
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
  const [favorites, setFavorites] = useState([]);

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
          const activeJobs = await JobService.getMatchingJobs();
          setFilteredJobs(activeJobs);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [location.state]);

  // New useEffect for auto-filtering
  useEffect(() => {
    const autoFilter = async () => {
      try {
        let salary_min = null;
        let salary_max = null;
        
        if (searchParams.salary_range) {
          const [min, max] = searchParams.salary_range.split('-');
          if (min === '30+') {
            salary_min = 30000000;
          } else if (min !== 'thoathuan') {
            salary_min = parseInt(min) * 1000000;
            if (max) {
              salary_max = parseInt(max) * 1000000;
            }
          }
        }

        const searchParamsWithSalary = {
          ...searchParams,
          salary_min,
          salary_max
        };

        const jobs = await SearchJobService.filterJobs(searchParamsWithSalary);
        setFilteredJobs(jobs);
      } catch (error) {
        console.error('Error filtering jobs:', error);
      }
    };

    // Only trigger auto-filter if any filter parameter is set
    const hasFilters = Object.values(searchParams).some(value => value !== '');
    if (hasFilters) {
      autoFilter();
    }
  }, [searchParams]); // Run whenever searchParams changes

  const handleKeywordChange = async (e) => {
    const keyword = e.target.value;
    setSearchParams(prev => ({ ...prev, keyword }));

    if (keyword.length > 2) {
      try {
        const suggestionsData = await SearchJobService.searchJobs(keyword); // Using searchJobs here
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]); // Clear suggestions if keyword is too short
    }
  };

  // Keep the search button functionality as backup
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let salary_min = null;
      let salary_max = null;
      
      if (searchParams.salary_range) {
        const [min, max] = searchParams.salary_range.split('-');
        if (min === '30+') {
          salary_min = 30000000;
        } else if (min !== 'thoathuan') {
          salary_min = parseInt(min) * 1000000;
          salary_max = parseInt(max) * 1000000;
        }
      }

      const searchParamsWithSalary = {
        ...searchParams,
        salary_min,
        salary_max
      };

      const jobs = await SearchJobService.filterJobs(searchParamsWithSalary);
      setFilteredJobs(jobs);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleSuggestionSelect = (job) => {
    navigate(`/job/${job.id}`);
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const toggleFavorite = (jobId) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.includes(jobId) 
        ? prevFavorites.filter(id => id !== jobId) 
        : [...prevFavorites, jobId];
  
      navigate('/notifications', { state: { favorites: updatedFavorites } });
      return updatedFavorites;
    });
  };

  const renderJobDetails = (job) => {
    const companyName = job?.employer?.company_name || 
                       job?.employer?.name || 
                       "Chưa có tên công ty";
  
    const formatSalary = (salary) => {
      return salary
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(salary)
        : "Thỏa thuận";
    };
  
    const salary = formatSalary(job.salary);
    
    
  
    return `${companyName} | ${salary}  `;  
  };
  

  const handleFilterChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
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
                      onChange={handleKeywordChange} // Updated handler
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
                      value={searchParams.industry_id}
                      onChange={(e) => handleFilterChange('industry_id', e.target.value)}>
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
                      value={searchParams.workplace_id}
                      onChange={(e) => handleFilterChange('workplace_id', e.target.value)}>
                      <option value="">Địa Điểm</option>
                      {workplaces.map(workplace => (
                        <option key={workplace.id} value={workplace.id}>
                          {workplace.city || workplace.location}
                        </option>
                      ))}
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
              <Col lg={2}>
                <Form.Select
                  value={searchParams.experience}
                  onChange={(e) => handleFilterChange('experience', e.target.value)}>
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
                  value={searchParams.salary_range}
                  onChange={(e) => handleFilterChange('salary_range', e.target.value)}>
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

              <Col lg={2}>
                <Form.Select
                  value={searchParams.job_level}
                  onChange={(e) => handleFilterChange('job_level', e.target.value)}>
                  <option value="">Cấp Bậc</option>
                  <option value="Quản lý cấp cao">Quản lý cấp cao</option>
                  <option value="Quản lý cấp trung">Quản lý cấp trung</option>
                  <option value="Quản lý nhóm-Giám sát">Quản lý nhóm-Giám sát</option>
                  <option value="Chuyên gia">Chuyên gia</option>
                  <option value="Chuyên viên-Nhân viên">Chuyên viên-Nhân viên</option>
                  <option value="Cộng tác viên">Cộng tác viên</option>
                </Form.Select>
              </Col>

              <Col lg={2}>
                <Form.Select
                  value={searchParams.education_level}
                  onChange={(e) => handleFilterChange('education_level', e.target.value)}>
                  <option value="">Trình Độ Học Vấn</option>
                  <option value="Trên Đại Học">Trên Đại Học</option>
                  <option value="Đại Học">Đại Học</option>
                  <option value="Cao Đẳng">Cao Đẳng</option>
                  <option value="Trung Cấp">Trung Cấp</option>
                  <option value="Trung Học">Trung Học</option>
                  <option value="Chứng Chỉ">Chứng Chỉ</option>
                </Form.Select>
              </Col>

              <Col lg={2}>
                <Form.Select
                  value={searchParams.job_type}
                  onChange={(e) => handleFilterChange('job_type', e.target.value)}>
                  <option value="">Loại Công Việc</option>
                  <option value="Toàn thời gian">Toàn thời gian</option>
                  <option value="Bán thời gian">Bán thời gian</option>
                  <option value="freelance">Freelance</option>
                  <option value="Làm việc từ xa">Làm việc từ xa</option>
                  <option value="Thời vụ">Thời vụ</option>
                  <option value="Thực Tập">Thực Tập</option>
                </Form.Select>
              </Col>

              <Col lg={2} className="d-flex align-items-center">
                <Button
                  variant="warning"
                  className="w-100"
                  onClick={() => setSearchParams({
                    keyword: searchParams.keyword,
                    workplace_id: "",
                    industry_id: "",
                    experience: "",
                    salary_range: "",
                    job_level: "",
                    education_level: "",
                    job_type: "",
                  })}>
                  Xóa chọn
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

       {/* Job Listings Section */}
<div className="job-list mt-4">
  {filteredJobs.length > 0 ? (
    filteredJobs.map((job) => {
      // Thêm domain gốc nếu URL là đường dẫn tương đối
      const BASE_URL = 'http://127.0.0.1:8000/storage/';
      const logoUrl = job.employer?.image
        ? job.employer.image.startsWith('http')
          ? job.employer.image
          : `${BASE_URL}${job.employer.image}`
        : 'https://www.vinamilk.com.vn/static/tpl/dist/assets/images/global/logo.webp?v=070723';

      return (
        <Card key={job.id} className="mb-3 shadow-sm" onClick={() => handleJobClick(job.id)}>
          <Card.Body>
            <Row>
              <Col md={2} className="d-flex align-items-center">
                {console.log(logoUrl)} {/* Log kiểm tra URL */}
                <img
                  src={logoUrl}
                  alt="Logo công ty"
                  className="img-fluid"
                  style={{
                    width: '60px', // Thay đổi kích thước logo
                    height: '60px', // Đảm bảo logo là hình vuông
                    objectFit: 'contain', // Đảm bảo không cắt ảnh, giữ tỷ lệ
                    borderRadius: '5px', // Tạo góc bo tròn nhẹ
                  }}
                  onError={(e) => {
                    // Nếu URL ảnh bị lỗi, thay thế bằng logo mặc định
                    e.target.src =
                      'https://www.vinamilk.com.vn/static/tpl/dist/assets/images/global/logo.webp?v=070723';
                  }}
                />
                {job.urgent && <Badge bg="danger" className="p-2">GẤP</Badge>}
              </Col>
              <Col md={8}>
                <h5 className="mb-1">{job.title}</h5>
                <p className="mb-1">{renderJobDetails(job)}</p>
              </Col>
              <Card.Text className="text-success fw-bold">
  {job.salary
    ? new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
        .format(job.salary)
        .replace(/\s₫/, " VND") // Định dạng lại từ '₫' thành 'VND'
    : "Thỏa thuận"}
</Card.Text>

              <div className="d-flex justify-content-between mt-2">
                <small className="text-muted">
                  <i className="bi bi-briefcase me-1"></i>
                  {job.workingmodel}
                </small>
                <small className="text-muted">
                  <i className="bi bi-calendar-check me-1"></i>
                  {job.deadline}
                </small>
              </div>
            </Row>
            {/* Heart Icon Button for Favorites */}
            <Button
              variant="link"
              className="position-absolute top-0 end-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(job.id);
              }}
            >
              <FaHeart color={favorites.includes(job.id) ? 'red' : 'lightgray'} />
            </Button>
          </Card.Body>
        </Card>
      );
    })
  ) : (
    <p className="text-center">Không tìm thấy công việc phù hợp.</p>
  )}
</div>

      </Container>
    </div>
  );
};

export default JobOpportunities;