import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Image, Alert } from 'react-bootstrap';
import Sidebar from '../components/layout/Sidebar';
import { getCandidateAccount, updateCandidateAccount } from '../services/change_pass.service';

const AccountPage = () => {
    const [user, setUser] = useState({
        email: '',
        name: '',
        newPassword: '',
        image: null,
        imageUrl: null,
        imagePreview: null,
        editableEmail: false,
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const fetchCandidateData = async () => {
        try {
            const data = await getCandidateAccount();
            setUser((prev) => ({
                ...prev,
                email: data.email || '',
                name: data.name || '',
                imageUrl: data.image_url || null,
                imagePreview: prev.imagePreview || data.image_url,
            }));
        } catch (error) {
            setMessage(error.message || 'Lỗi khi tải thông tin tài khoản');
            setMessageType('danger');
        }
    };

    useEffect(() => {
        fetchCandidateData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 300 * 1024) {
                setMessage('Kích thước file không được vượt quá 300KB');
                setMessageType('danger');
                return;
            }

            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                setMessage('Chỉ chấp nhận file định dạng JPG, JPEG hoặc PNG');
                setMessageType('danger');
                return;
            }

            const previewUrl = URL.createObjectURL(file);
            setUser((prev) => ({
                ...prev,
                image: file,
                imagePreview: previewUrl,
            }));
            setMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        let hasChanges = false;

        // Chỉ thêm trường vào formData nếu nó đã thay đổi
        if (user.name && user.name !== '') {
            formData.append('name', user.name);
            hasChanges = true;
        }

        if (user.editableEmail && user.email) {
            formData.append('email', user.email);
            hasChanges = true;
        }

        if (user.image instanceof File) {
            formData.append('image', user.image);
            hasChanges = true;
        }

        if (isChangingPassword && user.newPassword) {
            formData.append('password', user.newPassword);
            hasChanges = true;
        }

        // Kiểm tra nếu không có thay đổi nào
        if (!hasChanges) {
            setMessage('Không có thông tin nào được thay đổi');
            setMessageType('warning');
            return;
        }

        try {
            const response = await updateCandidateAccount(formData);
            setMessage(response.message || 'Cập nhật thành công');
            setMessageType('success');

            // Cập nhật lại dữ liệu sau khi lưu
            await fetchCandidateData();

            // Reset các trường liên quan
            if (isChangingPassword) {
                setUser((prev) => ({
                    ...prev,
                    newPassword: '',
                }));
                setIsChangingPassword(false);
            }
        } catch (error) {
            setMessage(error.message || 'Lỗi khi cập nhật tài khoản');
            setMessageType('danger');
        }
    };

    useEffect(() => {
        return () => {
            if (user.imagePreview && user.imagePreview !== user.imageUrl) {
                URL.revokeObjectURL(user.imagePreview);
            }
        };
    }, [user.imagePreview, user.imageUrl]);

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={3} className="bg-light">
                    <Sidebar />
                </Col>
                <Col md={9}>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h4>Thông tin tài khoản</h4>
                        </Card.Header>
                        <Card.Body>
                            {message && <Alert variant={messageType}>{message}</Alert>}

                            <div className="text-center mb-4">
                                {(user.imagePreview || user.imageUrl) ? (
                                    <Image
                                        src={user.imagePreview || user.imageUrl}
                                        roundedCircle
                                        width={150}
                                        height={150}
                                        className="border"
                                        alt="Profile"
                                        onError={(e) => {
                                            e.target.src = '/path/to/default-avatar.png';
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="border rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: '150px', height: '150px', margin: '0 auto' }}
                                    >
                                        <span className="text-muted">Chưa có ảnh</span>
                                    </div>
                                )}
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        readOnly={!user.editableEmail}
                                    />
                                    <Button
                                        variant="link"
                                        className="p-0 mt-2"
                                        onClick={() =>
                                            setUser((prev) => ({
                                                ...prev,
                                                editableEmail: !prev.editableEmail,
                                            }))
                                        }
                                    >
                                        {user.editableEmail ? 'Hủy chỉnh sửa' : 'Sửa email'}
                                    </Button>
                                </Form.Group>

                                <Form.Group controlId="image" className="mb-3">
                                    <Form.Label>Ảnh đại diện</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Định dạng .JPG, .JPEG, .PNG dung lượng thấp hơn 300 KB
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button
                                    variant="link"
                                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                                    className="mb-3"
                                >
                                    {isChangingPassword ? 'Hủy đổi mật khẩu' : 'Đổi mật khẩu'}
                                </Button>

                                {isChangingPassword && (
                                    <Form.Group controlId="newPassword" className="mb-3">
                                        <Form.Label>Mật khẩu mới</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="newPassword"
                                            value={user.newPassword}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                )}

                                <div className="d-flex justify-content-end">
                                    <Button variant="secondary" className="me-2" type="button">
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
