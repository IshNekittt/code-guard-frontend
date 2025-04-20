import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logoutUser } from '../../services/api';
// import { clearUser } from '../../store/userSlice';
import './HeaderWithLogoutModal.css';

const HeaderWithLogoutModal = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const email = useSelector((state) => state.user.email);
  const email = 'testuser@example.com';
  const username = email?.split('@')[0];
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = async () => {
    // try {
    //   await logoutUser();
    //   localStorage.clear();
    //   dispatch(clearUser());
    //   navigate('/login');
    // } catch (err) {
    //   setError('Error on exit: ' + (err?.message || 'Unknown error'));
    //   localStorage.clear();
    //   dispatch(clearUser());
    //   navigate('/login');
    // }
    console.log('Выход выполнен');
    setShowModal(false);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <svg className="logo" width="18" height="18">
            <use href="#icon--Money-Guard-2"></use>
          </svg> 
          <span className="title">Money Guard</span>
        </div>
        <div className="header-right">
          <span className="username">{username}</span>
          <button
            className="exit-button"
            onClick={() => setShowModal(true)}
          >
          <svg style={{ display: 'none' }}>
            <symbol id="icon-Group-7" viewBox="0 0 32 32">
              <path d="M20.051 23.237h2.499v4.997c0 2.067-1.681 3.748-3.748 3.748h-15.054c-2.066 0-3.748-1.681-3.748-3.748v-24.486c0-2.066 1.681-3.748 3.748-3.748h15.054c2.067 0 3.748 1.681 3.748 3.748v4.997h-2.499v-4.997c0-0.689-0.56-1.249-1.249-1.249h-15.054c-0.689 0-1.249 0.561-1.249 1.249v24.486c0 0.689 0.561 1.249 1.249 1.249h15.054c0.689 0 1.249-0.561 1.249-1.249v-4.997zM26.111 10.102l-1.767 1.767 2.873 2.874h-16.161v2.499h16.161l-2.873 2.873 1.767 1.767 5.889-5.889-5.889-5.89z"></path>
            </symbol>
          </svg>
          <svg className="icon" width="32" height="32">
            <use href="#icon-Group-7"></use>
            </svg>
            <span>Exit</span>
          </button>
        </div>
      </header>

      {/* Logout Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-inner">
              <svg style={{ display: 'none' }}>
                <symbol id="icon--Money-Guard-2" viewBox="0 0 32 32">
                  <path
                    fill="#ffc727"
                    style={{ fill: 'var(--color1, #ffc727)' }}
                    d="M22.25 4.181c-2.153-0.538-4.307-1.615-5.922-3.23-1.615 1.615-3.769 2.692-5.922 3.23 0.538 4.845 2.154 8.076 5.922 10.768 3.769-2.692 5.922-5.922 5.922-10.768z"
                  />
                  <path
                    fill="#fbfbfb"
                    style={{ fill: 'var(--color2, #fbfbfb)' }}
                    d="M20.097 24.227l-15.075-17.766v8.614l11.844 13.459 3.23-4.307z"
                  />
                  <path
                    fill="#fbfbfb"
                    style={{ fill: 'var(--color2, #fbfbfb)' }}
                    d="M21.712 22.612l6.461-7.537v-8.076l-10.229 11.844 3.769 3.769z"
                  />
                  <path
                    fill="#fbfbfb"
                    style={{ fill: 'var(--color2, #fbfbfb)' }}
                    d="M22.25 25.304v4.845l5.922-6.999v-4.846l-5.922 6.999z"
                  />
                  <path
                    fill="#fbfbfb"
                    style={{ fill: 'var(--color2, #fbfbfb)' }}
                    d="M10.944 25.304l-5.922-6.999v4.846l5.922 6.999v-4.845z"
                  />
                </symbol>
              </svg>
              <svg className="logo2" width="36" height="36">
                <use href="#icon--Money-Guard-2"></use>
              </svg> 
              <h2 className="modal-title">Money Guard</h2>
              <p className="modal-text">Are you sure you want to log out?</p>
              <button
                className="logout-button"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowModal(false)}
              >
                CANCEL
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderWithLogoutModal;
