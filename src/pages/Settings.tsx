import { useState } from "react";
import PageWrapper from "../features/dashboard/components/PageWrapper";

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Call API to update password
    console.log("Current:", currentPassword);
    console.log("New:", newPassword);

    // Dummy feedback
    setMessage("✅ Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <PageWrapper title="Settings" description="Manage your account settings.">
      <form
        onSubmit={handlePasswordChange}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#5C4033]"
          required
        />

        <button
          type="submit"
          className="bg-[#5C4033] hover:bg-[#4a3329] text-white py-2 px-4 rounded w-full transition"
        >
          Change Password
        </button>

        {message && (
          <p className="text-green-600 mt-4 text-sm text-center">{message}</p>
        )}
      </form>
    </PageWrapper>
  );
};

export default Settings;
