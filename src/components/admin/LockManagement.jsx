import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { changeLockStatus, getAllEmployers } from '../../services/auth.service';

const LockManagement = () => {
  const [employerList, setEmployerList] = useState([]);
  const [filteredEmployerList, setFilteredEmployerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployerList();
  }, []);

  const fetchEmployerList = async () => {
    setLoading(true);
    try {
      const data = await getAllEmployers();
      setEmployerList(data);
      setFilteredEmployerList(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhà tuyển dụng:', error);
      // Không hiển thị thông báo lỗi khi gặp lỗi tải dữ liệu
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.trim() === '') {
      setFilteredEmployerList(employerList);
    } else {
      const filtered = employerList.filter((employer) =>
        employer.company_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEmployerList(filtered);
    }
  };

  const handleLockStatusChange = async (id, currentStatus) => {
    setLoading(true);
    try {
      const result = await changeLockStatus(id);

      if (result && result.message) {
        // Hiển thị thông báo thành công
        alert(result.message);

        // Cập nhật lại danh sách nhà tuyển dụng sau khi thay đổi trạng thái
        const updatedEmployers = employerList.map((employer) =>
          employer.id === id
            ? { ...employer, is_Lock: currentStatus === 0 ? 1 : 0 }  // Đảo ngược trạng thái khóa
            : employer
        );
        setEmployerList(updatedEmployers);
        setFilteredEmployerList(updatedEmployers); // Cập nhật danh sách đã lọc
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái khóa:', error);
      // Không hiển thị thông báo lỗi trong catch
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    window.location.href = '/admin/dashboard';
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
            <FaArrowLeft size={18} /> Quay lại
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <h3 className="text-success mb-4">Quản lý Trạng Thái Khóa Tài Khoản Nhà Tuyển Dụng</h3>

          <InputGroup className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <Form.Control
              placeholder="Tìm kiếm nhà tuyển dụng..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>

          {loading ? (
            <p>Đang tải dữ liệu...</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Tên công ty</th>
                  <th>Trạng thái khóa</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployerList.map((employer) => (
                  <tr key={employer.id}>
                    <td>{employer.id}</td>
                    <td>{employer.company_name}</td>
                    <td>{employer.is_Lock === 0 ? 'Đã khóa' : 'Chưa khóa'}</td>
                    <td>
                      <Button
                        variant={employer.is_Lock === 0 ? 'success' : 'warning'}
                        size="sm"
                        onClick={() => handleLockStatusChange(employer.id, employer.is_Lock)}
                      >
                        {employer.is_Lock === 0 ? 'Mở khóa' : 'Khóa'}
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredEmployerList.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      Không tìm thấy nhà tuyển dụng nào.
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

export default LockManagement;
