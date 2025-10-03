<template>
  <div class="appointments-board">
    <v-sheet class="pa-6 mb-6" elevation="2" rounded="lg">
      <v-row>
        <v-col cols="12" md="8">
          <h2 class="text-h4 font-weight-bold mb-2">Próximos atendimentos</h2>
          <p class="text-body-2 text-medium-emphasis">
            Acompanhe a agenda da barbearia em tempo real e gerencie os compromissos com rapidez.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="d-flex align-end">
          <v-text-field
            v-model="search"
            label="Pesquisar por cliente ou serviço"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            density="comfortable"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>

    <v-row v-if="filteredAppointments.length" class="g-6">
      <v-col
        v-for="appointment in filteredAppointments"
        :key="appointment.id"
        cols="12"
        md="6"
        lg="4"
      >
        <AppointmentCard
          :appointment="appointment"
          :reference-id="nextAppointment?.id ?? null"
          @edit="openEdit(appointment.id)"
          @delete="promptDelete(appointment.id)"
        />
      </v-col>
    </v-row>

    <v-alert
      v-else
      type="info"
      variant="tonal"
      color="primary"
      class="rounded-xl"
    >
      Nenhum atendimento cadastrado para os filtros atuais. Tente ajustar a pesquisa ou cadastre um novo atendimento.
    </v-alert>

    <v-dialog v-model="showEditDialog" max-width="720">
      <v-card>
        <v-card-title class="text-h6 font-weight-bold">Editar atendimento</v-card-title>
        <v-card-text>
          <AppointmentForm v-model="editableAppointment" submit-label="Atualizar" @submit="handleUpdate" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <ConfirmDialog
      v-model="confirmDeleteDialog"
      title="Remover atendimento"
      message="Tem certeza que deseja remover este atendimento? Esta ação não pode ser desfeita."
      @confirm="handleDelete"
    />

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="bottom right">{{ snackbar.text }}</v-snackbar>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import AppointmentCard from '../components/AppointmentCard.vue';
import AppointmentForm from '../components/AppointmentForm.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import { useAppointments } from '../composables/useAppointments';

const search = ref('');
const showEditDialog = ref(false);
const confirmDeleteDialog = ref(false);
const editableAppointment = ref(null);
const deleteTargetId = ref(null);

const snackbar = reactive({ show: false, color: 'success', text: '' });

const {
  appointments,
  nextAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById
} = useAppointments();

const filteredAppointments = computed(() => {
  if (!search.value) {
    return appointments.value;
  }
  return appointments.value.filter((appointment) => {
    const term = search.value.toLowerCase();
    return (
      appointment.clientName.toLowerCase().includes(term) ||
      appointment.service.toLowerCase().includes(term) ||
      (appointment.professional ?? '').toLowerCase().includes(term)
    );
  });
});

const openEdit = (id) => {
  const appointment = getAppointmentById(id);
  if (!appointment) return;
  editableAppointment.value = { ...appointment };
  showEditDialog.value = true;
};

const handleUpdate = (payload) => {
  if (!editableAppointment.value) return;
  updateAppointment(editableAppointment.value.id, payload);
  showEditDialog.value = false;
  editableAppointment.value = null;
  triggerSnackbar('Atendimento atualizado com sucesso!', 'success');
};

const promptDelete = (id) => {
  deleteTargetId.value = id;
  confirmDeleteDialog.value = true;
};

const handleDelete = () => {
  if (!deleteTargetId.value) return;
  deleteAppointment(deleteTargetId.value);
  triggerSnackbar('Atendimento removido.', 'error');
  deleteTargetId.value = null;
  confirmDeleteDialog.value = false;
};

const triggerSnackbar = (text, color) => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.show = true;
};
</script>

<style scoped>
.appointments-board {
  min-height: calc(100vh - 120px);
}
</style>
