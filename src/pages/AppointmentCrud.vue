<template>
  <v-row class="ga-6">
    <v-col cols="12" md="5">
      <v-sheet elevation="2" rounded="lg" class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <div>
            <h2 class="text-h5 font-weight-bold mb-1">Gerenciar atendimentos</h2>
            <p class="text-body-2 text-medium-emphasis">
              Cadastre novos atendimentos ou atualize os existentes. As alterações são salvas automaticamente no
              navegador.
            </p>
          </div>
          <v-avatar size="52" color="primary" variant="tonal">
            <v-icon color="primary-darken-4">mdi-calendar-edit</v-icon>
          </v-avatar>
        </div>

        <AppointmentForm v-model="formState" :submit-label="submitLabel" @submit="handleSubmit" />
      </v-sheet>
    </v-col>

    <v-col cols="12" md="7">
      <v-sheet elevation="2" rounded="lg" class="pa-6">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Lista de atendimentos</h2>
          <v-btn
            v-if="appointments.length"
            color="secondary"
            prepend-icon="mdi-backup-restore"
            variant="tonal"
            @click="handleReset"
          >
            Restaurar amostra
          </v-btn>
        </div>

        <v-data-table
          :headers="headers"
          :items="appointments"
          :items-per-page="5"
          item-key="id"
          class="elevation-0"
        >
          <template #item.clientName="{ item }">
            <div>
              <div class="font-weight-medium">{{ item.clientName }}</div>
              <div class="text-caption text-medium-emphasis">{{ item.professional || 'Equipe' }}</div>
            </div>
          </template>

          <template #item.schedule="{ item }">
            <div class="text-body-2">
              {{ formatDate(item.date) }} às {{ item.time }}
            </div>
          </template>

          <template #item.service="{ item }">
            <v-chip color="primary" variant="tonal">{{ item.service }}</v-chip>
          </template>

          <template #item.actions="{ item }">
            <v-btn icon="mdi-pencil" variant="text" color="primary" @click="handleEdit(item)"></v-btn>
            <v-btn icon="mdi-delete" variant="text" color="error" @click="promptDelete(item.id)"></v-btn>
          </template>

          <template #no-data>
            <v-alert type="info" variant="tonal" color="primary">
              Nenhum atendimento cadastrado até o momento. Utilize o formulário ao lado para adicionar o primeiro!
            </v-alert>
          </template>
        </v-data-table>
      </v-sheet>
    </v-col>
  </v-row>

  <ConfirmDialog
    v-model="confirmDelete"
    title="Remover atendimento"
    message="Deseja realmente excluir este atendimento?"
    @confirm="handleDelete"
  />

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="bottom right">
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import AppointmentForm from '../components/AppointmentForm.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import { useAppointments } from '../composables/useAppointments';

const {
  appointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  resetAppointments
} = useAppointments();

const formState = ref({});
const editingId = ref(null);
const confirmDelete = ref(false);
const deleteTargetId = ref(null);

const snackbar = reactive({ show: false, text: '', color: 'success' });

const headers = [
  { title: 'Cliente', key: 'clientName', sortable: false },
  { title: 'Serviço', key: 'service', sortable: false },
  { title: 'Data e horário', key: 'schedule', sortable: false },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' }
];

const submitLabel = computed(() => (editingId.value ? 'Atualizar atendimento' : 'Salvar atendimento'));

const handleSubmit = (payload) => {
  if (editingId.value) {
    updateAppointment(editingId.value, payload);
    triggerFeedback('Atendimento atualizado com sucesso!', 'success');
  } else {
    createAppointment(payload);
    triggerFeedback('Novo atendimento cadastrado!', 'success');
  }
  resetForm();
};

const handleEdit = (appointment) => {
  editingId.value = appointment.id;
  formState.value = { ...getAppointmentById(appointment.id) };
};

const promptDelete = (id) => {
  deleteTargetId.value = id;
  confirmDelete.value = true;
};

const handleDelete = () => {
  if (!deleteTargetId.value) return;
  deleteAppointment(deleteTargetId.value);
  triggerFeedback('Atendimento removido.', 'error');
  deleteTargetId.value = null;
  confirmDelete.value = false;
};

const handleReset = () => {
  resetAppointments();
  triggerFeedback('Agenda restaurada com os dados de exemplo.', 'info');
};

const triggerFeedback = (text, color) => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
};

const resetForm = () => {
  editingId.value = null;
  formState.value = {};
};

const formatDate = (isoDate) => {
  const parsed = new Date(`${isoDate}T00:00`);
  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  });
};
</script>
