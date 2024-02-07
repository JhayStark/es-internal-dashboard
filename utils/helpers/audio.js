export const uploadAudioFile = async file => {
  const formData = new FormData();
  formData.append('audio', file);
  try {
    const response = await mtnApi.post('/advices/upload', formData);
    return { title: file.name, body: response.data.downloadURL };
  } catch (error) {
    alert('Failed to upload');
  }
};

export const uploadMulitpleFiles = async files => {
  const promises = files.map(file => uploadAudioFile(file));
  const results = await Promise.all(promises);
  return results || [];
};
