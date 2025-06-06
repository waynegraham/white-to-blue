import { useState } from 'react'
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
// import { IconContext } from "react-icons";

function Toggle() {

    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return (
        <div className="bg-yellow-500">
            <button onClick={()=> darkModeHandler()}>
                {
                    
                    dark && <IoSunny />
                }
                {
                    !dark && <IoMoon />
                }
            </button>
        </div>
    );
}

export default Toggle;