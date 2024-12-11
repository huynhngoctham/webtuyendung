import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Image } from 'react-bootstrap';
import Sidebar from '../components/layout/Sidebar'; // Import Sidebar

const AccountPage = () => {
    const [user, setUser] = useState({
        email: 'nguyentronlhl@gmail.com',
        fullName: 'Tham Huỳnh',
        password: '', // Thêm password
        newPassword: '', // Thêm trường mật khẩu mới
        confirmPassword: '', // Thêm trường xác nhận mật khẩu mới
        avatar: null,
        avatarPreview: null, // For previewing the avatar image
    });

    const [errors, setErrors] = useState({}); // To store validation errors
    const [isChangingPassword, setIsChangingPassword] = useState(false); // State to control the visibility of the password change form

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
        if (!user.password) newErrors.password = 'Mật khẩu là bắt buộc';
        if (!user.newPassword) newErrors.newPassword = 'Mật khẩu mới là bắt buộc';
        if (user.newPassword !== user.confirmPassword) newErrors.confirmPassword = 'Mật khẩu mới và xác nhận mật khẩu không khớp';

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
                            <h4>Thông tin tài khoản</h4>
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

                                {/* Button to toggle password change form */}
                                <Button 
                                    variant="link" 
                                    onClick={() => setIsChangingPassword(!isChangingPassword)} 
                                    className="mb-3"
                                >
                                    {isChangingPassword ? 'Hủy đổi mật khẩu' : 'Đổi mật khẩu'}
                                </Button>

                                {/* Password Change Form */}
                                {isChangingPassword && (
                                    <>
                                        {/* Current Password */}
                                        <Form.Group controlId="password" className="mb-3">
                                            <Form.Label>Mật khẩu hiện tại</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={user.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* New Password */}
                                        <Form.Group controlId="newPassword" className="mb-3">
                                            <Form.Label>Mật khẩu mới</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="newPassword"
                                                value={user.newPassword}
                                                onChange={handleChange}
                                                isInvalid={!!errors.newPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.newPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        {/* Confirm New Password */}
                                        <Form.Group controlId="confirmPassword" className="mb-3">
                                            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                value={user.confirmPassword}
                                                onChange={handleChange}
                                                isInvalid={!!errors.confirmPassword}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </>
                                )}

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
