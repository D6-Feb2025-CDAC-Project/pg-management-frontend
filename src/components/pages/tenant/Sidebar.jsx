import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlignLeft } from 'lucide-react';
import { menuItems } from './data/data';
import NavItem from './NavItem';
import { Tooltip } from 'react-tooltip';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    console.log("Inside sidebar");
    return (
        <div>
            <motion.div
                initial={{ width: 60 }}
                animate={{ width: isOpen ? 220 : 60 }}
                transition={{ duration: 0.4 }}
                className="bg-purple-600 h-screen text-white p-4 "
            >
                <button onClick={() => setIsOpen((prev) => !prev)} className="mb-10">
                    <AlignLeft />
                </button>
                <nav className="flex flex-col gap-11">
                    {menuItems.map((item) =>
                        <NavItem key={item.text} icon={item.icon} text={item.text} isOpen={isOpen} setIsOpen={setIsOpen} url={item.url} />)}
                </nav>
            </motion.div>
            {!isOpen && <Tooltip id="sidebar-tooltip" />}
        </div>
    )
}

export default Sidebar
