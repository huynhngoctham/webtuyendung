// src/pages/AccountPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import Sidebar from '../components/layout/Sidebar'; // Import Sidebar

const AccountPage = () => {
    const [user, setUser] = useState({
        email: 'nguyentronlhl@gmail.com',
        fullName: 'tham huynh',
        birthDate: '',
        gender: '',
        maritalStatus: '',
        city: '',
        address: '',
        phone: '',
        avatar: null,
        avatarPreview: null, // For previewing the avatar image
    });

    const [errors, setErrors] = useState({}); // To store validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUser({
            ...user,
            avatar: file,
            avatarPreview: URL.createObjectURL(file), // Generate preview URL
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!user.fullName) newErrors.fullName = 'Họ và tên là bắt buộc';
        if (!user.birthDate) newErrors.birthDate = 'Ngày sinh là bắt buộc';
        if (!user.gender) newErrors.gender = 'Giới tính là bắt buộc';
        if (!user.maritalStatus) newErrors.maritalStatus = 'Tình trạng hôn nhân là bắt buộc';
        if (!user.city) newErrors.city = 'Tỉnh / Thành phố là bắt buộc';
        if (!user.address) newErrors.address = 'Địa chỉ là bắt buộc';
        if (!user.phone) {
            newErrors.phone = 'Số điện thoại là bắt buộc';
        } else if (!/^[0-9]{10,11}$/.test(user.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Thông tin cập nhật:', user);
            alert('Thông tin tài khoản đã được cập nhật');
        } else {
            alert('Vui lòng nhập đúng và đầy đủ thông tin.');
        }
    };

    return (
        <Container fluid className="mt-4">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="bg-light">
                    <Sidebar />
                </Col>
                
                {/* Main Content */}
                <Col md={9}>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h4>Thông tin đăng ký</h4>
                        </Card.Header>
                        <Card.Body>
                            {/* Avatar Display */}
                            <div className="text-center mb-4">
                                <Image
                                    src={user.avatarPreview || 'https://via.placeholder.com/150'} // Placeholder if no image
                                    roundedCircle
                                    width={150}
                                    height={150}
                                />
                            </div>

                            <Form onSubmit={handleSubmit}>
                                {/* Email */}
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                    <Button variant="link" className="p-0 mt-2">Sửa email</Button>
                                </Form.Group>

                                {/* Avatar */}
                                <Form.Group controlId="avatar" className="mb-3">
                                    <Form.Label>Ảnh đại diện</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Định dạng .JPG, .JPEG, .PNG dung lượng thấp hơn 300 KB với kích thước tối thiểu 300x300 px
                                    </Form.Text>
                                </Form.Group>

                                {/* Full Name */}
                                <Form.Group controlId="fullName" className="mb-3">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={user.fullName}
                                        onChange={handleChange}
                                        isInvalid={!!errors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Birth Date */}
                                <Form.Group controlId="birthDate" className="mb-3">
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        value={user.birthDate}
                                        onChange={handleChange}
                                        isInvalid={!!errors.birthDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.birthDate}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Gender */}
                                <Form.Group controlId="gender" className="mb-3">
                                    <Form.Label>Giới tính</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Nữ"
                                            name="gender"
                                            type="radio"
                                            value="Nữ"
                                            checked={user.gender === 'Nữ'}
                                            onChange={handleChange}
                                            isInvalid={!!errors.gender}
                                        />
                                        <Form.Check
                                            inline
                                            label="Nam"
                                            name="gender"
                                            type="radio"
                                            value="Nam"
                                            checked={user.gender === 'Nam'}
                                            onChange={handleChange}
                                            isInvalid={!!errors.gender}
                                        />
                                    </div>
                                    {errors.gender && <Form.Text className="text-danger">{errors.gender}</Form.Text>}
                                </Form.Group>

                                {/* Marital Status */}
                                <Form.Group controlId="maritalStatus" className="mb-3">
                                    <Form.Label>Tình trạng hôn nhân</Form.Label>
                                    <Form.Select
                                        name="maritalStatus"
                                        value={user.maritalStatus}
                                        onChange={handleChange}
                                        isInvalid={!!errors.maritalStatus}
                                    >
                                        <option value="">Chọn tình trạng hôn nhân</option>
                                        <option value="Độc thân">Độc thân</option>
                                        <option value="Đã lập gia đình">Đã lập gia đình</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.maritalStatus}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* City */}
                                <Form.Group controlId="city" className="mb-3">
                                    <Form.Label>Tỉnh / Thành phố</Form.Label>
                                    <Form.Select
                                        name="city"
                                        value={user.city}
                                        onChange={handleChange}
                                        isInvalid={!!errors.city}
                                    >
                                        <option value="">Chọn tỉnh thành</option>
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="TP Hồ Chí Minh">TP Hồ Chí Minh</option>
                                        <option value="Tiền Giang">Tiền Giang</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Address */}
                                <Form.Group controlId="address" className="mb-3">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        placeholder="Ví dụ: Số nhà 98A, phố Ngụy Như Kon Tum, phường ..."
                                        value={user.address}
                                        onChange={handleChange}
                                        isInvalid={!!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Phone */}
                                <Form.Group controlId="phone" className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        placeholder="Điền số điện thoại"
                                        value={user.phone}
                                        onChange={handleChange}
                                        isInvalid={!!errors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Buttons */}
                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="me-2">
                                        Hủy
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        Lưu thông tin
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountPage;
