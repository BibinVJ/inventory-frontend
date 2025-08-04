import api from "./api";

export const updateProfile = async (data: any) => {
  const response = await api.post("/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateAddress = async (data: any) => {
  const response = await api.post("/profile/address", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateSocialLinks = async (data: any) => {
  const response = await api.post("/profile/social-links", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  const response = await api.post("/profile/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProfileImage = async () => {
  const response = await api.delete("/profile/profile-image");
  return response.data;
};
