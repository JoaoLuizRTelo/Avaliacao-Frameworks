import { computed, reactive, watch } from 'vue';

const STORAGE_KEY = 'barberpro.appointments';

const today = new Date();
const toISODate = (date) => date.toISOString().split('T')[0];
const addDays = (base, days) => {
  const clone = new Date(base.valueOf());
  clone.setDate(clone.getDate() + days);
  return clone;
};

const defaultAppointments = [
  {
    id: generateId(),
    clientName: 'Carlos Silva',
    service: 'Corte Premium',
    date: toISODate(addDays(today, 1)),
    time: '10:00',
    notes: 'Prefere tesoura, evitar máquina.',
    professional: 'Miguel'
  },
  {
    id: generateId(),
    clientName: 'Jeferson Souza',
    service: 'Barba + Hidratação',
    date: toISODate(addDays(today, 2)),
    time: '14:30',
    notes: 'Aplicar óleo pós-barba.',
    professional: 'Rafael'
  },
  {
    id: generateId(),
    clientName: 'João Pedro',
    service: 'Corte Kids',
    date: toISODate(addDays(today, -1)),
    time: '09:30',
    notes: 'Cliente recorrente.',
    professional: 'Equipe'
  }
];

const state = reactive({
  appointments: loadFromStorage()
});

function loadFromStorage() {
  if (typeof window === 'undefined') {
    return defaultAppointments;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Falha ao ler localStorage, usando dados padrão.', error);
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAppointments));
  }

  return defaultAppointments;
}

if (typeof window !== 'undefined') {
  watch(
    () => state.appointments,
    (value) => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    },
    { deep: true }
  );

  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && event.newValue) {
      try {
        const parsed = JSON.parse(event.newValue);
        if (Array.isArray(parsed)) {
          state.appointments.splice(0, state.appointments.length, ...parsed);
        }
      } catch (error) {
        console.warn('Não foi possível sincronizar dados do storage.', error);
      }
    }
  });
}

const appointmentsSorted = computed(() =>
  [...state.appointments].sort((a, b) => toDateTime(a) - toDateTime(b))
);

const upcomingAppointments = computed(() => {
  const now = new Date();
  return appointmentsSorted.value.filter((appointment) => toDateTime(appointment) >= now);
});

const nextAppointment = computed(() => upcomingAppointments.value[0] ?? null);
const appointmentCount = computed(() => state.appointments.length);

export function useAppointments() {
  const createAppointment = (appointment) => {
    state.appointments.push({ ...appointment, id: generateId() });
  };

  const updateAppointment = (id, payload) => {
    const index = state.appointments.findIndex((item) => item.id === id);
    if (index !== -1) {
      state.appointments.splice(index, 1, { ...state.appointments[index], ...payload });
    }
  };

  const deleteAppointment = (id) => {
    const index = state.appointments.findIndex((item) => item.id === id);
    if (index !== -1) {
      state.appointments.splice(index, 1);
    }
  };

  const getAppointmentById = (id) => state.appointments.find((item) => item.id === id);

  const resetAppointments = () => {
    state.appointments.splice(0, state.appointments.length, ...defaultAppointments.map((item) => ({
      ...item,
      id: generateId()
    })));
  };

  return {
    appointments: appointmentsSorted,
    appointmentCount,
    upcomingAppointments,
    nextAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
    resetAppointments
  };
}

function toDateTime(appointment) {
  const date = new Date(`${appointment.date}T${appointment.time}`);
  if (Number.isNaN(date.valueOf())) {
    return new Date();
  }
  return date;
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
