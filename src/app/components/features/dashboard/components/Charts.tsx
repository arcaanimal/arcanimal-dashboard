import React from "react";
import SummaryCard from "./SummaryCard";
import RecentActivity from "./RecentActivity";
import ShelterList from "./ShelterList";
import PetsForAdoption from "./PetsForAdoption";
import {
  FaHome,
  FaPaw,
  FaHandHoldingHeart,
  FaUsers,
  FaPhone,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

import { useShelters } from "@/app/hooks/shelters/useSheltersCount";
import { useActivities } from "@/app/hooks/activity/useActivities";
import { useContactDoneDashboard } from "@/app/hooks/contacts/useContactDoneDashboard";
import { useGetAdminsCount } from "@/app/hooks/admins/useGetAdminsCount";
import { useAdoptersCount } from "@/app/hooks/adopters/useAdoptersCount";
// Stub for AdoptionChart (replace with actual component if available)
const AdoptionChart: React.FC = () => {
  return (
    <div className="relative bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-6">
        Adoções nos Últimos 6 Meses
      </h2>
      <div className="h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Chart Placeholder</p>
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-lg">
        <span className="text-gray-700 text-lg font-semibold">Em breve...</span>
      </div>
    </div>
  );
};

// Define Activity type for mockActivities
type ActivityType = "adoption" | "shelter" | "donation" | "volunteer";

interface Activity {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

// Mock data for activities
const mockActivities: Activity[] = [
  {
    type: "adoption",
    title: "Nova adoção registrada",
    description: "Max (Labrador) foi adotado por João Silva",
    time: "2 horas atrás",
  },
  {
    type: "shelter",
    title: "Novo abrigo cadastrado",
    description: 'Abrigo "Patas Felizes" em São Paulo',
    time: "5 horas atrás",
  },
  {
    type: "donation",
    title: "Nova doação recebida",
    description: "R$ 1.200,00 doados pelo PetShop Amigo",
    time: "Ontem",
  },
  {
    type: "volunteer",
    title: "Novo voluntário",
    description: "Maria Oliveira se cadastrou como voluntária",
    time: "Ontem",
  },
];

// Mock data for shelters (from ShelterList.tsx)
interface Shelter {
  image: string;
  name: string;
  location: string;
  animals: number;
  status: "Ativo" | "Pendente";
}

const mockShelters: Shelter[] = [
  {
    image:
      "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    name: "Abrigo Amigo dos Bichos",
    location: "São Paulo, SP",
    animals: 42,
    status: "Ativo",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    name: "Patas Felizes",
    location: "Rio de Janeiro, RJ",
    animals: 28,
    status: "Ativo",
  },
  {
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    name: "Lar Temporário",
    location: "Belo Horizonte, MG",
    animals: 15,
    status: "Pendente",
  },
];

// Mock data for pets (from PetsForAdoption.tsx)
interface Pet {
  image: string;
  name: string;
  breed: string;
  age: string;
  location: string;
}

const mockPets: Pet[] = [
  {
    image:
      "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    name: "Thor",
    breed: "Labrador",
    age: "2 anos",
    location: "São Paulo, SP",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    name: "Luna",
    breed: "SRD",
    age: "1 ano",
    location: "Rio de Janeiro, RJ",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    name: "Rex",
    breed: "Vira-lata",
    age: "3 anos",
    location: "Belo Horizonte, MG",
  },
];

const Charts: React.FC = () => {
  const { data, isLoading, error } = useShelters();
  const {data: contact_count, isLoading: contact_loading, error: contact_error} = useContactDoneDashboard();
  const {data: admin_count, isLoading: admin_loading, error: admin_error} = useGetAdminsCount();
  const {data: adopters_count, isLoading: adopters_loading, error: adopters_error} = useAdoptersCount();


  console.log(data?.total);
  console.log(admin_count?.count)
  return (
    <main className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Abrigos"
          count={isLoading ? 0 : data?.total}
          icon={FaHome}
          color="indigo"
          trend="up"
          trendValue=""
        />

        {
          <SummaryCard
            title="Contatos Feitos"
            count={contact_loading ? 0 : contact_count?.count}
            icon={FaPhone}
            color="green"
            trend="up"
            trendValue=""
          />
        }

        {
          <SummaryCard
            title="Admin Fila"
            count={admin_loading ? 0 : admin_count?.count}
            icon={RiAdminFill}
            color="blue"
            trend="up"
            trendValue=""
          />
        }
        <SummaryCard
          title="Adotantes"
          count={adopters_loading ? 0 : adopters_count?.total}
          icon={FaUsers}
          color="yellow"
          trend="down"
          trendValue=""
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <AdoptionChart />
        </div>
        <RecentActivity activities={mockActivities} />
      </div>

      {/* Recent Shelters and Pets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ShelterList />
        <PetsForAdoption pets={mockPets} />
      </div>
    </main>
  );
};

export default Charts;
