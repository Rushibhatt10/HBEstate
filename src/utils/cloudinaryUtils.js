/**
 * Uploads an image file to Cloudinary.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The secure URL of the uploaded image.
 */
export const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
        throw new Error("Cloudinary Cloud Name is missing. Please check your .env file and ensure VITE_CLOUDINARY_CLOUD_NAME is set.");
    }

    if (!uploadPreset) {
        throw new Error("Cloudinary Upload Preset is missing. Please check your .env file and ensure VITE_CLOUDINARY_UPLOAD_PRESET is set.");
    }

    if (!file) {
        throw new Error("No file selected for upload.");
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        throw new Error("Invalid file type. Please upload a valid image (JPEG, PNG, GIF, or WebP).");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        throw new Error("File size exceeds 5MB limit. Please choose a smaller image.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Upload failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
};
