import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaCity,
  FaMap,
  FaPaw,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
} from "react-icons/fa";

// Define the structure of a shelter
interface Shelter {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  whatsapp: string;
  address: string;
  capacity: number;
  status: string;
  is_contact_done: boolean;
  admin_contacter?: string; // Adiciona o campo opcional
  lastname: string
}

// Define props for ShelterCard
interface ShelterCardProps {
  shelter: Shelter;
}

const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
  if (!shelter) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`shelters/${shelter.id}`}>
        <div className="p-6">
          <h3 className="font-extrabold text-xl text-gray-800 mb-3">
            {shelter.name} {shelter.lastname}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <FaEnvelope className="mr-2 w-5 h-5 text-indigo-600" />
              <span>{shelter.email}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaPhone className="mr-2 w-5 h-5 text-indigo-600" />
              <span>{shelter.phone}</span>
            </div>

            {/*
            
            <div className="flex items-center text-sm text-gray-600">
              <FaCity className="mr-2 w-5 h-5 text-indigo-600" />
              <span>{shelter.city}</span>
            </div>
            */}

            {/*
            
            <div className="flex items-center text-sm text-gray-600">
              <FaMap className="mr-2 w-5 h-5 text-indigo-600" />
              <span>{shelter.address}</span>
            </div>
            */}

            {/*
            
            <div className="flex items-center text-sm text-gray-600">
              <FaPaw className="mr-2 w-5 h-5 text-indigo-600" />
              <span>Capacidade: {shelter.capacity} animais</span>
            </div>
            */}
            <div className="flex items-center text-sm">
              {shelter.is_contact_done ? (
                <>
                  <FaCheckCircle className="mr-2 w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">
                    {shelter.status}
                  </span>
                </>
              ) : (
                <>
                  <FaClock className="mr-2 w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">
                    {shelter.status}
                  </span>
                </>
              )}
            </div>

            {shelter.is_contact_done && shelter.admin_contacter && (
              <div className="flex items-center text-sm text-gray-600">
                <FaUserCheck className="mr-2 w-5 h-5 text-blue-600" />
                <span className="italic">
                  O admin <strong>{shelter.admin_contacter}</strong> já entrou
                  em contato com esse abrigo.
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShelterCard;
