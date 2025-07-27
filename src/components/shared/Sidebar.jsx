import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlignLeft } from 'lucide-react';
import NavItem from './NavItem';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

function Sidebar({ menuItems }) {
    const [isOpen, setIsOpen] = useState(false);
    console.log("Inside sidebar");
    const tooltipIdName = "sidebar-tooltip";
    return (
        <div>
            <motion.div
                initial={{ width: 60 }}
                animate={{ width: isOpen ? 220 : 60 }}
                transition={{ duration: 0.4 }}
                className="bg-purpleDark h-screen text-white p-4 "
            >
                <button onClick={() => setIsOpen((prev) => !prev)} className="mb-10">
                    <AlignLeft />
                </button>
                <nav className="flex flex-col gap-11">
                    {menuItems.map((item) =>
                        <NavItem key={item.text} icon={item.icon} text={item.text} isOpen={isOpen} setIsOpen={setIsOpen}
                            url={item.url} toolTipId={tooltipIdName} />)}
                </nav>
            </motion.div>
            <Tooltip id={tooltipIdName} />
        </div>
    )
}

export default Sidebar
