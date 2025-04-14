import { useState, ChangeEvent, useEffect } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../store/profileAtoms";

import { authState } from "../store/authAtom";

const Profile = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [auth] = useRecoilState(authState);
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    // Populate profile data from auth or fetch if needed
    if (auth?.user) {
      setUserProfile({
        ...userProfile,
        name: auth.user.username || "",
        email: auth.user.email || "",
        userId: auth.user._id || "",
      });
    }
  }, [auth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile({ ...userProfile, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  // Remove profile picture
  const handleRemoveImage = () => {
    setUserProfile({ ...userProfile, profilePic: "" });
  };

  const handleSave = async () => {
    setIsEditing(false);
  };

  useEffect(() => {
    // Fetch or initialize the profile data (if required)
    // For now, using the default state in recoil.
  }, []);

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 overflow-hidden">
  {/* Profile Section */}
  <div className="w-full sm:w-96 text-center">
    {isEditing ? (
      <>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Title</label>
          <select
            name="title"
            value={userProfile.title}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          >
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Dr.">Dr.</option>
            <option value="Prof.">Prof.</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Designation</label>
          <input
            type="text"
            name="designation"
            value={userProfile.designation}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            {userProfile.role === "issuer" ? "College" : "Company"}
          </label>
          <input
            type="text"
            name="companyOrCollege"
            value={userProfile.companyOrCollege}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={userProfile.email}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Contact</label>
          <input
            type="text"
            name="contact"
            value={userProfile.contact}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full mt-4 hover:bg-blue-600 transition duration-200"
        >
          SAVE CHANGES
        </button>
      </>
    ) : (
      <>
        <div className="flex justify-center mb-6">
          {/* Profile Image Circle */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-200">
              {userProfile.profilePic ? (
                <img
                  src={userProfile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="w-full h-full text-gray-500" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer border-2 border-gray-200">
              <FaEdit className="text-gray-600 text-lg" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {userProfile.profilePic && (
          <div className="flex justify-center items-center mt-2">
            <button
              onClick={handleRemoveImage}
              className="text-black-500 text-sm flex items-center gap-2 hover:underline"
            >
              Remove Picture
            </button>
          </div>
        )}

        <h2 className="text-4xl font-semibold text-gray-800 mt-4">
          {userProfile.title} {userProfile.name}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          {userProfile.designation} at {userProfile.companyOrCollege}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          <a href={`mailto:${userProfile.email}`} className="text-blue-500">
            {userProfile.email}
          </a>
        </p>
        <p className="text-sm text-gray-500 mt-2">{userProfile.contact}</p>
        <div className="mt-6">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            EDIT PROFILE
          </button>
        </div>
      </>
    )}
  </div>
</div>
);
};

export default Profile;