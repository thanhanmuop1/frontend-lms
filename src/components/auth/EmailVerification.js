import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result, Spin, Button } from 'antd';
import axios from 'axios';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        
        if (status === 'success') {
            setStatus('success');
            setTimeout(() => navigate('/login'), 3000);
        } else if (status === 'already-verified') {
            setStatus('already-verified');
            setTimeout(() => navigate('/login'), 3000);
        } else if (status === 'invalid') {
            setStatus('invalid');
        } else if (status === 'error') {
            setStatus('error');
        }
    }, [navigate]);

    // Render based on status...
    if (!status) {
        return <Spin size="large" tip="Đang xác thực..." />;
    }

    return (
        <Result
            status={status === 'success' || status === 'already-verified' ? 'success' : 'error'}
            title={
                status === 'success' ? 'Xác thực email thành công!' :
                status === 'already-verified' ? 'Email đã được xác thực trước đó' :
                'Xác thực email thất bại'
            }
            subTitle={
                (status === 'success' || status === 'already-verified') ?
                'Bạn sẽ được chuyển đến trang đăng nhập trong vài giây...' :
                'Vui lòng thử lại hoặc liên hệ hỗ trợ'
            }
        />
    );
};

export default EmailVerification; 