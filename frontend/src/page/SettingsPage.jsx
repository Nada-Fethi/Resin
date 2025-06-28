// eslint-disable-next-line no-unused-vars
import React from "react";
import SettingsCard from "./SettingsCard";

const SettingsPage = () => {
  // Group all settings data in a single object for better organization
  const settingsData = {
    quickActions: [
      {
        label: "Edit Profile",
        icon: "✏️",
        action: () => alert("Edit Profile clicked"),
      },
      {
        label: "Change Password",
        icon: "🔒",
        action: () => alert("Change Password clicked"),
      },
      {
        label: "Notifications",
        icon: "🔔",
        action: () => alert("Notifications clicked"),
      },
    ],
    privacySettings: [
      {
        label: "Who can see my posts?",
        icon: "👁️",
        action: () => alert("Privacy settings clicked"),
      },
      {
        label: "Blocked Users",
        icon: "🚫",
        action: () => alert("Blocked users list"),
      },
    ],
    helpCenter: [
      {
        label: "FAQ",
        icon: "❓",
        action: () => alert("FAQ clicked"),
      },
      {
        label: "Contact Support",
        icon: "📞",
        action: () => alert("Contact Support clicked"),
      },
    ],
  };

  return (
    <main className="settings-page">
      <h1 className="settings-title">Settings</h1>
      <div className="settings-grid">
        <SettingsCard 
          title="Quick Actions" 
          options={settingsData.quickActions} 
          className="quick-actions-card"
        />
        <SettingsCard 
          title="Privacy Settings" 
          options={settingsData.privacySettings} 
          className="privacy-card"
        />
        <SettingsCard 
          title="Help Center" 
          options={settingsData.helpCenter} 
          className="help-center-card"
        />
      </div>
    </main>
  );
};

export default SettingsPage;