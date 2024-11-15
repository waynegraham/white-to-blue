import DarkmodeSelector from './DarkmodeSelector';

function Navigation() {
  return (
    // from https://www.freecodecamp.org/news/how-to-build-a-dark-mode-switcher-with-tailwind-css-and-flowbite/
    <nav className="bg-white border-gray-200 px- bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <a href="https://waynegraham.github.io/white-to-blue" className="flex">
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white underline underline-offset-8">White to Blue</span>
        </a>
        <a href="https://waynegraham.github.io/blue-to-purple/" className="flex">
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Blue to Purple</span>
        </a>

        <a href="https://waynegraham.github.io/purple-to-brown/" className="flex">
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Purple to Brown</span>
        </a>

        <div className="flex md:order-2">
          <DarkmodeSelector /> {/* Darkmode toggle */}  
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
