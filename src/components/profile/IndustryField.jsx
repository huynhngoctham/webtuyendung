import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton, Row, Col, Table } from 'react-bootstrap';
import { getAllIndustries } from '../../services/industry.service';
import IndustryService from '../../services/industryfield.service';
import WorkplaceService from '../../services/workplace.service';
import WorkplaceServicefile from '../../services/workplacefile.service';

const IndustryField = () => {
  const [workplaces, setWorkplaces] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedWorkplace, setSelectedWorkplace] = useState(null);
  const [userIndustries, setUserIndustries] = useState([]);
  const [userWorkplaces, setUserWorkplaces] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedIndustryScore, setSelectedIndustryScore] = useState(null);
  const [selectedWorkplaceScore, setSelectedWorkplaceScore] = useState(null);

  const experienceOptions = [
    { value: "", label: "Kinh Nghiệm" },
    { value: "chua", label: "Chưa có kinh nghiệm" },
    { value: "duoi_1", label: "Dưới 1 năm" },
    { value: "1", label: "1 năm" },
    { value: "2", label: "2 năm" },
    { value: "3", label: "3 năm" },
    { value: "4", label: "4 năm" },
    { value: "5", label: "5 năm" },
    { value: "5+", label: "5 năm trở lên" }
  ];

  const scoreOptions = [
    { value: 10, label: "10 điểm" },
    { value: 5, label: "5 điểm" },
    { value: 2, label: "2 điểm" },
    { value: 1, label: "1 điểm" }
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const industriesData = await getAllIndustries();
        const workplacesData = await WorkplaceService.getAllWorkplace();
        setIndustries(industriesData);
        setWorkplaces(workplacesData);

        const userIndustriesData = await IndustryService.getAllIndustries();
        const userWorkplacesData = await WorkplaceServicefile.getAllWorkplace();
        setUserIndustries(userIndustriesData);
        setUserWorkplaces(userWorkplacesData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        alert('Không thể tải dữ liệu. Vui lòng thử lại.');
      }
    };

    fetchInitialData();
  }, []);

  const handleSelectIndustry = (industry) => {
    setSelectedIndustry(industry);
    setSelectedExperience("");
    setSelectedIndustryScore(null);
  };

  const handleSelectWorkplace = (workplace) => {
    setSelectedWorkplace(workplace);
    setSelectedWorkplaceScore(null);
  };

  const handleSelectExperience = (experience) => {
    setSelectedExperience(experience);
  };

  const handleSelectIndustryScore = (score) => {
    setSelectedIndustryScore(score);
  };

  const handleSelectWorkplaceScore = (score) => {
    setSelectedWorkplaceScore(score);
  };

  const handleAddIndustry = async () => {
    if (!selectedIndustry) {
      alert("Vui lòng chọn ngành nghề");
      return;
    }

    if (!selectedExperience) {
      alert("Vui lòng chọn kinh nghiệm");
      return;
    }

    if (selectedIndustryScore === null) {
      alert("Vui lòng chọn điểm");
      return;
    }

    try {
      const industryData = { 
        industry_id: selectedIndustry.id,
        experience: selectedExperience,
        score: selectedIndustryScore
      };
      await IndustryService.addIndustryProfile(industryData);
      
      const updatedUserIndustries = await IndustryService.getAllIndustries();
      setUserIndustries(updatedUserIndustries);
      
      alert("Thêm ngành nghề thành công!");
      setSelectedIndustry(null);
      setSelectedExperience("");
      setSelectedIndustryScore(null);
    } catch (error) {
      console.error('Lỗi khi thêm ngành nghề:', error);
      alert("Có lỗi xảy ra khi thêm ngành nghề");
    }
  };

  const handleAddWorkplace = async () => {
    if (!selectedWorkplace) {
      alert("Vui lòng chọn địa điểm làm việc");
      return;
    }

    if (selectedWorkplaceScore === null) {
      alert("Vui lòng chọn điểm");
      return;
    }

    try {
      const workplaceData = { 
        workplace_id: selectedWorkplace.id,
        score: selectedWorkplaceScore
      };
      await WorkplaceServicefile.addWorkplaceDetails(workplaceData);
      
      const updatedUserWorkplaces = await WorkplaceServicefile.getAllWorkplace();
      setUserWorkplaces(updatedUserWorkplaces);
      
      alert("Thêm địa điểm làm việc thành công!");
      setSelectedWorkplace(null);
      setSelectedWorkplaceScore(null);
    } catch (error) {
      console.error('Lỗi khi thêm địa điểm làm việc:', error);
      alert("Có lỗi xảy ra khi thêm địa điểm làm việc");
    }
  };

  const handleDeleteIndustry = async (industryId) => {
    try {
      await IndustryService.deleteIndustryProfile(industryId);
      
      const updatedUserIndustries = await IndustryService.getAllIndustries();
      setUserIndustries(updatedUserIndustries);
      
      alert("Xóa ngành nghề thành công!");
    } catch (error) {
      console.error('Lỗi khi xóa ngành nghề:', error);
      alert("Có lỗi xảy ra khi xóa ngành nghề");
    }
  };

  const handleDeleteWorkplace = async (workplaceId) => {
    try {
      await WorkplaceServicefile.deleteWorkplaceDetails(workplaceId);
      
      const updatedUserWorkplaces = await WorkplaceServicefile.getAllWorkplace();
      setUserWorkplaces(updatedUserWorkplaces);
      
      alert("Xóa địa điểm làm việc thành công!");
    } catch (error) {
      console.error('Lỗi khi xóa địa điểm làm việc:', error);
      alert("Có lỗi xảy ra khi xóa địa điểm làm việc");
    }
  };

  const getIndustryName = (industryId) => {
    const industry = industries.find(ind => ind.id === industryId);
    return industry ? industry.industry_name : 'Ngành nghề không có tên';
  };

  const getWorkplaceName = (workplaceId) => {
    const workplace = workplaces.find(wp => wp.id === workplaceId);
    return workplace ? workplace.city : 'Địa điểm không có tên';
  };

  const getExperienceLabel = (value) => {
    const option = experienceOptions.find(opt => opt.value === value);
    return option ? option.label : 'Không xác định';
  };

  return (
    <div className="mb-4">
      <h5 className="mb-4">Thông tin ngành nghề và địa điểm làm việc</h5>
      
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Chọn ngành nghề</Form.Label>
            <DropdownButton
              id="dropdown-industry"
              title={selectedIndustry ? selectedIndustry.industry_name : 'Chọn ngành nghề'}
              variant="outline-primary"
              onSelect={(industry) => handleSelectIndustry(JSON.parse(industry))}
              style={{ width: '100%' }}
            >
              {industries.length > 0 ? (
                industries.map((industry) => (
                  <Dropdown.Item key={industry.id} eventKey={JSON.stringify(industry)}>
                    {industry.industry_name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Không có ngành nghề</Dropdown.Item>
              )}
            </DropdownButton>

            {selectedIndustry && (
              <>
                <Form.Group className="mt-2">
                  <DropdownButton
                    id="dropdown-experience"
                    title={selectedExperience ? getExperienceLabel(selectedExperience) : "Chọn kinh nghiệm"}
                    variant="outline-primary"
                    style={{ width: '100%' }}
                  >
                    {experienceOptions.map((option) => (
                      <Dropdown.Item 
                        key={option.value} 
                        onClick={() => handleSelectExperience(option.value)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>

                <Form.Group className="mt-2">
                  <DropdownButton
                    id="dropdown-industry-score"
                    title={selectedIndustryScore !== null ? `${selectedIndustryScore} điểm` : "Chọn điểm"}
                    variant="outline-primary"
                    style={{ width: '100%' }}
                  >
                    {scoreOptions.map((option) => (
                      <Dropdown.Item 
                        key={option.value} 
                        onClick={() => handleSelectIndustryScore(option.value)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Form.Group>
              </>
            )}

            <Button variant="success" className="ms-2 mt-2" onClick={handleAddIndustry}>
              Thêm ngành nghề
            </Button>
          </Form.Group>

          <Table>
            <tbody>
              {userIndustries.map((industry) => (
                <tr key={industry.id}>
                  <td>{getIndustryName(industry.industry_id)}</td>
                  <td>{getExperienceLabel(industry.experience)}</td>
                  <td>{industry.score} điểm</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDeleteIndustry(industry.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Chọn địa điểm làm việc</Form.Label>
            <DropdownButton
              id="dropdown-workplace"
              title={selectedWorkplace ? selectedWorkplace.city : 'Chọn địa điểm làm việc'}
              variant="outline-primary"
              onSelect={(workplace) => handleSelectWorkplace(JSON.parse(workplace))}
              style={{ width: '100%' }}
            >
              {workplaces.length > 0 ? (
                workplaces.map((workplace) => (
                  <Dropdown.Item key={workplace.id} eventKey={JSON.stringify(workplace)}>
                    {workplace.city}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>Không có địa điểm làm việc</Dropdown.Item>
              )}
            </DropdownButton>

            {selectedWorkplace && (
              <Form.Group className="mt-2">
                <DropdownButton
                  id="dropdown-workplace-score"
                  title={selectedWorkplaceScore !== null ? `${selectedWorkplaceScore} điểm` : "Chọn điểm"}
                  variant="outline-primary"
                  style={{ width: '100%' }}
                >
                  {scoreOptions.map((option) => (
                    <Dropdown.Item 
                      key={option.value} 
                      onClick={() => handleSelectWorkplaceScore(option.value)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Form.Group>
            )}

            <Button variant="success" className="ms-2 mt-2" onClick={handleAddWorkplace}>
              Thêm địa điểm làm việc
            </Button>
          </Form.Group>

          <Table>
            <tbody>
              {userWorkplaces.map((workplace) => (
                <tr key={workplace.id}>
                  <td>{getWorkplaceName(workplace.workplace_id)}</td>
                  <td>{workplace.score} điểm</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => handleDeleteWorkplace(workplace.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default IndustryField;