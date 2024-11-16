// import DarkmodeSelector from './DarkmodeSelector';
import { Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";

function Navigation() {
  return (
    <Flowbite>
      <Navbar fluid rounded>
        {/* <Navbar.Brand href="https://waynegraham.github.io/white-to-blue">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            BJJ Study Guide
          </span>
        </Navbar.Brand> */}
        <div className="flex md:order-2">
          <Navbar.Toggle />
          <DarkThemeToggle />
        </div>
        
        <Navbar.Collapse>
          <Navbar.Link
            className="hover:underline md:hover:text-blue-900 md:text-blue-700 underline bg-blue-800 dark:md:hover:text-blue-200"
            href="https://waynegraham.github.io/white-to-blue"
            active
          >
            White to Blue
          </Navbar.Link>
          <Navbar.Link
            className="hover:underline md:text-purple-700 md:hover:text-purple-900"
            href="https://waynegraham.github.io/blue-to-purple"
          >
            Blue to Purple
          </Navbar.Link>
          <Navbar.Link
            className="hover:underline md:hover:text-yellow-900"
            href="https://waynegraham.github.io/purple-to-brown"
          >
            Purple to Brown
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </Flowbite>
  );
}
// function Navigation() {
//   return (
//     // from https://www.freecodecamp.org/news/how-to-build-a-dark-mode-switcher-with-tailwind-css-and-flowbite/
//     <nav className="bg-white border-gray-200 px- bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         <a href="https://waynegraham.github.io/white-to-blue" className="flex">
//           <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white underline underline-offset-8">White to Blue</span>
//         </a>
//         <a href="https://waynegraham.github.io/blue-to-purple/" className="flex">
//           <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Blue to Purple</span>
//         </a>

//         <a href="#" className="flex">
//           <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Purple to Brown</span>
//         </a>

//         <div className="flex md:order-2">
//           {/* <DarkmodeSelector /> Darkmode toggle   */}
//         </div>
//       </div>
//     </nav>
//   );
// }

export default Navigation;
