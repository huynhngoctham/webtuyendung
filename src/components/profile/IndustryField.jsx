import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton, Row, Col, Table } from 'react-bootstrap';
import { getAllIndustries } from '../../services/industry.service';
import IndustryService from '../../services/industryfield.service';
import WorkplaceService from '../../services/workplace.service';  // Đảm bảo import workplace.service.js
import WorkplaceServicefile from '../../services/workplacefile.service';  // Đảm bảo import workplacefile.service.js

const IndustryField = () => {
  const [workplaces, setWorkplaces] = useState([]);  // Dữ liệu workplace từ dropdown
  const [industries, setIndustries] = useState([]);  // Dữ liệu ngành nghề
  const [selectedIndustry, setSelectedIndustry] = useState(null);  // Ngành nghề đã chọn
  const [selectedWorkplace, setSelectedWorkplace] = useState(null);  // Địa điểm làm việc đã chọn
  const [userIndustries, setUserIndustries] = useState([]);  // Ngành nghề của người dùng
  const [userWorkplaces, setUserWorkplaces] = useState([]);  // Địa điểm làm việc của người dùng

  // Lấy dữ liệu ban đầu
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const industriesData = await getAllIndustries();  // Lấy dữ liệu ngành nghề
        const workplacesData = await WorkplaceService.getAllWorkplace();  // Lấy dữ liệu workplace cho dropdown từ workplace.service.js
        setIndustries(industriesData);
        setWorkplaces(workplacesData);

        const userIndustriesData = await IndustryService.getAllIndustries();  // Ngành nghề của người dùng
        const userWorkplacesData = await WorkplaceServicefile.getAllWorkplace();  // Địa điểm làm việc của người dùng từ workplacefile.service.js
        setUserIndustries(userIndustriesData);
        setUserWorkplaces(userWorkplacesData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        alert('Không thể tải dữ liệu. Vui lòng thử lại.');
      }
    };

    fetchInitialData();
  }, []);

  // Handle industry selection
  const handleSelectIndustry = (industry) => {
    setSelectedIndustry(industry);
  };

  // Handle workplace selection
  const handleSelectWorkplace = (workplace) => {
    setSelectedWorkplace(workplace);
  };

  // Add industry
  const handleAddIndustry = async () => {
    if (!selectedIndustry) {
      alert("Vui lòng chọn ngành nghề");
      return;
    }

    try {
      const industryData = { 
        industry_id: selectedIndustry.id
      };
      await IndustryService.addIndustryProfile(industryData);
      
      // Refresh user industries
      const updatedUserIndustries = await IndustryService.getAllIndustries();
      setUserIndustries(updatedUserIndustries);
      
      alert("Thêm ngành nghề thành công!");
      setSelectedIndustry(null);
    } catch (error) {
      console.error('Lỗi khi thêm ngành nghề:', error);
      alert("Có lỗi xảy ra khi thêm ngành nghề");
    }
  };

  // Add workplace
  const handleAddWorkplace = async () => {
    if (!selectedWorkplace) {
      alert("Vui lòng chọn địa điểm làm việc");
      return;
    }

    try {
      const workplaceData = { 
        workplace_id: selectedWorkplace.id
      };
      await WorkplaceServicefile.addWorkplaceDetails(workplaceData);  // Dùng API từ workplacefile.service.js
      
      // Refresh user workplaces
      const updatedUserWorkplaces = await WorkplaceServicefile.getAllWorkplace();  // Dùng API từ workplacefile.service.js
      setUserWorkplaces(updatedUserWorkplaces);
      
      alert("Thêm địa điểm làm việc thành công!");
      setSelectedWorkplace(null);
    } catch (error) {
      console.error('Lỗi khi thêm địa điểm làm việc:', error);
      alert("Có lỗi xảy ra khi thêm địa điểm làm việc");
    }
  };

  // Delete industry
  const handleDeleteIndustry = async (industryId) => {
    try {
      await IndustryService.deleteIndustryProfile(industryId);
      
      // Refresh user industries
      const updatedUserIndustries = await IndustryService.getAllIndustries();
      setUserIndustries(updatedUserIndustries);
      
      alert("Xóa ngành nghề thành công!");
    } catch (error) {
      console.error('Lỗi khi xóa ngành nghề:', error);
      alert("Có lỗi xảy ra khi xóa ngành nghề");
    }
  };

  // Delete workplace
  const handleDeleteWorkplace = async (workplaceId) => {
    try {
      await WorkplaceServicefile.deleteWorkplaceDetails(workplaceId);  // Dùng API từ workplacefile.service.js
      
      // Refresh user workplaces
      const updatedUserWorkplaces = await WorkplaceServicefile.getAllWorkplace();  // Dùng API từ workplacefile.service.js
      setUserWorkplaces(updatedUserWorkplaces);
      
      alert("Xóa địa điểm làm việc thành công!");
    } catch (error) {
      console.error('Lỗi khi xóa địa điểm làm việc:', error);
      alert("Có lỗi xảy ra khi xóa địa điểm làm việc");
    }
  };

  // Get industry name by id
  const getIndustryName = (industryId) => {
    const industry = industries.find(ind => ind.id === industryId);
    return industry ? industry.industry_name : 'Ngành nghề không có tên';
  };

  // Get workplace name by id
  const getWorkplaceName = (workplaceId) => {
    const workplace = workplaces.find(wp => wp.id === workplaceId);
    return workplace ? workplace.city : 'Địa điểm không có tên';
  };

  return (
    <div className="mb-4">
      <h5 className="mb-4">Thông tin ngành nghề và địa điểm làm việc</h5>
      
      {/* Industry Selection and Add */}
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
            <Button variant="success" className="ms-2 mt-2" onClick={handleAddIndustry}>
              Thêm ngành nghề
            </Button>
          </Form.Group>

          {/* User Industries Table */}
          <Table>
            <tbody>
              {userIndustries.map((industry) => (
                <tr key={industry.id}>
                  <td>{getIndustryName(industry.industry_id)}</td>
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

        {/* Workplace Selection and Add */}
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
            <Button variant="success" className="ms-2 mt-2" onClick={handleAddWorkplace}>
              Thêm địa điểm làm việc
            </Button>
          </Form.Group>

          {/* User Workplaces Table */}
          <Table>
            <tbody>
              {userWorkplaces.map((workplace) => (
                <tr key={workplace.id}>
                  <td>{getWorkplaceName(workplace.workplace_id)}</td>
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
