import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('URL');
  const [showInputs, setShowInputs] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (selectedOption === 'URL' && inputUrl && !youtubeRegex.test(inputUrl)) {
      setErrorMessage('Please enter a valid YouTube URL.');
    } else {
      setErrorMessage('');
    }
  };

  const handleGenerateSummary = () => {
    if ((selectedOption === 'URL' && (!url.trim() || errorMessage)) || 
        (selectedOption === 'Video' && (!videoFile || errorMessage))) {
      alert('Please provide a valid input.');
      return;
    }
    setIsSummaryGenerated(true);
    alert(`Generating summary for: ${url || fileName}`);
  };

  const handleGenerateImage = async () => {
    if (selectedOption === 'Describe' && !url.trim()) {
      alert('Please enter a description.');
      return;
    }

    try {
      const response = await axios.post('https://your-api-endpoint.com/generate-images', { url, videoFile });
      setImages(response.data.images);
      setShowInputs(true);
    } catch (error) {
      console.error('Error generating images:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setUrl('');
    setShowInputs(false);
    setVideoFile(null);
    setFileName('');
    setIsSummaryGenerated(false);
    setImages([]);
    setErrorMessage('');
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'video/mp4') {
      setErrorMessage('Please upload a valid .mp4 video file.');
      setVideoFile(null);
      setFileName('');
    } else {
      setErrorMessage('');
      setVideoFile(file);
      setFileName(file?.name || '');
    }
  };

  return (
    <div className='flex h-screen'>
      <div className='w-2/5' style={{ backgroundColor: 'rgb(11, 2, 27)', overflow: 'hidden' }}>
        <div className='p-4 flex flex-col items-center text-white h-full'>
          <div className='flex space-x-2 mb-4'>
            <button
              onClick={() => handleOptionChange('Describe')}
              className={`py-2 px-4 rounded-lg ${selectedOption === 'Describe' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
            >
              Describe
            </button>
            <button
              onClick={() => handleOptionChange('Video')}
              className={`py-2 px-4 rounded-lg ${selectedOption === 'Video' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
            >
              Video/MP4
            </button>
            <button
              onClick={() => handleOptionChange('URL')}
              className={`py-2 px-4 rounded-lg ${selectedOption === 'URL' ? 'bg-blue-500' : 'bg-gray-600'} hover:bg-blue-600`}
            >
              URL
            </button>
          </div>

          {selectedOption === 'Describe' && (
            <input
              type='text'
              placeholder='Enter description'
              value={url}
              onChange={handleInputChange}
              className='p-2 text-black text-base rounded-lg outline-none w-full h-3/5 mb-4'
              style={{ height: '60%', fontSize: '1.25rem' }}
            />
          )}

          {selectedOption === 'Video' && (
            <div style={{ marginLeft: '80%' }} className='w-full mb-4'>
              <input
                type='file'
                accept='video/mp4'
                onChange={handleVideoUpload}
                className='p-2 text-black text-base rounded-lg outline-none w-full h-14 mb-2'
              />
              {fileName && <p className='text-sm text-green-500'>Selected file: {fileName}</p>}
            </div>
          )}

          {selectedOption === 'URL' && (
            <input
              type='text'
              placeholder='Enter YouTube URL'
              value={url}
              onChange={handleInputChange}
              className='p-2 text-black text-base rounded-lg outline-none w-full mb-4'
            />
          )}

          <div className='mt-4'>
            {selectedOption === 'Describe' ? (
              <button
                onClick={handleGenerateImage}
                className='bg-purple-500 hover:bg-purple-600 text-white text-base py-2 px-6 rounded-lg'
              >
                Generate Image
              </button>
            ) : (
              <button
                onClick={handleGenerateSummary}
                className='bg-green-500 hover:bg-green-600 text-white text-base py-2 px-4 rounded-lg'
              >
                Generate Summary
              </button>
            )}
          </div>
        </div>
      </div>

      <div className='w-4/5' style={{ backgroundColor: 'rgb(196, 185, 214)' }}>
        <h1 className='text-black text-2xl mb-4'>Main Content Area</h1>

        {!isSummaryGenerated && selectedOption !== 'Describe' && (
          <div className='text-center text-gray-500'>
            Please click "Generate Summary" to enable further actions.
          </div>
        )}

        {isSummaryGenerated && selectedOption !== 'Describe' && (
          <textarea
            placeholder='Input from backend'
            className='w-full h-1/2 p-4 text-black text-base rounded-lg outline-none mb-4 resize-none'
          ></textarea>
        )}

        {isSummaryGenerated && (
          <div className='flex justify-center'>
            <button
              onClick={handleGenerateImage}
              className='bg-purple-500 hover:bg-purple-600 text-white text-base py-2 px-6 rounded-lg mt-4'
            >
              Generate Image
            </button>
          </div>
        )}

        {showInputs && (
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <img src={image} alt={`Generated ${index + 1}`} className='w-full h-auto mb-4' />
                  <input
                    type='text'
                    placeholder={`Image Input ${index + 1}`}
                    className='p-2 text-black text-base rounded-lg outline-none w-full h-14 mb-4'
                  />
                </div>
              ))
            ) : (
              <div className='text-center text-gray-500'>No images generated yet.</div>
            )}
          </div>
        )}

        {errorMessage && (
          <div className='text-red-500 text-center mt-4'>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
