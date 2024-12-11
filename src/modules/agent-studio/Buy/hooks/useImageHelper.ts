import l2ServicesAPI from '@/services/api/l2services';

const useImageHelper = () => {
  const downloadImage = async (url: string) => {
    const a = document.createElement('a');
    a.setAttribute('download', `${new Date()}.png`);
    a.setAttribute('href', url);
    a.click();
  };

  const uploadFile = async (file: File) => {
    const url = await l2ServicesAPI.uploadFile({ file });
    return url;
  };

  const shareToTwitter = async (content: string) => {
    try {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`,
        '_blank',
      );
    } catch (error) {
      //
    }
  };

  return {
    downloadImage,
    uploadFile,
    shareToTwitter,
  };
};

export default useImageHelper;
