// components/features/Admins/components/AdminCard.tsx
import React from "react";

interface AdminCardProps {
  admin: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  onDelete: (id: string) => void; // nova prop
}

const AdminCard: React.FC<AdminCardProps> = ({ admin, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{admin.name}</h3>
        <p className="text-gray-600">{admin.email}</p>
        <p className="text-sm text-gray-400 mt-2">
          Cadastrado em: {new Date(admin.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <button
        onClick={() => onDelete(admin.id)}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Deletar
      </button>
    </div>
  );
};

export default AdminCard;
