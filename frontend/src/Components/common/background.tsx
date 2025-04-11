import React, { useEffect, useState } from 'react';

interface BackgroundProps {
    className?: string;
    darkMode?: boolean; // Optionally keep the dark mode functionality
}

/**
 * Arrière-plan pour la page de connexion et autres..
 *
 * @param {string} className - Classes CSS optionnelles à ajouter au conteneur
 * @param {boolean} darkMode - Active ou désactive le mode sombre
 */
const Background: React.FC<BackgroundProps> = ({ className = '', darkMode = false }) => {
    return (
        <div className={`fixed inset-0 -z-10 ${className}`}>
            {/* Dégradé de fond principal */}
            <div
                className={`absolute inset-0 ${
                    darkMode ? 'bg-black-800' : 'bg-white-0'
                }`}
            ></div>

            {/* Motif de réseau abstrait */}
            <div
                className={`absolute inset-0 ${darkMode ? '' : 'opacity-[0.03]'}`}
                style={{
                    backgroundImage: `url("data:image/svg+xml, %3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                }}
            ></div>

            {/* Lignes de circuit numérique */}
            <div className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}>
                <div className={`absolute h-px w-3/4 ${darkMode ? 'bg-white-100' : 'bg-blue-600'} top-1/4 left-0`}></div>
                <div className={`absolute h-px w-1/2 ${darkMode ? 'bg-white-100' : 'bg-blue-600'} top-1/3 right-0`}></div>
                <div className={`absolute h-px w-2/3 ${darkMode ? 'bg-white-100' : 'bg-blue-600'} top-2/3 left-1/4`}></div>
                <div className={`absolute w-px h-1/2 ${darkMode ? 'bg-white-100' : 'bg-blue-600'} left-1/4 top-0`}></div>
                <div className={`absolute w-px h-3/4 ${darkMode ? 'bg-white-100' : 'bg-blue-600'} left-1/2 bottom-0`}></div>
                <div className={`absolute w-px h-2/3 ${darkMode ? 'bg-white-100' : 'bg-blue-600'} right-1/4 top-1/3`}></div>
            </div>

            {/* Plus grands cercles */}
            <div
                className={`absolute h-4 w-4 rounded-full ${
                    darkMode ? 'bg-neutral-600/30' : 'bg-blue-500/20'
                } top-1/4 left-1/4`}
            ></div>
            <div
                className={`absolute h-6 w-6 rounded-full ${
                    darkMode ? 'bg-neutral-600/20' : 'bg-blue-500/10'
                } bottom-1/3 right-1/4`}
            ></div>
            <div
                className={`absolute h-8 w-8 rounded-full ${
                    darkMode ? 'bg-neutral-600/20' : 'bg-blue-500/10'
                } top-2/3 left-2/3`}
            ></div>
            <div
                className={`absolute h-3 w-3 rounded-full ${
                    darkMode ? 'bg-neutral-600/30' : 'bg-blue-500/20'
                } top-1/3 right-1/3`}
            ></div>

            {/* Dégradé subtil */}
            <div
                className={`absolute inset-0 bg-gradient-to-t ${
                    darkMode ? 'from-transparent via-transparent to-gray-900/30' : 'from-transparent via-transparent to-blue-100/30'
                }`}
            ></div>
        </div>
    );
};

export default Background;