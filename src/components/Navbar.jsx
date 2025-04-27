import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#f5f5f5',
        position: 'relative', // important for dropdown positioning
        height: '70px', // fixed height to prevent extra scrolling
        boxSizing: 'border-box',
      }}
    >
      {/* Search Bar */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search"
          style={{
            width: '30%',
            padding: '8px 12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#e0e0e0',
            outline: 'none',
            fontSize: '14px',
          }}
        />
      </div>

      {/* Profile + Dropdown */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative', // relative to this for dropdown
          marginLeft: 'auto',
        }}
        onClick={toggleDropdown}
      >
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="profile"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginRight: '10px',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginRight: '5px',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'black' }}>Kalyani Kumar</span>
          <span style={{ fontSize: '12px', color: 'black' }}>Admin</span>
        </div>
        <ExpandMoreIcon style={{ fontSize: '20px' }} />

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '55px', // slightly adjusted for better look
              right: 0,
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              borderRadius: '8px',
              overflow: 'hidden',
              zIndex: 1000,
              width: '200px',
              animation: 'fadeIn 0.2s ease-in-out', // small animation
            }}
          >
            {['Manage Account', 'Change Password', 'Activity Log', 'Logout'].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  borderBottom: index !== 3 ? '1px solid #eee' : 'none', // no border for last item
                  color: 'black',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simple keyframes for dropdown animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Navbar;
