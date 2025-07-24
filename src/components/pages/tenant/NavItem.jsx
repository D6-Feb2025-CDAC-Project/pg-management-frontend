import React from 'react'
import { Link } from 'react-router-dom'

function NavItem({ icon, text, isOpen, setIsOpen, url }) {
    return (
        <div className="flex items-center gap-3 cursor-pointer w-full hover:text-purple-950">
            <span
                onClick={() => setIsOpen((prev) => !prev)}
                data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
                data-tooltip-content={!isOpen ? text : undefined}
                className="text-xl">{icon}</span>
            {isOpen && <div><Link to={url} > {text} </Link> </div>}
        </div >
    )
}

export default NavItem
