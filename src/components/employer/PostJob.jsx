import React, { useState, useEffect } from "react";
import { 
    Form, 
    Button, 
    Container, 
    Row, 
    Col, 
    Spinner 
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecruitmentService from "../../services/recruitment.service";
import { getAllIndustries } from "../../services/industry.service";
import WorkplaceService from "../../services/workplace.service";
import LanguageService from '../../services/language.service';
import ITService from '../../services/it.service';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const PostJob = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const recruitmentId = id || location.state?.recruitmentId || null;

    const [formData, setFormData] = useState({
        title: "",
        describe: "",
        benefit: "",
        salary: "",
        deadline: null,
        status: "pending",
        experience: "",
        skills: "",
        quantity: "",
        workingmodel: "",
        qualifications: "",
        requirements: "",
        rank: "",
        isActive: 1,
        workplacenews: [{ workplace_id: '', homeaddress: '' }],
        industry: [{ industry_id: '' }],
        language: [],
        information: []
    });

    const [industries, setIndustries] = useState([]);
    const [workplaces, setWorkplaces] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [itSkills, setItSkills] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedITSkills, setSelectedITSkills] = useState([]);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                const [industryData, workplaceData, languageData, itSkillsData] = await Promise.all([
                    getAllIndustries(),
                    WorkplaceService.getAllWorkplace(),
                    LanguageService.getAllLanguages(),
                    ITService.getAllIT()
                ]);

                setIndustries(industryData);
                setWorkplaces(workplaceData);
                setLanguages(languageData);
                setItSkills(itSkillsData);

                if (recruitmentId) {
                    const jobData = await RecruitmentService.getRecruitmentById(recruitmentId);
                    const deadlineDate = jobData.deadline ? new Date(jobData.deadline.split('-').reverse().join('-')) : null;

                    setFormData({
                        ...jobData,
                        deadline: deadlineDate,
                        workplacenews: jobData.workplacenews || [{ workplace_id: '', homeaddress: '' }],
                        industry: jobData.industry || [{ industry_id: '' }]
                    });

                    setSelectedLanguages(jobData.language?.map(lang => lang.language_id) || []);
                    setSelectedITSkills(jobData.information?.map(info => info.it_id) || []);
                }
            } catch (error) {
                toast.error("Lỗi tải dữ liệu ban đầu");
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [recruitmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setFormData(prevData => ({
            ...prevData,
            deadline: date
        }));
    };

    const handleIndustryChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            industry: [{ industry_id: e.target.value }]
        }));
    };

    const handleAddLanguage = (e) => {
        const selectedLanguageId = parseInt(e.target.value, 10);
        if (selectedLanguageId && !selectedLanguages.includes(selectedLanguageId)) {
            setSelectedLanguages(prev => [...prev, selectedLanguageId]);
        }
    };

    const handleAddITSkill = (e) => {
        const selectedITId = parseInt(e.target.value, 10);
        if (selectedITId && !selectedITSkills.includes(selectedITId)) {
            setSelectedITSkills(prev => [...prev, selectedITId]);
        }
    };

    const handleRemoveLanguage = (languageId) => {
        setSelectedLanguages(prev => prev.filter(id => id !== languageId));
    };

    const handleRemoveITSkill = (itId) => {
        setSelectedITSkills(prev => prev.filter(id => id !== itId));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title || !/^[^0-9]*$/.test(formData.title)) {
            newErrors.title = "Tiêu đề không được chứa số";
        }

        if (!formData.describe || !/^[^0-9]*$/.test(formData.describe)) {
            newErrors.describe = "Mô tả không được chứa số";
        }

        if (!formData.salary || isNaN(formData.salary)) {
            newErrors.salary = "Mức lương phải là số";
        }

        if (!formData.deadline) {
            newErrors.deadline = "Hạn nộp hồ sơ là bắt buộc";
        }

        if (!formData.quantity || isNaN(formData.quantity)) {
            newErrors.quantity = "Số lượng phải là số";
        }

        const requiredFields = [
            'experience', 'skills', 'workingmodel', 
            'qualifications', 'requirements', 'benefit', 'rank'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `${field} là bắt buộc`;
            }
        });

        formData.workplacenews.forEach((workplace, index) => {
            if (!workplace.workplace_id) {
                newErrors[`workplacenews[${index}].workplace_id`] = "Nơi làm việc là bắt buộc";
            }
            if (!workplace.homeaddress) {
                newErrors[`workplacenews[${index}].homeaddress`] = "Địa chỉ chi tiết là bắt buộc";
            }
        });

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Log giá trị của title và describe
    console.log("Title:", formData.title);
    console.log("Describe:", formData.describe);
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Vui lòng kiểm tra lại thông tin.");
            return;
        }

        setIsLoading(true);
        setErrors({});

        const submitData = {
            ...formData,
            language: selectedLanguages.map(langId => ({ language_id: langId })),
            information: selectedITSkills.map(itId => ({ it_id: itId }))
        };

        try {
            if (recruitmentId) {
                await RecruitmentService.updateRecruitmentNews(recruitmentId, submitData);
                toast.success("Cập nhật tin tuyển dụng thành công!");
                navigate('/recruitment/list');
            } else {
                await RecruitmentService.addRecruitmentNews(submitData);
                toast.success("Đăng tin tuyển dụng thành công!");
                resetForm();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.errors 
                ? Object.values(error.response.data.errors).flat().join('\n')
                : error.response?.data?.message || "Có lỗi xảy ra";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    ///////////////////
    const handleInputWithNewline = (e) => {
        const { name, value } = e.target;
        const updatedValue = value
            .replace(/\. /g, '.\n') // Thay ". " bằng ".\n" để xuống dòng
            .replace(/\r?\n/g, '\n'); // Chuẩn hóa ký tự xuống dòng
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };
    

    const resetForm = () => {
        setFormData({
            title: "",
            describe: "",
            benefit: "",
            salary: "",
            deadline: null,
            status: "pending",
            experience: "",
            skills: "",
            quantity: "",
            workingmodel: "",
            qualifications: "",
            requirements: "",
            rank: "",
            isActive: 1,
            workplacenews: [{ workplace_id: '', homeaddress: '' }],
            industry: [{ industry_id: '' }],
            language: [],
            information: []
        });
        setSelectedLanguages([]);
        setSelectedITSkills([]);
    };

    if (isLoading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
                <p>Đang tải thông tin...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <ToastContainer />
            <h2 className="text-center mb-4">
                {recruitmentId ? "Chỉnh Sửa Tin Tuyển Dụng" : "Đăng tin tuyển dụng"}
            </h2>

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
        <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
        <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange} // Không cần xử lý xuống dòng cho tiêu đề
            isInvalid={!!errors.title}
            placeholder="Nhập tiêu đề tin tuyển dụng"
        />
        <Form.Control.Feedback type="invalid">
            {errors.title}
        </Form.Control.Feedback>
    </Form.Group>

    <Form.Group className="mb-3">
        <Form.Label>Mô tả công việc <span className="text-danger">*</span></Form.Label>
        <Form.Control
            as="textarea"
            rows={4}
            name="describe"
            value={formData.describe}
            onChange={handleInputWithNewline} // Dùng hàm xử lý xuống dòng
            isInvalid={!!errors.describe}
            placeholder="Mô tả chi tiết về công việc"
            style={{ whiteSpace: 'pre-wrap' }} // Đảm bảo hiển thị xuống dòng
        />
        <Form.Control.Feedback type="invalid">
            {errors.describe}
        </Form.Control.Feedback>
    </Form.Group>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mức lương (VNĐ) <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                isInvalid={!!errors.salary}
                                placeholder="Nhập mức lương"
                                min="0"
                            />
                            <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng cần tuyển <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                isInvalid={!!errors.quantity}
                                placeholder="Nhập số lượng"
                                min="1"
                            />
                            <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                <Form.Label>Quyền lợi <span className="text-danger">*</span></Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="benefit"
                    value={formData.benefit}
                    onChange={handleInputWithNewline} 
                    isInvalid={!!errors.benefit}
                    placeholder="Mô tả quyền lợi của ứng viên"
                    style={{ whiteSpace: 'pre-wrap' }} 
                />
                <Form.Control.Feedback type="invalid">{errors.benefit}</Form.Control.Feedback>
            </Form.Group>


                {/* Job Requirements */}
                <h4 className="mt-4">Yêu cầu công việc</h4>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Cấp bậc <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="rank"
                                value={formData.rank}
                                onChange={handleChange}
                                isInvalid={!!errors.rank}
                            >
                                <option value="">Cấp Bậc</option>
                                <option value="Quản lý cấp cao">Quản lý cấp cao</option>
                                <option value="Quản lý cấp trung">Quản lý cấp trung</option>
                                <option value="Quản lý nhóm-Giám sát">Quản lý nhóm-Giám sát</option>
                                <option value="Chuyên giat">Chuyên gia</option>
                                <option value="Chuyên viên-Nhân viên">Chuyên viên-Nhân viên</option>
                                <option value="Cộng tác viên">Cộng tác viên</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.rank}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Kinh nghiệm <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                as="select"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                isInvalid={!!errors.experience}
                            >
                                <option value="">Kinh Nghiệm</option>
                                <option value="chua">Chưa có kinh nghiệm</option>
                                <option value="duoi_1">Dưới 1 năm</option>
                                <option value="1">1 năm</option>
                                <option value="2">2 năm</option>
                                <option value="3">3 năm</option>
                               <option value="4">4 năm</option>
                                <option value="5">5 năm</option>
                                <option value="5+">5 năm trở lên</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Trình độ học vấn <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="select"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        isInvalid={!!errors.qualifications}
                    >
                        <option value="">Trình Độ Học Vấn</option>
                        <option value="Trên Đại Học">Trên Đại Học</option>
                        <option value="Đại Học">Đại Học</option>
                        <option value="Cao Đẳng">Cao Đẳng</option>
                        <option value="Trung Cấp">Trung Cấp</option>
                        <option value="Trung Học">Trung Học</option>
                        <option value="Chứng Chỉ">Chứng Chỉ</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.qualifications}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Kỹ năng yêu cầu <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        isInvalid={!!errors.skills}
                        placeholder="Liệt kê các kỹ năng yêu cầu"
                    />
                    <Form.Control.Feedback type="invalid">{errors.skills}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Yêu cầu khác <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        isInvalid={!!errors.requirements}
                        placeholder="Các yêu cầu khác"
                    />
                    <Form.Control.Feedback type="invalid">{errors.requirements}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Hình thức làm việc <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="select"
                        name="workingmodel"
                        value={formData.workingmodel}
                        onChange={handleChange}
                        isInvalid={!!errors.workingmodel}
                    >
                        <option value="">Loại Công Việc</option>
                        <option value="Toàn thời gian">Toàn thời gian</option>
                        <option value="Bán thời gian">Bán thời gian</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Làm việc từ xa">Làm việc từ xa</option>
                        <option value="Thời vụ">Thời vụ</option>
                        <option value="Thực Tập">Thực Tập</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.workingmodel}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="deadline" className="mb-3">
                    <Form.Label>Ngày hết hạn</Form.Label>
                    <DatePicker
                        selected={formData.deadline}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        className={`form-control ${errors.deadline ? 'is-invalid' : ''}`}
                    />
                    {errors.deadline && (
                        <div className="invalid-feedback">{errors.deadline}</div>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngành nghề <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={formData.industry[0].industry_id}
                        onChange={handleIndustryChange}
                        isInvalid={!!errors.industry}
                    >
                        <option value="">Chọn ngành nghề</option>
                        {industries.map(industry => (
                            <option key={industry.id} value={industry.id}>
                                {industry.industry_name}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.industry}</Form.Control.Feedback>
                </Form.Group>

                {/* Workplace Section */}
                <div className="workplace-section mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>Địa điểm làm việc <span className="text-danger">*</span></h4>
                        {formData.workplacenews.length < 3 && (
                            <Button 
                                variant="outline-primary" 
                                onClick={() => {
                                    if (formData.workplacenews.length < 3) {
                                        setFormData(prevData => ({
                                            ...prevData,
                                            workplacenews: [
                                                ...prevData.workplacenews,
                                                { workplace_id: '', homeaddress: '' }
                                            ]
                                        }));
                                    }
                                }}
                                size="sm"
                            >
                                <i className="fas fa-plus"></i> Thêm địa điểm
                            </Button>
                        )}
                    </div>

                    {formData.workplacenews.map((workplace, index) => (
                        <div key={index} className="workplace-item bg-light p-3 mb-3 rounded">
                            <Row>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Thành phố <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={workplace.workplace_id}
                                            onChange={(e) => {
                                                const updatedWorkplaces = [...formData.workplacenews];
                                                updatedWorkplaces[index] = {
                                                    ...updatedWorkplaces[index],
                                                    workplace_id: e.target.value
                                                };
                                                setFormData({
                                                    ...formData,
                                                    workplacenews: updatedWorkplaces
                                                });
                                            }}
                                            isInvalid={!!errors[`workplacenews[${index}].workplace_id`]}
                                        >
                                            <option value="">Chọn thành phố</option>
                                            {workplaces.map(wp => (
                                                <option key={wp.id} value={wp.id}>
                                                    {wp.city}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            {errors[`workplacenews[${index}].workplace_id`]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Địa chỉ chi tiết <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={workplace.homeaddress}
                                            onChange={(e) => {
                                                const updatedWorkplaces = [...formData.workplacenews];
                                                updatedWorkplaces[index] = {
                                                    ...updatedWorkplaces[index],
                                                    homeaddress: e.target.value
                                                };
                                                setFormData({
                                                    ...formData,
                                                    workplacenews: updatedWorkplaces
                                                });
                                            }}
                                            placeholder="Nhập địa chỉ chi tiết"
                                            isInvalid={!!errors[`workplacenews[${index}].homeaddress`]}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors[`workplacenews[${index}].homeaddress`]}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={2} className="d-flex align-items-end">
                                    {formData.workplacenews.length > 1 && (
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                const updatedWorkplaces = formData.workplacenews.filter((_, i) => i !== index);
                                                setFormData({
                                                    ...formData,
                                                    workplacenews: updatedWorkplaces
                                                });
                                            }}
                                        >
                                            <i className="fas fa-trash"></i> Xóa
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    ))}
                </div>

                {/* Optional Information */}
                <div className="optional-section mt-4">
                    <h4>Thông tin thêm </h4>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Chọn Ngoại Ngữ</Form.Label>
                        <Form.Control as="select" onChange={handleAddLanguage} value="">
                            <option value="">Chọn ngoại ngữ</option>
                            {languages.map((language) => (
                                <option key={language.id} value={language.id}>
                                    {language.language_name}
                                </option>
                            ))}
                        </Form.Control>
                        <div>
                            {selectedLanguages.length > 0 ? (
                                selectedLanguages.map(languageId => {
                                    const language = languages.find(lang => lang.id === languageId);
                                    return (
                                        <div key={languageId} className="d-flex justify-content-between align-items-center mt-2">
                                            <span>{language ? language.language_name : "Ngôn ngữ không tìm thấy"}</span>
                                            <Button variant="danger" onClick={() => handleRemoveLanguage(languageId)}>
                                                Xóa
                                            </Button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Chưa có ngôn ngữ nào được chọn</p>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Chọn Kỹ Năng IT</Form.Label>
                        <Form.Control as="select" onChange={handleAddITSkill} value="">
                            <option value="">Chọn kỹ năng IT</option>
                            {itSkills.map((it) => (
                                <option key={it.id} value={it.id}>
                                    {it.name}
                                </option>
                            ))}
                        </Form.Control>
                        <div>
                            {selectedITSkills.length > 0 ? (
                                selectedITSkills.map(itId => {
                                    const itSkill = itSkills.find(it => it.id === itId);
                                    return (
                                        <div key={itId} className="d-flex justify-content-between align-items-center mt-2">
                                            <span>{itSkill ? itSkill.name : "Kỹ năng IT không tìm thấy"}</span>
                                            <Button variant="danger" onClick={() => handleRemoveITSkill(itId)}>
                                                Xóa
                                            </Button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Chưa có kỹ năng IT nào được chọn</p>
                            )}
                        </div>
                    </Form.Group>
                </div>

                {/* Submit Section */}
                <div className="submit-section mt-4 mb-5">
                    <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={isLoading}>
                    {recruitmentId ? "Cập nhật tin" : "Đăng tin"}
                </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
};

export default PostJob;