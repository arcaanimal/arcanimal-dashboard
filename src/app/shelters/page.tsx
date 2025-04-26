"use client";

import React from "react";
import Layout from "@/app/components/shared/layout/index";
import ShelterCard from "@/app/components/features/Shelters/components/SheltersCard";
import ContactedSheltersTable from "@/app/components/features/Shelters/components/ContactedSheltersTable";
import { useSheltersAll } from "../hooks/shelters/useSheltersAll";
import { useContactedShelters } from "../hooks/shelters/useContactedShelters";

interface Shelter {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  whatsapp: string;
  address: string;
  capacity: number;
  status: "Ativo" | "Pendente";
  is_contact_done: boolean;
  admin_contacter: string;
  createdAt: string;
}

const SheltersPage: React.FC = () => {
  const { data, isLoading, error } = useSheltersAll();
  const { data: contactedShelters } = useContactedShelters();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar abrigos</p>;
  if (!data?.shelters?.length) return <p>Nenhum abrigo encontrado.</p>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Abrigos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {data.shelters.map((shelter) => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Abrigos Contatados
      </h3>
      <ContactedSheltersTable shelters={contactedShelters?.shelters || []} />
    </Layout>
  );
};

export default SheltersPage;
