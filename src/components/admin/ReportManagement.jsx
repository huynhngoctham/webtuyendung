import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import reportService from '../../services/report.service'; // Import service để lấy danh sách báo cáo

const ReportManagement = () => {
  const [reportList, setReportList] = useState([]); // Danh sách báo cáo
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  // Lấy danh sách báo cáo khi component được mount
  useEffect(() => {
    fetchReportList();
  }, []);

  // Hàm lấy danh sách báo cáo từ API
  const fetchReportList = async () => {
    setLoading(true);
    try {
      const { data } = await reportService.getAllReports();
      setReportList(data); // Cập nhật danh sách báo cáo
    } catch (error) {
      console.error('Lỗi khi lấy danh sách báo cáo:', error);
      alert('Không thể tải danh sách báo cáo. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý nút "Trở về"
  const handleGoBack = () => {
    window.history.back(); // Quay lại trang trước đó
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col className="d-flex align-items-center">
          <Button
            variant="outline-success"
            className="d-flex align-items-center gap-2 px-3 py-2"
            onClick={handleGoBack}
          >
            <FaArrowLeft size={18} /> Trở về
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <h3 className="text-success mb-4">Quản lý báo cáo</h3>

          {/* Danh sách báo cáo */}
          {loading ? (
            <p>Đang tải danh sách báo cáo...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Nội dung báo cáo</th>
                  <th>Tên Người gửi</th>
                  <th>ID Tin tuyển dụng</th>
                </tr>
              </thead>
              <tbody>
                {reportList.map((reportData, index) => {
                  const { report, send } = reportData; // Lấy thông tin từ report và send
                  return (
                    <tr key={index}>
                      <td>{report?.id || 'N/A'}</td>
                      <td>{report?.content || 'Không có nội dung'}</td>
                      <td>{send?.name || 'Không xác định'}</td>
                      <td>{send?.recruitment_news_id || 'Không xác định'}</td>
                    </tr>
                  );
                })}
                {reportList.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      Không có báo cáo nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReportManagement;
