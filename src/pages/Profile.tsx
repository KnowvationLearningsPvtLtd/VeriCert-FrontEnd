import { useState, ChangeEvent } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { userProfileAtom } from "../store/profileAtoms";
import { motion } from "framer-motion";

const Profile = () => {
  const [profile, setProfile] = useRecoilState(userProfileAtom);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfile(prev => ({ ...prev, profilePic: "" }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brown-100 p-6">
      <div className="w-full sm:w-96 bg-[#d1b0a2] p-6 rounded-lg shadow-lg text-center">
        {isEditing ? (
          <>
            <h2 className="text-2xl font-bold text-brown-800 mb-6">Edit Profile</h2>

            {/* Title */}
            <div className="mb-4 text-left">
              <label className="block text-sm font-medium text-brown-600">Title</label>
              <select
                name="title"
                value={profile.title}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-brown-300 rounded-md focus:ring-brown-500"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>

            {/* Input Fields */}
            {["name", "designation", "companyOrCollege", "email", "contact"].map((field) => (
              <div key={field} className="mb-4 text-left">
                <label className="block text-sm font-medium text-brown-600 capitalize">{field === "companyOrCollege" ? "Company/College" : field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={profile[field as keyof typeof profile] as string}
                  onChange={handleChange}
                  className="mt-1 p-3 w-full border border-brown-300 rounded-md focus:ring-brown-500"
                />
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={handleSave}
              className="w-full py-2 px-4 bg-[#2c1c15] text-white font-semibold rounded-lg hover:bg-opacity-90"
            >
              SAVE CHANGES
            </motion.button>
          </>
        ) : (
          <>
            {/* Profile Image */}
            <div className="flex justify-center mb-6 relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-brown-200">
                {profile.profilePic ? (
                  <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <FaUser className="w-full h-full text-brown-500" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer border-2 border-brown-200">
                <FaEdit className="text-brown-600 text-lg" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {profile.profilePic && (
              <button
                onClick={handleRemoveImage}
                className="text-brown-500 text-sm hover:underline mt-2"
              >
                Remove Picture
              </button>
            )}

            {/* Display Info */}
            <h2 className="text-3xl font-semibold text-brown-800 mt-4">
              {profile.title} {profile.name}
            </h2>
            <p className="text-lg text-brown-600 mt-1">
              {profile.designation} at {profile.companyOrCollege}
            </p>
            <p className="text-sm text-brown-500 mt-1">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
            <p className="text-sm text-brown-500 mt-1">{profile.contact}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 py-2 px-4 bg-[#5C4033] text-white font-semibold rounded-lg hover:bg-opacity-90"
            >
              EDIT PROFILE
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
