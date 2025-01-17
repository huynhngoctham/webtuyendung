import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FollowService from '../../services/follow.service';  // Import service

const TopCompanies = () => {
    const [companies, setCompanies] = useState([]); // State để lưu danh sách các công ty
    const [loading, setLoading] = useState(true); // State để xử lý trạng thái loading

    useEffect(() => {
        // Gọi API khi component được render
        FollowService.getTopFollowedEmployers()
            .then((data) => {
                setCompanies(data); // Lưu danh sách nhà tuyển dụng vào state
                setLoading(false); // Dừng loading khi nhận được dữ liệu
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách nhà tuyển dụng:', error);
                setLoading(false); // Dừng loading ngay cả khi có lỗi
            });
    }, []); // Chỉ gọi một lần khi component được mount

    if (loading) {
        return <div>Loading...</div>; // Hiển thị thông báo khi đang tải dữ liệu
    }

    return (
        <div className="my-4">
            <h3 className="text-start font-weight-bold mb-4 text-primary">Các Công Ty Hàng Đầu</h3>
            <Row>
                {companies.map((company) => (
                    <Col key={company.id} xs={12} sm={6} md={4} lg={2} className="mb-3">
                        <Card className="shadow border-0 h-100 hover-card">
                            <Link to={`/company/${company.id}`} className="text-decoration-none">
                                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                                    <Card.Img
                                        variant="top"
                                        src={company.image_url || 'default-logo.png'}  // Nếu không có ảnh, dùng ảnh mặc định
                                        style={{ width: 'auto', maxHeight: '60px', objectFit: 'contain' }}
                                        className="mb-2"
                                    />
                                    <Card.Title className="text-center fw-bold fs-6 text-dark">{company.name}</Card.Title>
                                    
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>

            <style jsx>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .hover-card:hover {
                    transform: scale(1.05);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                }
            `}</style>
        </div>
    );
};

export default TopCompanies;
