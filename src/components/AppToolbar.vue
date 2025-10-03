<template>
  <v-app-bar color="primary" density="comfortable" flat>
    <v-btn
      class="d-md-none"
      icon="mdi-menu"
      variant="text"
      @click="emit('toggle-drawer')"
    ></v-btn>

    <v-toolbar-title class="font-weight-bold">BarberPro Agenda</v-toolbar-title>

    <v-spacer></v-spacer>

    <div class="d-none d-md-flex align-center ga-4">
      <div v-if="nextAppointment" class="text-white text-body-2 text-left">
        <div class="font-weight-medium">Próximo atendimento</div>
        <div>
          {{ nextAppointment.clientName }} — {{ formatDate(nextAppointment.date) }} às
          {{ nextAppointment.time }}
        </div>
      </div>
      <div v-else class="text-white text-body-2">
        Nenhum atendimento futuro cadastrado.
      </div>

      <v-chip
        :color="appointmentCount ? 'secondary' : 'grey-darken-1'"
        :text-color="appointmentCount ? 'black' : 'white'"
        variant="elevated"
        class="font-weight-medium"
      >
        {{ appointmentCount }} ativos
      </v-chip>

      <v-btn
        color="secondary"
        prepend-icon="mdi-plus"
        class="text-none"
        to="/atendimentos"
      >
        Novo atendimento
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup>
import { useAppointments } from '../composables/useAppointments';

const emit = defineEmits(['toggle-drawer']);

const { nextAppointment, appointmentCount } = useAppointments();

const formatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
  day: '2-digit',
  month: 'short'
});

const formatDate = (isoDate) => {
  const parsed = new Date(`${isoDate}T00:00`);
  return formatter.format(parsed);
};

</script>
