import { API_PATHS } from "./apiPaths.ts";
import api from "./axiosInstances";

const uploadImg = async (imgFile: File) => {
  const formData = new FormData();

  formData.append("image", imgFile);

  try {
    const response = await api.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
};

export default uploadImg;
