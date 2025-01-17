import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../layout/Sidebar';
import FollowService from '../../../services/follow.service';
import NotificationList from './NotificationList'; // Ensure correct import

const NotificationsPage = () => {
  const [followList, setFollowList] = useState([]);
  const [followNewsList, setFollowNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const loadFollowList = async () => {
    setLoading(true);
    try {
      const response = await FollowService.getFollowList();
      setFollowList(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách theo dõi nhà tuyển dụng:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFollowNewsList = async () => {
    setLoading(true);
    try {
      const response = await FollowService.getFollowNewsList();
      setFollowNewsList(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách tin tuyển dụng theo dõi:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = () => {
    // Reload both lists after status change
    loadFollowList();
    loadFollowNewsList();
  };

  useEffect(() => {
    loadFollowList();
    loadFollowNewsList();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Row className="my-4">
            <Col>
              <h2>Danh sách theo dõi nhà tuyển dụng</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <p className="text-center">Đang tải...</p>
              ) : (
                <NotificationList 
                  notifications={followList} 
                  type="employer"
                  onStatusChange={handleStatusChange}
                />
              )}
            </Col>
          </Row>

          <Row className="my-4">
            <Col>
              <h2>Danh sách theo dõi tin tuyển dụng</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {loading ? (
                <p className="text-center">Đang tải...</p>
              ) : (
                <NotificationList 
                  notifications={followNewsList} 
                  type="news"
                  onStatusChange={handleStatusChange}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationsPage;  // Default export
