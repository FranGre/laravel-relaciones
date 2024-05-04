import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../router'

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <nav className="flex pb-6">
                <div className="flex items-center justify-between w-full"> {/* Div para alinear elementos en el NavBar */}
                    <div className="block md:hidden"> {/* Mostrar solo en dispositivos pequeños */}
                        <button onClick={toggleMenu}>
                            <svg
                                className="h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul className={`md:flex ${isOpen ? 'block' : 'hidden'}`}> {/* Mostrar en dispositivos más grandes */}
                        {routes.map((route) => (
                            <li key={route.path} className="py-2 px-3">
                                <Link to={route.path}>{route.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    )
}
