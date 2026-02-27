import { Appointment } from "@/types/appointment";
import AppointmentCard from "./AppointmentCard";

type Props = {
  time: string;
  appointment?: Appointment;
};

export default function TimeRow({ time, appointment }: Props) {
  return (
    <div className="grid grid-cols-[80px_1fr] border-b h-[60px] relative">
      {/* Coluna horário */}
      <div className="text-sm text-gray-400 p-2 border-r">
        {time}
      </div>

      {/* Coluna evento */}
      <div className="relative">
        {appointment && (
          <AppointmentCard appointment={appointment} />
        )}
      </div>
    </div>
  );
}