// src/components/dashboard/JarsAllocation.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import JarsIcon from '@/utils/JarsIcon';

const formatJarName = (name) => {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// CẬP NHẬT: Component giờ sẽ nhận 'jars' làm prop
const JarsAllocation = ({ jars = [] }) => {
  // Nếu không có dữ liệu jars, hiển thị thông báo
  if (!jars || jars.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-text-secondary">No budget jars configured.</p>
        <Link to="/jars" className="text-text-accent hover:underline mt-2 inline-block">
          Set up your jars
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-text-primary">Jars Allocation</h3>
        <Link to="/jars" className="text-sm font-semibold text-text-accent hover:underline">
          Details »
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-y-6 text-center">
        {jars.map((jar) => {
          const iconInfo = JarsIcon[jar.name] || JarsIcon.Default;
          const { icon, color, bgLight } = iconInfo;

          return (
            // Sử dụng jar.id hoặc một giá trị duy nhất khác làm key
            <div key={jar.id || jar.name} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgLight} ${color} text-xl`}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <p className="text-sm font-medium text-text-secondary mt-2">
                {formatJarName(jar.name)}
              </p>
              <p className="font-bold text-text-primary">{`${(jar.percent * 100).toFixed(0)}%`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default JarsAllocation;