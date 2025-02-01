import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST } from "@/lib/constants";
import { getColor } from "@/lib/utils";
import { FaUserPlus, FaUserMinus, FaEdit, FaCamera } from "react-icons/fa";
import { useState, useRef } from "react";
import apiClient from "@/lib/api-client";
import {
  ADD_MEMBER_ROUTE,
  REMOVE_MEMBER_ROUTE,
  CHANGE_GROUP_NAME_ROUTE,
  SET_GROUP_PHOTO_ROUTE,
  UPDATE_PROFILE_IMAGE_ROUTE,
} from "@/lib/constants";
import { toast } from "sonner";

const ChatHeader = () => {
  const {
    selectedChatData,
    closeChat,
    selectedChatType,
    userInfo,
    setSelectedChatData,
  } = useAppStore();
  const [showAdminOptions, setShowAdminOptions] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [memberToRemoveEmail, setMemberToRemoveEmail] = useState("");
  const fileInputRef = useRef(null);

  const isAdmin = selectedChatData?.admin === userInfo?.id;

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const addMember = async () => {
    try {
      const response = await apiClient.post(
        ADD_MEMBER_ROUTE,
        {
          channelId: selectedChatData._id,
          email: newMemberEmail,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Member added successfully");
        setNewMemberEmail("");
        // Update the chat data to reflect the new member
        setSelectedChatData((prev) => ({
          ...prev,
          members: [...prev.members, response.data.newMember], // Assuming the API returns the new member
        }));
      }
    } catch (error) {
      console.error("Failed to add member:", error);
      toast.error("Failed to add member. Please check the email ID.");
    }
  };

  const removeMember = async () => {
    try {
      const response = await apiClient.delete(REMOVE_MEMBER_ROUTE, {
        data: { channelId: selectedChatData._id, email: memberToRemoveEmail },
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Member removed successfully");
        setMemberToRemoveEmail("");
        // Update the chat data to remove the member
        setSelectedChatData((prev) => ({
          ...prev,
          members: prev.members.filter(
            (member) => member.email !== memberToRemoveEmail
          ),
        }));
      }
    } catch (error) {
      console.error("Failed to remove member:", error);
      toast.error("Failed to remove member. Please check the email ID.");
    }
  };

  const changeGroupName = async () => {
    try {
      const response = await apiClient.put(
        CHANGE_GROUP_NAME_ROUTE,
        {
          channelId: selectedChatData._id,
          name: newGroupName,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Group name updated successfully");
        setNewGroupName("");
        // Update the state immediately
        setSelectedChatData((prev) => ({
          ...prev,
          name: newGroupName,
        }));
      }
    } catch (error) {
      console.error("Failed to change group name:", error);
      toast.error("Failed to change group name.");
    }
  };

  const setProfilePhoto = async (file) => {
    if (!file) {
      toast.success("Please select a file");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("channelId", selectedChatData._id);

      const response = await apiClient.post(SET_GROUP_PHOTO_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200 && response.data.photoUrl) {
        setSelectedChatData((prev) => ({
          ...prev,
          photo: response.data.photoUrl,
        }));
        toast.success("Profile photo updated successfully");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload photo");
    }
  };

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative flex items-center justify-center">
            {selectedChatType === "contact" ? (
              <Avatar
                className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
                onClick={handleAvatarClick}
              >
                {selectedChatData.image ? (
                  <AvatarImage
                    src={selectedChatData.image}
                    alt="profile"
                    className="object-cover w-full h-full bg-black rounded-full"
                  />
                ) : (
                  <div
                    className={`uppercase w-12 h-12 text-lg border-[1px] ${getColor(
                      selectedChatData.color
                    )} flex items-center justify-center rounded-full`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div
                className={`bg-[#ffffff22] py-3 px-5 flex items-center justify-center rounded-full cursor-pointer`}
                onClick={handleAvatarClick}
              >
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" &&
            selectedChatData.firstName &&
            selectedChatData.lastName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : ""}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        {selectedChatType === "channel" && isAdmin && (
          <div className="relative">
            <button
              className="text-neutral-300 hover:text-white transition-all duration-300"
              onClick={() => setShowAdminOptions(!showAdminOptions)}
            >
              <FaEdit className="text-2xl" />
            </button>
            {showAdminOptions && (
              <div className="absolute right-0 mt-2 w-64 bg-[#2a2b33] rounded-lg shadow-lg p-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-sm text-white/80 mb-1">
                      Add Member (Email ID):
                    </label>
                    <input
                      type="email"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className="w-full p-2 bg-[#3a3b45] rounded text-white"
                    />
                    <button
                      onClick={addMember}
                      className="mt-2 w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
                    >
                      <FaUserPlus className="inline-block mr-2" /> Add Member
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-1">
                      Remove Member (Email ID):
                    </label>
                    <input
                      type="email"
                      value={memberToRemoveEmail}
                      onChange={(e) => setMemberToRemoveEmail(e.target.value)}
                      className="w-full p-2 bg-[#3a3b45] rounded text-white"
                    />
                    <button
                      onClick={removeMember}
                      className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    >
                      <FaUserMinus className="inline-block mr-2" /> Remove
                      Member
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm text-white/80 mb-1">
                      Change Group Name:
                    </label>
                    <input
                      type="text"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="w-full p-2 bg-[#3a3b45] rounded text-white"
                    />
                    <button
                      onClick={changeGroupName}
                      className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                      <FaEdit className="inline-block mr-2" /> Change Name
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <button
          className="text-neutral-300 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
          onClick={closeChat}
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>

      {/* Hidden file input for profile photo upload */}
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setProfilePhoto(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default ChatHeader;