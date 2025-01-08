import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import './navbar.css';
import { SearchOutlined, UserOutlined, BookOutlined, LogoutOutlined, CaretDownOutlined } from '@ant-design/icons';


// layout.css

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/login');
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="search-box">
          <SearchOutlined className="search-icon" />
          <input 
            type="text" 
            placeholder="Tìm kiếm khóa học..." 
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
      </div>

      <div className="navbar-right">
        {token ? (
          <div className="user-menu" ref={menuRef}>
            <div className="user-info" onClick={() => setShowMenu(!showMenu)}>
              <div className="user-avatar">
                {userData?.avatar ? (
                  <img 
                    src={`${process.env.REACT_APP_API_URL}${userData.avatar}`} 
                    alt="Avatar" 
                    className="avatar-image"
                  />
                ) : (
                  userData?.role?.[0]?.toUpperCase() || 'U'
                )}
              </div>
              <span className="user-name">{userData?.full_name || userData?.username}</span>
              <CaretDownOutlined className="dropdown-icon" />
            </div>
            
            {showMenu && (
              <div className="dropdown-menu">
                <Link to="/profile" className="menu-item">
                  <UserOutlined /> Hồ sơ
                </Link>
                <Link to="/enrolled-courses" className="menu-item">
                  <BookOutlined /> Khóa học của tôi
                </Link>
                <div className="menu-divider"></div>
                <button className="menu-item logout" onClick={handleLogout}>
                  <LogoutOutlined /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-btn">
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;