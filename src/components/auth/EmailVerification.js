import React, { useEffect, useState } from 'react';
import { Result, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../layout/AuthLayout';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/verify-email/${token}`,
                    { withCredentials: true }
                );
                setVerificationStatus('success');
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setVerificationStatus('error');
                setMessage(error.response?.data?.message || 'Xác thực email thất bại');
                if (error.response?.data?.alreadyVerified) {
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <AuthLayout>
            <div className="auth-form">
                {verificationStatus === 'verifying' && (
                    <Result
                        icon={<Spin size="large" />}
                        title="Đang xác thực email..."
                    />
                )}

                {verificationStatus === 'success' && (
                    <Result
                        status="success"
                        title="Xác thực email thành công!"
                        subTitle="Bạn sẽ được chuyển đến trang đăng nhập trong vài giây..."
                    />
                )}

                {verificationStatus === 'error' && (
                    <Result
                        status="error"
                        title="Xác thực email thất bại"
                        subTitle={message}
                    />
                )}
            </div>
        </AuthLayout>
    );
};

export default EmailVerification; 