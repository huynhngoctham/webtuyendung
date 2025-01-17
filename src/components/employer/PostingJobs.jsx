// import React, { useEffect, useState } from "react";
// import { Card, Button, Row, Col, Container, Badge, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; // Import React Router hook
// import PostingService from "../../services/posting.service"; // Service để gọi API

// const PostingJobs = () => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // Hook điều hướng

//   useEffect(() => {
//     fetchPackages();
//   }, []);

//   const fetchPackages = async () => {
//     setLoading(true);
//     try {
//       const data = await PostingService.getAllPostings();
//       setPackages(data);
//     } catch (error) {
//       console.error("Lỗi khi tải gói dịch vụ:", error);
//       alert("Không thể tải gói dịch vụ.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="my-5">
//       <Row className="mb-4">
//         <Col>
//           {/* Nút Quay lại */}
//           <Button
//             variant="outline-success"
//             className="d-flex align-items-center gap-2"
//             onClick={() => navigate(-1)} // Quay lại trang trước
//           >
//             Quay lại
//           </Button>
//         </Col>
        
//       </Row>

//       <h3 className="text-center text-success mb-4">Gói Dịch Vụ Tuyển Dụng</h3>

//       {loading ? (
//         <div className="text-center">
//           <Spinner animation="border" variant="success" />
//           <p className="mt-2">Đang tải dữ liệu...</p>
//         </div>
//       ) : (
//         <Row>
//           {packages.length > 0 ? (
//             packages.map((pkg) => (
//               <Col md={4} sm={6} xs={12} className="mb-4" key={pkg.id}>
//                 <Card className="h-100 shadow-sm">
//                   <Card.Body className="text-center">
//                     <Badge
//                       bg={pkg.type === 1 ? "warning" : "secondary"}
//                       className="mb-3"
//                     >
//                       {pkg.type === 1 ? "Ưu tiên" : "Bình thường"}
//                     </Badge>
//                     <Card.Title>{pkg.name}</Card.Title>
//                     <Card.Text className="text-muted">
//                       Giá: <strong>{pkg.price} VND</strong>
//                     </Card.Text>
//                     <Card.Text className="text-muted">{pkg.describe}</Card.Text>
//                     <Button variant="success">Mua ngay</Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <p className="text-center text-muted">
//               Hiện tại không có gói dịch vụ nào để hiển thị.
//             </p>
//           )}
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default PostingJobs;
