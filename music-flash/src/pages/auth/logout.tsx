import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    const Logout = () => {
        auth.signOut()
            .then(() => navigate('/login'))
            .catch(error => logging.error(error));
    }

    return (
        <div>
            {auth.currentUser ? (
              <div>
                <p>Are you sure you want to logout?</p>
                <div>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                    <button onClick={() => Logout()}>Logout</button>
                </div>
              </div>
            ) : (
                <div>
                    <p>You are allready logged out</p>
                    <div>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </div>
                </div>
                )}
        </div>
    );
}

export default LogoutPage;