"use client";

import { useSchedule } from "../../context/ScheduleContext";
import { generateTimeSlots } from "../../utils/generateTimeSlots";
import TimeRow from "./TimeRow";

export default function Schedule() {
  const { state } = useSchedule();
  const slots = generateTimeSlots();

  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden w-full">
      {slots.map((time) => {
        const appointment = state.appointments.find(
          (a) => a.start === time
        );

        return (
          <TimeRow
            key={time}
            time={time}
            appointment={appointment}
          />
        );
      })}

      <div className="text-center py-4 text-sm text-gray-500">
        {state.appointments.length} agendamentos hoje
      </div>
    </div>
  );
}

