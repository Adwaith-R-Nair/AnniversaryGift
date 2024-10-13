import React, { useState, useEffect } from 'react';
import { Heart, Gift } from 'lucide-react';
import './styles.css'; // Ensure you have a CSS file to style the components

const memories = [
  { 
    id: 1, 
    description: 'i lowkey love these moments<3<3', 
    images: [
      '/mylovr/Snapchat-1273594619.jpg',
      '/mylovr/Snapchat-1361986816.jpg',
      '/mylovr/IMG-20240211-WA0059.jpg',
      '/mylovr/Snapchat-896326480.jpg',
    ] 
  },
  { 
    id: 2, 
    description: 'we need god to manifest for us tooo!!!!!!', 
    images: [
      '/mylovr/IMG-20231126-WA0265.jpg',
      '/mylovr/IMG-20231126-WA0508.jpg',
      '/mylovr/IMG-20231126-WA0211.jpg',
    ] 
  },
  { 
    id: 3, 
    description: 'cringe yet lovely', 
    images: [
      '/mylovr/Snapchat-1943767954.jpg',
      '/mylovr/Snapchat-1066075730.jpg',
      '/mylovr/IMG-20231113-WA0102.jpg',
      '/mylovr/IMG-20231114-WA0107.jpg',
      '/mylovr/IMG-20231124-WA0015.jpg',
      '/mylovr/IMG-20240109-WA0011.jpg',
      '/mylovr/IMG-20240205-WA0045.jpg'
    ] 
  },
  { 
    id: 4, 
    description: 'terror for others pookie for mehhh..', 
    images: [
      '/mylovr/Snapchat-1253526135.jpg',
      '/mylovr/IMG-20240913-WA0053.jpg',
      '/mylovr/IMG-20240407-WA1029.jpg',
      '/mylovr/IMG-20240407-WA0136.jpg',
      '/mylovr/IMG-20240407-WA0076.jpg',
      '/mylovr/IMG-20240406-WA0005.jpg',
      '/mylovr/IMG-20231108-WA0023.jpg'
    ] 
  },
];

const LoveMessage = ({ message }) => (
  <div className="bg-purple-100 p-6 rounded-lg shadow-md mb-6 transform hover:scale-105 transition-transform duration-300 animate-fadeIn">
    <p className="text-purple-800 italic text-lg font-semibold font-dancing-script">{message}</p>
  </div>
);

const MemoryCard = ({ memory, index, onOpenGallery }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  // Automatic slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out'); // Set fade-out class before changing image
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % memory.images.length);
        setFadeClass('fade-in'); // Set fade-in class after changing image
      }, 300); // Duration must match CSS transition duration
    }, 3000); // Change image every 3 seconds

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [memory.images.length]);

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-slideIn`} style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative" style={{ paddingBottom: '177.78%', position: 'relative' }}> {/* 9:16 aspect ratio */}
        <img
          src={memory.images[currentImageIndex]}
          alt={memory.description}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${fadeClass}`} // Add transition opacity for smooth effect
        />
        {/* Caption styled as a message bubble */}
        <div className="absolute bottom-2 left-2 bg-white rounded-lg p-2 shadow-md">
          <p className="text-gray-800 text-sm">{memory.description}</p>
        </div>
        <div className="p-4 cursor-pointer hover:bg-purple-200 transition-colors duration-200" onClick={() => onOpenGallery(memory)}>
          <h3 className="text-transparent">{memory.description}</h3> {/* Hide original title */}
        </div>
      </div>
    </div>
  );
};

const Gallery = ({ images, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="bg-white rounded-lg p-4">
      <button className="text-red-500 float-right" onClick={onClose}>Close</button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <img src={image} alt={`Gallery item ${index + 1}`} className="w-full h-40 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300">
              <span className="text-white text-lg opacity-0 group-hover:opacity-100">Preview</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BoyfriendsPage = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showSecondLetter, setShowSecondLetter] = useState(false);
  const [timer, setTimer] = useState(0);

  const openGallery = (memory) => {
    setGalleryImages(memory.images.slice(0, 6)); // Limit to maximum of 6 images
    setShowGallery(true);
  };

  useEffect(() => {
    let interval;

    if (showSurprise) {
      setShowLetter(true); // Show first message immediately
      setTimer(0); // Reset timer when surprise is shown
      interval = setInterval(() => {
        setTimer((prev) => prev + 1); // Increment timer every second
      }, 1000);
    }

    if (timer === 120) { // 2 minutes in seconds
      setShowSecondLetter(true);
    }

    return () => {
      clearInterval(interval);
      if (!showSurprise) {
        setShowLetter(false); // Reset letter visibility when surprise is turned off
        setShowSecondLetter(false); // Reset second letter visibility
      }
    };
  }, [showSurprise, timer]);
 

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-400 to-purple-400 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-purple-800 mb-8 animate-bounce font-pacifico">
          for my amazing pookie boyfriend <Heart className="inline text-red-500 animate-pulse" />
        </h1>

        <LoveMessage message="Every moment with you is a treasure. Thank you for being the most wonderful partner I could ask for. Saranghaeyo jagiy <3<3<3" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} onOpenGallery={openGallery} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-purple-700 transition-colors duration-300 animate-wiggle font-pacifico"
            onClick={() => setShowSurprise(prev => !prev)} // Toggle surprise state
          >
            Surprise
            <Gift className="inline ml-2" />
          </button>
        </div>

        {showLetter && (
          <div className="bg-yellow-200 p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-3xl font-bold text-center font-dancing-script">Turn around bebo</h2>
            <p className="text-center font-pacifico">Wanna see a special surprise!</p>
          </div>
        )}

        {showSecondLetter && (
          <div className="bg-yellow-200 p-6 rounded-lg shadow-md mt-4">
            <h2 className="text-3xl font-bold text-center font-dancing-script">Sorry baby..</h2>
            <p className="text-center font-pacifico">this is the only way I can improve..</p>
            <p className="text-center font-pacifico">U know how much I love you.</p>
          </div>
        )}

        {showGallery && <Gallery images={galleryImages} onClose={() => setShowGallery(false)} />}
      </div>
    </div>
  );
};

export default BoyfriendsPage;
