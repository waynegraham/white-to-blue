import { useState } from 'react'
import './App.css'
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import movesData from "./data/moves.json"

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('')
  const [modalTitle, setModalTitle] = useState(''); // State for modal title


  const openModal = (videoId, title) => {
    setSelectedVideoId(videoId);
    setModalTitle(title); // Set modal title
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId('');
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">

    <Navigation /> {/* Navigation component */}
    <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-2">
    <h1
        className="inline-block font-extrabold bg-gradient-to-r from-zinc-100 to-blue-700 bg-clip-text text-7xl text-transparent"
      >
        White to Blue
      </h1>
    

      <h2 className="inline-block mt-5 mb-8 text-blue-600 dark:text-blue-300 text-2xl font-semibold tracking-tighter">
        Blue Belt Demonstration
      </h2>

      {movesData.map((move) => ( // Map through moves data
        <div key={move.label}>
          <h2 className="my-3 text-xl text-gray-900 dark:text-gray-300">{move.label}</h2>
          <ul className='list-disc ps-5 mt-2 space-y-1 dark:text-gray-300'>
            {move.moves.map((m) => ( // Map through each move
              <li key={m.name}>
                <a
                  href="#"
                  onClick={() => openModal(m.youtube, m.name)} // Open modal on click
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline dark:hover:text-blue-200"
                >
                  {m.name}
                </a>
                <span className="ml-2 dark:text-gray-300">- {m.note}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white w-11/12 h-11/12 flex flex-col rounded-lg"> {/* Modal container */}
                  <button onClick={closeModal} className="absolute top-2 right-2">X</button>
                  <h2 className="text-xl font-semibold mb-2">{modalTitle}</h2> {/* Display modal title */}
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* Aspect ratio 16:9 */}
                      <iframe 
                          className="absolute top-0 left-0 w-full h-full" // Fill the container
                          src={`https://www.youtube.com/embed/${selectedVideoId}`} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                      ></iframe>
                  </div>
                  <div className="flex justify-center mt-4"> {/* Center the button */}
                      <button onClick={closeModal} className="bg-blue-500 text-white px-4 py-2 my-2 rounded">Close</button>
                  </div>
              </div>
          </div>
      )}
      </main>
      <Footer />
    </section>
  )
}

export default App
