"use client";

import { createContext, useReducer, useContext, ReactNode } from "react";
import { Appointment } from "@/types/appointment";
import { mockAppointments } from "@/data/mockAppoiments";

type State = {
  appointments: Appointment[];
};

type Action =
  | { type: "ADD_APPOINTMENT"; payload: Appointment }
  | { type: "REMOVE_APPOINTMENT"; payload: number };

const ScheduleContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };

    case "REMOVE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter(
          (a) => a.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    appointments: mockAppointments,
  });

  return (
    <ScheduleContext.Provider value={{ state, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error("useSchedule must be used within ScheduleProvider");
  }

  return context;
}