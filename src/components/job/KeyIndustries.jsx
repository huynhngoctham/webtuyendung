import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllIndustries } from '../../services/industry.service'; // Import API service

const KeyIndustries = () => {
  const [industries, setIndustries] = useState([]); // Danh sách ngành nghề từ API
  const [currentPage, setCurrentPage] = useState(1);
  const industriesPerPage = 6; // Số lượng ngành nghề hiển thị mỗi trang

  // Lấy danh sách ngành nghề từ API khi component được mount
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const data = await getAllIndustries(); // Lấy dữ liệu từ API
        setIndustries(data); // Cập nhật danh sách ngành nghề vào state
      } catch (error) {
        console.error('Không thể tải danh sách ngành:', error);
      }
    };
    fetchIndustries();
  }, []);

  // Xử lý phân trang
  const indexOfLastIndustry = currentPage * industriesPerPage;
  const indexOfFirstIndustry = indexOfLastIndustry - industriesPerPage;
  const currentIndustries = industries.slice(indexOfFirstIndustry, indexOfLastIndustry);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(industries.length / industriesPerPage);

  return (
    <div className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">Ngành nghề trọng điểm</h3>
      </div>

      {/* Industry Listings */}
      <Row>
        {currentIndustries.map((industry) => (
          <Col key={industry.id} xs={12} sm={6} md={4} className="mb-3">
            <Card className="shadow-sm border-0 h-100 text-center">
              <Card.Body>
                <Card.Title className="fw-bold">{industry.industry_name}</Card.Title>
                <Link to={`/industries/${industry.id}`} className="btn btn-primary btn-sm mt-2">
                  Khám phá
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default KeyIndustries;
