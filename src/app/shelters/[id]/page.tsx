"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useShelterById } from "@/app/hooks/shelters/useShelterById";
import { useContactShelter } from "@/app/hooks/shelters/useContactShelter";
import { useAuth } from "@/app/components/AuthProvider";
import { useRegisterActivity } from "@/app/hooks/activity/useRegisterActivity";

const ShelterDetailsPage = () => {
  const { id } = useParams();
  const { data: shelter, isLoading, isError } = useShelterById(id as string);
  const { mutate, isPending } = useContactShelter();
  const { user } = useAuth();
  const { mutate: registerActivity } = useRegisterActivity();
  const [contactMarked, setContactMarked] = useState(false);

  const handleContactDone = async () => {
    if (!shelter || !user) return;

    try {
      mutate(
        { id: shelter.id, admin_contacter: user.name },
        {
          onSuccess: () => {
            registerActivity({
              contact: `O admin: ${user.name} fez um contato com o abrigo: ${shelter.name}`,
            });
            setContactMarked(true); // atualiza o estado local
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div className="p-6">Carregando...</div>;
  if (isError || !shelter)
    return <div className="p-6 text-red-600">Erro ao carregar abrigo.</div>;

  const isAlreadyContacted = shelter.is_contact_done || contactMarked;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{shelter.name}</h1>
      <p className="text-gray-700 mb-2">
        📍 {shelter.address}, {shelter.city}
      </p>
      <p className="text-gray-700 mb-2">📞 {shelter.phone}</p>
      <p className="text-gray-700 mb-2">📧 {shelter.email}</p>
      <p className="text-gray-700 mb-2">
        🐾 Capacidade: {shelter.capacity} animais
      </p>
      <p className="text-gray-700 mb-6">
        📅 Cadastrado em: {new Date(shelter.createdAt).toLocaleDateString()}
      </p>

      <div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">
          Mensagem do abrigo
        </h2>
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {shelter.message || "Nenhuma mensagem fornecida."}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleContactDone}
          disabled={isAlreadyContacted || isPending}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow disabled:opacity-60"
        >
          {isAlreadyContacted
            ? "Contato já realizado"
            : "Marcar como contatado"}
        </button>
        <a
          href={`https://wa.me/${shelter?.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow"
        >
          Entrar em contato via WhatsApp
        </a>
      </div>

      {isAlreadyContacted && (
        <p className="mt-4 text-sm text-gray-600">
          Contato realizado por:{" "}
          <span className="font-medium">{user?.name || shelter.admin_contacter}</span>
        </p>
      )}
    </div>
  );
};

export default ShelterDetailsPage;
