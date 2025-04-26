import React from 'react';
import { FaPaw, FaMapMarkerAlt } from 'react-icons/fa';

// Define the type for a single pet
interface Pet {
  image: string;
  name: string;
  breed: string;
  age: string;
  location: string;
}

// Define the props type for the PetsForAdoption component
interface PetsForAdoptionProps {
  pets: Pet[];
}

const PetsForAdoption: React.FC<PetsForAdoptionProps> = ({ pets }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Animais para Adoção</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-t-lg shadow-sm"
            />
            <div className="p-4">
              <h3 className="font-extrabold text-xl text-gray-800">{pet.name}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaPaw className="mr-1 w-4 h-4" /> {pet.breed} • {pet.age}
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <FaMapMarkerAlt className="mr-1 w-4 h-4" /> {pet.location}
              </div>
              <button
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 hover:scale-105"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 text-center">
        <a
          href="/pets"
          className="relative text-indigo-600 hover:text-indigo-800 font-semibold text-sm group"
        >
          Ver todos os animais
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
        <span className="text-gray-700 text-lg font-semibold">Em breve...</span>
      </div>
    </div>
  );
};


export default PetsForAdoption;