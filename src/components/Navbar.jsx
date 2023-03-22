import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { styles } from '../styles'
import { navLinks } from '../constants/index'
import { favicon, menu, close } from '../assets'

const Navbar = () => {
    const [active, setActive] = useState('')
    const [toggle, setToggle] = useState(false)

    return (
        <nav
            className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive('')
                        window.scrollTo(0, 0)
                    }}
                >
                    <img
                        src={favicon}
                        alt="logo"
                        className="w-9 h-9 object-contain"
                    />
                    <p className="text-white tex-[18px] font-bild cursor-pointer flex">
                        Kendrick Bong &nbsp;
                        <span className="sm:block hidden"> | Portfolio</span>
                    </p>
                </Link>
                <button class="bg-transparent hover:bg-gray-400 hover:text-white font-bold py-2 px-4 rounded inline-flex border border-blue-300 hover:border-transparent items-center">
                    <svg
                        class="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <a href="../../public/Resume.pdf" download>
                        Resume
                    </a>
                </button>
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((link) => (
                        <li
                            key={link.id}
                            className={`${
                                active === link.title
                                    ? 'text-white'
                                    : 'text-secondary'
                            } hover:text-white text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(link.title)}
                        >
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <img
                        src={toggle ? close : menu}
                        alt="menu"
                        className="w-[28px] h-[28-px] object-contain cursor-pointer"
                        onClick={() => setToggle(!toggle)}
                    />
                    <div
                        className={`${
                            !toggle ? 'hidden' : 'flex'
                        } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w[140px] z-10 rounded-xl`}
                    >
                        <ul className="list-none flex justify-end items-start flex-col gap-4">
                            {navLinks.map((link) => (
                                <li
                                    key={link.id}
                                    className={`${
                                        active === link.title
                                            ? 'text-white'
                                            : 'text-secondary'
                                    } font-poppins font-medium curost-pointer tex-[16px]`}
                                    onClick={() => {
                                        setActive(link.title)
                                        setToggle(!toggle)
                                    }}
                                >
                                    <a href={`#${link.id}`}>{link.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
