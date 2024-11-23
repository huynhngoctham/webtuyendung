import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const GeneralInfo = ({ user, errors, handleChange, handleCancel, handleSave }) => {
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
          name="desiredPosition"
          value={user.desiredPosition || ''}
          onChange={handleChange}
          isInvalid={!!errors.desiredPosition}
        />
        <Form.Control.Feedback type="invalid">
          {errors.desiredPosition}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Nghề nghiệp <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="profession"
              value={user.profession || ''}
              onChange={handleChange}
              isInvalid={!!errors.profession}
            >
              <option value="">Chọn</option>
              <option value="developer">Lập trình viên</option>
              <option value="designer">Nhà thiết kế</option>
              <option value="marketing">Chuyên viên Marketing</option>
              <option value="sales">Nhân viên kinh doanh</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Tối đa 5 nghề nghiệp
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.profession}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Cấp bậc mong muốn <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="desiredLevel"
              value={user.desiredLevel || ''}
              onChange={handleChange}
              isInvalid={!!errors.desiredLevel}
            >
              <option value="">Chọn</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="manager">Quản lý</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.desiredLevel}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Cấp bậc hiện tại <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="currentLevel"
              value={user.currentLevel || ''}
              onChange={handleChange}
              isInvalid={!!errors.currentLevel}
            >
              <option value="">Chọn</option>
              <option value="entry">Mới vào nghề</option>
              <option value="experienced">Kinh nghiệm</option>
              <option value="lead">Trưởng nhóm</option>
              <option value="director">Giám đốc</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.currentLevel}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Trình độ học vấn <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="education"
              value={user.education || ''}
              onChange={handleChange}
              isInvalid={!!errors.education}
            >
              <option value="">Chọn</option>
              <option value="highschool">Trung học</option>
              <option value="bachelor">Cử nhân</option>
              <option value="master">Thạc sĩ</option>
              <option value="phd">Tiến sĩ</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.education}
            </Form.Control.Feedback>
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
              name="desiredSalary"
              value={user.desiredSalary || ''}
              onChange={handleChange}
              isInvalid={!!errors.desiredSalary}
            />
            <Form.Text className="text-muted">VND</Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.desiredSalary}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Địa điểm làm việc <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="workLocation"
              value={user.workLocation || ''}
              onChange={handleChange}
              isInvalid={!!errors.workLocation}
            >
              <option value="">Chọn</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcmc">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
              <option value="cantho">Cần Thơ</option>
            </Form.Select>
            <Form.Text className="text-muted">
              Tối đa 5 địa điểm
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.workLocation}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Số năm kinh nghiệm <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="yearsOfExperience"
              value={user.yearsOfExperience || ''}
              onChange={handleChange}
              isInvalid={!!errors.yearsOfExperience}
            >
              <option value="">Chọn</option>
              <option value="0">0 năm</option>
              <option value="1-3">1-3 năm</option>
              <option value="3-5">3-5 năm</option>
              <option value="5+">5 năm trở lên</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.yearsOfExperience}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>
              Hình thức làm việc <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="workType"
              value={user.workType || ''}
              onChange={handleChange}
              isInvalid={!!errors.workType}
            >
              <option value="">Chọn</option>
              <option value="fulltime">Toàn thời gian</option>
              <option value="parttime">Bán thời gian</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Thực tập</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.workType}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Mục tiêu nghề nghiệp</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Điền mục tiêu nghề nghiệp"
          name="careerGoals"
          value={user.careerGoals || ''}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Kỹ năng mềm & cứng <span className="text-muted">(Không bắt buộc)</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên Kỹ năng mềm hoặc cứng"
          name="skills"
          value={user.skills || ''}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Phân cách bằng dấu phẩy, chọn tối đa 30 kỹ năng
        </Form.Text>
      </Form.Group>

      {/* Cancel and Save buttons */}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu thông tin
        </Button>
      </div>
    </div>
  );
};

export default GeneralInfo;
