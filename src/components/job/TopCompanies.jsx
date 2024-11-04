// src/components/job/TopCompanies.jsx
import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TopCompanies = () => {
    const companies = [
        {
            name: 'FOXCONN INDUSTRIAL',
            logo: 'https://vieclam24h.vn/images/uploads/28494/2023/07/18/logo-foxconn-cong-ty-tnhh-foxconn-technology-group_1689683184.jpg',
            link: '/company/1'
        },
        {
            name: 'WA PROJECTS LIMITED',
            logo: 'https://vieclam24h.vn/images/companies/2023/08/02/va-projects-limited_1690938234.png',
            link: '/company/2'
        },
        {
            name: 'UOB VIETNAM',
            logo: 'https://vieclam24h.vn/images/uploads/35058/2023/08/02/uob-logo_1690989189.png',
            link: '/company/3'
        },
        {
            name: 'MUFG BANK',
            logo: 'https://vieclam24h.vn/images/companies/2023/07/24/mufg-bank_1690151928.png',
            link: '/company/4'
        },
        {
            name: 'MONDELEZ KINH ĐÔ',
            logo: 'https://vieclam24h.vn/images/uploads/13312/2023/08/02/mondelēz-kinh-đô_1690947176.png',
            link: '/company/5'
        },
        {
            name: 'VAS',
            logo: 'https://vieclam24h.vn/images/companies/2023/08/02/vas_1690989957.png',
            link: '/company/6'
        },
    ];

    return (
        <div className="my-4">
            <h3 className="text-start font-weight-bold mb-4 text-primary">Các Công Ty Hàng Đầu</h3> {/* Change text color here */}
            <Row>
                {companies.map((company) => (
                    <Col key={company.name} xs={12} sm={6} md={4} lg={2} className="mb-3">
                        <Card className="shadow border-0 h-100 hover-card">
                            <Link to={company.link} className="text-decoration-none">
                                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                                    <Card.Img
                                        variant="top"
                                        src={company.logo}
                                        style={{ width: 'auto', maxHeight: '60px', objectFit: 'contain' }}
                                        className="mb-2"
                                    />
                                    <Card.Title className="text-center fw-bold fs-6 text-dark">{company.name}</Card.Title>
                                    <Button variant="light" className="text-primary mt-2 px-4 py-2 rounded" size="sm">Việc mới</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* CSS for hover effect */}
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
