// eslint-disable-next-line no-unused-vars
import React from "react";

const SettingsCard = ({ title, options }) => {
  return (
    <div className="e  rounded-lg shadow-sm p-6 mb-6  min-h-[1024px] bg-purple-300 settings-card colorm main-contain">
      <h3 className="p text-gray-600">{title}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={option.action}>
              <span className="icon">{option.icon}</span>
              <span className="p text-gray-700"> {option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsCard;