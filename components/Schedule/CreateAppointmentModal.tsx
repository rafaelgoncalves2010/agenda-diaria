"use client";

import { useState } from "react";
import { useSchedule } from "@/context/ScheduleContext";
import { generateTimeSlots } from "@/utils/generateTimeSlots";

export default function CreateAppointmentModal() {
  const { dispatch, state } = useSchedule();
  const timeSlots = generateTimeSlots();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [start, setStart] = useState("08:00");
  const [duration, setDuration] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<{
    title?: string;
    start?: string;
    duration?: string;
  }>({});

  function validate() {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Título é obrigatório.";
    }

    if (!start) {
      newErrors.start = "Selecione um horário.";
    }

    if (!duration) {
      newErrors.duration = "Selecione a duração.";
    }

    // verifica se ja foi cadastrasado no mesmo horario
    if (start) {
      const conflict = state.appointments.some(
        (a) => a.start === start
      );

      if (conflict) {
        newErrors.start = "Já existe um agendamento nesse horário.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = () => {
    if (!validate()) return;

    dispatch({
      type: "ADD_APPOINTMENT",
      payload: {
        id: Date.now(),
        title,
        description,
        start,
        duration: Number(duration),
      },
    });

    // reset
    resetForm();
  };

  const resetForm = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setDuration("");
    setErrors({});
  }

  const isFormValid =
    title.trim() && start && duration;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        + Novo
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">

            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6 text-gray-600">
              Novo Agendamento
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Título *
              </label>

              <input
                type="text"
                placeholder="Ex: Reunião com equipe"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 outline-none text-gray-600
                  ${errors.title ? "border-red-500" : " text-gray-600 focus:ring-2 focus:ring-blue-500"}`}
              />

              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Horário *
                </label>

                <select
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 text-gray-600
      ${errors.start ? "border-red-500" : ""}`}
                >
                  <option value="">Selecione</option>

                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                {errors.start && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.start}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Duração *
                </label>

                <select
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      e.target.value === ""
                        ? ""
                        : Number(e.target.value)
                    )
                  }
                  className={`w-full border rounded-lg px-3 py-2 text-gray-600
                    ${errors.duration ? "border-red-500" : ""}`}
                >
                  <option value="">Selecione</option>
                  <option value={30}>30 min</option>
                  <option value={60}>60 min</option>
                  <option value={90}>90 min</option>
                  <option value={120}>120 min</option>
                </select>

                {errors.duration && (
                  <p className="text-red-500 text-xs mt-1 ">
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>


            <div className="mb-6 text-gray-600">
              <label className="block text-sm font-medium mb-1">
                Descrição (opcional)
              </label>

              <textarea
                placeholder="Detalhes do agendamento..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 resize-none h-24"
              />
            </div>

            <button
              onClick={handleSubmit}
              className={`w-full py-2 rounded-lg transition cursor-pointer bg-blue-600 hover:bg-blue-700 text-white`}
            >
              Criar Agendamento
            </button>
          </div>
        </div>
      )}
    </>
  );
}