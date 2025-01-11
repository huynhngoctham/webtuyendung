import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import { updateEmployerAccount, getEmployerAccount } from '../../services/change_pass.service';

const ChangeEmployer = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    phone_number: '',
    address: '',
    company_size: '',
    email: '',
    password: '',
    discription: '',
    image: null, // Để ảnh mới
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        const data = await getEmployerAccount();
        setFormData({
          company_name: data.company_name || '',
          phone_number: data.phone_number || '',
          address: data.address || '',
          company_size: data.company_size || '',
          email: data.email || '',
          discription: data.discription || '',
          image: null, // Không cần ảnh khi chưa có
          password: '',
        });
        setPreviewImage(data.image_url || null); // Hiển thị ảnh cũ nếu có
      } catch (error) {
        setError(error);
      }
    };

    fetchEmployerData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const formDataToSend = new FormData();

    // Thêm tất cả các trường vào formData, bao gồm cả trường image nếu có
    Object.keys(formData).forEach((key) => {
      if (formData[key] || key !== 'image') {  // Đảm bảo không gửi image nếu nó null
        formDataToSend.append(key, formData[key]);
      }
    });

    // Kiểm tra xem có ảnh không và thêm vào FormData
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await updateEmployerAccount(formDataToSend); // Gửi POST yêu cầu tới đúng route
      setMessage(response.message); // Hiển thị thông báo thành công
    } catch (error) {
      setError(error); // Hiển thị lỗi nếu có
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Cập nhật tài khoản công ty</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên công ty</Form.Label>
              <Form.Control
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                pattern="0[0-9]{9}"
                title="Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quy mô công ty</Form.Label>
              <Form.Select
                name="company_size"
                value={formData.company_size}
                onChange={handleChange}
                required
              >
                <option value="">Chọn quy mô công ty</option>
                <option value="1-10">1-10 nhân viên</option>
                <option value="11-50">11-50 nhân viên</option>
                <option value="51-100">51-100 nhân viên</option>
                <option value="101-500">101-500 nhân viên</option>
                <option value="501+">501+ nhân viên</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu mới (để trống nếu không đổi)</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                name="discription"
                value={formData.discription}
                onChange={handleChange}
                rows={4}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ảnh công ty</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/jpg"
              />
              {previewImage && (
                <div className="mt-3 text-center">
                  <Image
                    src={previewImage}
                    rounded
                    fluid
                    style={{ maxWidth: '200px' }}
                    alt="Company preview"
                  />
                </div>
              )}
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Cập nhật
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeEmployer;
