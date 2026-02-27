import { formatToday } from "../utils/formatDate";
import CreateAppointmentModal from "./Schedule/CreateAppointmentModal";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6 w-full">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Agenda do Dia
        </h1>
        <p className="text-sm text-gray-500">
          {formatToday()}
        </p>
      </div>

      <CreateAppointmentModal />
    </div>
  );
}