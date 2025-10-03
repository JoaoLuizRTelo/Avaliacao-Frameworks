<template>
  <v-card :elevation="isNext ? 6 : 2" class="appointment-card h-100" :color="isPast ? 'grey-lighten-4' : undefined">
    <v-card-item>
      <v-row class="align-center">
        <v-col cols="8">
          <v-card-title class="text-h6 font-weight-bold">
            {{ appointment.clientName }}
          </v-card-title>
          <v-card-subtitle class="text-body-2">
            {{ formattedDate }} • {{ appointment.time }}h
          </v-card-subtitle>
        </v-col>
        <v-col cols="4" class="text-right">
          <v-chip
            v-if="isNext"
            color="secondary"
            variant="flat"
            prepend-icon="mdi-star"
            label
          >
            Próximo
          </v-chip>
          <v-chip
            v-else-if="isPast"
            color="grey-darken-1"
            class="text-white"
            variant="flat"
            label
          >
            Concluído
          </v-chip>
          <v-chip
            v-else
            color="primary"
            class="text-white"
            variant="flat"
            label
          >
            Agendado
          </v-chip>
        </v-col>
      </v-row>
    </v-card-item>

    <v-card-text class="text-body-2">
      <div class="d-flex align-center ga-2 mb-3">
        <v-avatar color="primary" variant="tonal" size="42">
          <v-icon color="primary-darken-4">mdi-content-cut</v-icon>
        </v-avatar>
        <div>
          <strong>Serviço:</strong>
          <span>{{ appointment.service }}</span>
        </div>
      </div>

      <v-alert
        v-if="appointment.notes"
        type="info"
        variant="tonal"
        color="primary"
        class="mb-2"
        density="compact"
      >
        {{ appointment.notes }}
      </v-alert>
      <v-alert v-else type="info" variant="tonal" color="grey" density="compact" class="mb-2">
        Sem observações.
      </v-alert>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        color="primary"
        variant="text"
        @click="emit('edit', appointment.id)"
        prepend-icon="mdi-pencil"
      >
        Editar
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        variant="text"
        @click="emit('delete', appointment.id)"
        prepend-icon="mdi-delete"
      >
        Remover
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
  referenceId: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['edit', 'delete']);

const formatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

const formattedDate = computed(() => {
  const parsed = new Date(`${props.appointment.date}T00:00`);
  return formatter.format(parsed);
});

const isNext = computed(() => props.referenceId === props.appointment.id);

const isPast = computed(() => {
  const now = new Date();
  const appointmentDate = new Date(`${props.appointment.date}T${props.appointment.time}`);
  return appointmentDate < now;
});
</script>

<style scoped>
.appointment-card {
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.appointment-card:hover {
  transform: translateY(-4px);
}
</style>
