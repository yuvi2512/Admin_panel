import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // 👈 import Toaster
import Dashboard from "./pages/Dashboard";
import Article from "./pages/Article";
import Blog from "./pages/Blog";
import Blogcategory from "./pages/Blog-category";
import Career from "./pages/Career";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // ensures full height
        background: "linear-gradient(200deg, #f2714eff 30%, #ebebebf0 70%)",
        backgroundSize: "200% 200%",
        animation: "backgroundShift 4s ease infinite",
      }}
    >
      <Navbar />
      <Toaster position="bottom-right" reverseOrder={false} />
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100%", // Ensure it takes full remaining space below Navbar
          overflow: "hidden", // Prevent vertical scrolling on the main container
        }}
      >
        <Sidebar sx={{ height: "100vh" }} />
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto", // Allow scrolling within content area
            boxSizing: "border-box",
            height: "100%", // Ensure full height of content section
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Article" element={<Article />} />
            <Route path="/Career" element={<Career />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-category" element={<Blogcategory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
