import React from "react";

const AdminFooter = () => {
  return (
    <footer className="mt-4 py-6 px-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
      <p>
        &copy; {new Date().getFullYear()} Khasra Khatauni. All rights reserved.
      </p>
      <p>
        Developed with <span className="text-red-500">♥</span> by Rank One Leads
      </p>
    </footer>
  );
};

export default AdminFooter;
