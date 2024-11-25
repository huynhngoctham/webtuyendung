import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate để điều hướng
import { logoutCandidate } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();  // Khởi tạo navigate
  const { logout } = useAuth();    // Lấy hàm logout từ context

  const handleLogout = async () => {
    try {
      // Gọi API để logout
      await logoutCandidate();

      // Gọi hàm logout trong context để xóa token và user
      logout();

      // Sau khi logout thành công, điều hướng về trang chủ
      navigate('/');  // Điều hướng về trang chủ

    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      // Nếu có lỗi, vẫn thực hiện logout locally và điều hướng về trang chủ
      logout();
      navigate('/');  // Điều hướng về trang chủ ngay cả khi có lỗi
    }
  };

  return (
    <div 
      onClick={handleLogout} 
      className="dropdown-item py-2 cursor-pointer text-danger"
    >
      Đăng xuất
    </div>
  );
};

export default LogoutButton;
