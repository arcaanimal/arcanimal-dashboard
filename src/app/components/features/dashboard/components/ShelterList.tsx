"use client";
import React from "react";
import { useSheltersAll } from "@/app/hooks/shelters/useSheltersLately";
import Link from "next/link";

const placeholderImages = [
  "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
];

const ShelterList: React.FC = () => {
  const { data, isLoading, error } = useSheltersAll();

  if (isLoading) return <div>Carregando...</div>;
  if (error || !data) return <div>Erro ao carregar abrigos.</div>;

  const shelters = data.shelters.map((shelter, index) => ({
    image: placeholderImages[index % placeholderImages.length],
    name: shelter.name,
    location: shelter.city,
    animals: shelter.capacity,
    status: shelter.status === "Ativo" ? "Ativo" : "Pendente",
    id: shelter.id
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Abrigos Recentes</h2>
      </div>

      <div className="divide-y divide-gray-100">
        {shelters.map((shelter, index) => (
          <Link href={`/shelters/${shelter.id}`}>
            <div
              key={index}
              className="p-4 flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white rounded-lg mx-4 my-2 cursor-pointer"
            >
              <img
                src={shelter.image}
                alt={shelter.name}
                className="w-16 h-16 rounded-full object-cover mr-4 shadow-md border-2 border-indigo-100"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {shelter.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {shelter.location} • {shelter.animals} animais
                </p>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  shelter.status === "Ativo"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {shelter.status}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 text-center border-t border-gray-100">
        <a
          href="/shelters"
          className="relative text-indigo-600 hover:text-indigo-800 font-semibold text-sm group"
        >
          Ver todos os abrigos
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>
    </div>
  );
};

export default ShelterList;
