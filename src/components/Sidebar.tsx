import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger & Close icons

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Introduction", path: "/" },
    { name: "Pythagoras Exercise", path: "/pythagorusexercise" },
    { name: "Activity", path: "/activity" },
    { name: "Ladder Problem", path: "/ladder" },
  ];

  return (
    <div>
      {/* Fixed Menu Icon */}
      <div
        className="fixed top-4 left-4 z-50  p-2 bg-gray-900 text-white rounded-full shadow-md cursor-pointer"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </div>

      {/* Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 bg-gray-900 text-white z-40 shadow-lg p-4">
          <nav className="mt-10 space-y-4 ">
            {menuItems.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)} // Close menu on navigation
                className="block p-2 text-lg font-medium hover:bg-gray-700 rounded transition-all"
              >
                {i + 1}. {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
