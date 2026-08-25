// src/components/Logo.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Logo = ({ className = '' }) => {
    return (
        <Link to="/" className={`flex items-center gap-2 ${className}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20"
            >
                <span className="text-white font-bold text-xl">M</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                MithilaSoft
            </span>
        </Link>
    )
}

export default Logo