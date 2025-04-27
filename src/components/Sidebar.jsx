import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Sidebar() {
  const location = useLocation();
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const sidebarStyle = {
    width: '220px',
    height: '100%',
    background: '#fff',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRight: '1px solid #ddd',
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#0d6efd' : '#333',
    textDecoration: 'none',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
  });

  const subLinkStyle = (path) => ({
    ...linkStyle(path),
    marginLeft: '20px',
    fontSize: '16px',
  });

  const iconStyle = {
    transform: isBlogOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    marginLeft: '8px',
  };

  return (
    <div style={sidebarStyle}>
      <h2>My App</h2>
      <Link to="/" style={linkStyle('/')}>Dashboard</Link>
      <Link to="/Article" style={linkStyle('/Article')}>Article</Link>
      <Link to="/Career" style={linkStyle('/Career')}>Career</Link>

      <div>
        <div
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', ...linkStyle('/blog') }}
          onClick={() => setIsBlogOpen(!isBlogOpen)}
        >
          Blog
          <ExpandMoreIcon style={iconStyle} />
        </div>
        {isBlogOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            <Link to="/blog-category" style={subLinkStyle('/blog-category')}>Blog Category</Link>
            <Link to="/blog" style={subLinkStyle('/blog')}>Blog</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
