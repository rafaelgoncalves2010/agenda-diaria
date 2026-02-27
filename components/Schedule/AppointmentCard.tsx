"use client";

import { Appointment } from "@/types/appointment";
import { useSchedule } from "@/context/ScheduleContext";

type Props = {
  appointment: Appointment;
};

export default function AppointmentCard({ appointment }: Props) {
  const { dispatch } = useSchedule();

  const height = (appointment.duration / 30) * 60;

  const handleDelete = () => {
    const confirmed = confirm(
      "Tem certeza que deseja remover este agendamento?"
    );

    if (!confirmed) return;

    dispatch({
      type: "REMOVE_APPOINTMENT",
      payload: appointment.id,
    });
  };

  return (
    <div
      className="absolute left-2 right-2 bg-blue-100 border-l-4 border-blue-500 rounded-md p-3 shadow-sm group"
      style={{ height }}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>

      <p className="font-medium text-blue-900">
        {appointment.title}
      </p>

      {appointment.description && (
        <p className="text-sm text-blue-700 mt-1">
          {appointment.description}
        </p>
      )}

      <span className="absolute bottom-2 right-2 text-xs text-gray-500">
        {appointment.duration} min
      </span>
    </div>
  );
}