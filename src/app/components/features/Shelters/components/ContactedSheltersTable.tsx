import React from "react";

interface Shelter {
  id: string;
  name: string;
  phone: string;
  city: string;
  capacity: number;
  admin_contacter: string;
  createdAt: string;
}

interface ContactedSheltersTableProps {
  shelters: Shelter[];
}

const ContactedSheltersTable: React.FC<ContactedSheltersTableProps> = ({ shelters }) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-gray-700 mb-4">Abrigos já contatados</h3>
      <div className="overflow-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left text-gray-600 bg-white">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Admin</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Capacidade</th>
              <th className="px-4 py-3">Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {shelters.map((shelter) => (
              <tr key={shelter.id} className="border-t">
                <td className="px-4 py-2 font-medium">{shelter.name}</td>
                <td className="px-4 py-2">{shelter.phone}</td>
                <td className="px-4 py-2">{shelter.admin_contacter}</td>
                <td className="px-4 py-2">{shelter.city}</td>
                <td className="px-4 py-2">{shelter.capacity}</td>
                <td className="px-4 py-2">
                  {new Date(shelter.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shelters.length === 0 && (
          <p className="text-center p-4 text-sm text-gray-500">Nenhum abrigo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ContactedSheltersTable;
