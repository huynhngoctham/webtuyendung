import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const GeneralInfo = () => {
  return (
    <div className="mb-4">
      <h5 className="mb-3">Thông tin chung</h5>

      <Form.Group className="mb-3">
        <Form.Label>
          Vị trí mong muốn <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="E.g. Nhân viên kinh doanh"
          defaultValue="Nhân viên kinh doanh"
          disabled
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Nghề nghiệp <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="sales" disabled>
              <option value="developer">Lập trình viên</option>
              <option value="designer">Nhà thiết kế</option>
              <option value="marketing">Chuyên viên Marketing</option>
              <option value="sales">Nhân viên kinh doanh</option>
            </Form.Select>
            <Form.Text className="text-muted">Tối đa 5 nghề nghiệp</Form.Text>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Cấp bậc mong muốn <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="junior" disabled>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="manager">Quản lý</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Cấp bậc hiện tại <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="entry" disabled>
              <option value="entry">Mới vào nghề</option>
              <option value="experienced">Kinh nghiệm</option>
              <option value="lead">Trưởng nhóm</option>
              <option value="director">Giám đốc</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Trình độ học vấn <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="bachelor" disabled>
              <option value="highschool">Trung học</option>
              <option value="bachelor">Cử nhân</option>
              <option value="master">Thạc sĩ</option>
              <option value="phd">Tiến sĩ</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Mức lương mong muốn <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="0.0"
              defaultValue="15000000"
              disabled
            />
            <Form.Text className="text-muted">VND</Form.Text>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Địa điểm làm việc <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="hanoi" disabled>
              <option value="hanoi">Hà Nội</option>
              <option value="hcmc">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
              <option value="cantho">Cần Thơ</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Tối đa 5 địa điểm
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Số năm kinh nghiệm <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="1-3" disabled>
              <option value="0">0 năm</option>
              <option value="1-3">1-3 năm</option>
              <option value="3-5">3-5 năm</option>
              <option value="5+">5 năm trở lên</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Hình thức làm việc <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select defaultValue="fulltime" disabled>
              <option value="fulltime">Toàn thời gian</option>
              <option value="parttime">Bán thời gian</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Thực tập</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Mục tiêu nghề nghiệp</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Điền mục tiêu nghề nghiệp"
          defaultValue="Phát triển bản thân trong môi trường chuyên nghiệp"
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Kỹ năng mềm & cứng <span className="text-muted">(Không bắt buộc)</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập kỹ năng mềm hoặc cứng"
          defaultValue="Giao tiếp, quản lý thời gian, lập trình React"
          disabled
        />
        <Form.Text className="text-muted">
          Phân cách bằng dấu phẩy, chọn tối đa 30 kỹ năng
        </Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" disabled>
          Hủy
        </Button>
        <Button variant="primary" disabled>
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};

export default GeneralInfo;
