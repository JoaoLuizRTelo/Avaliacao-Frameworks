<template>
  <v-form @submit.prevent="handleSubmit" ref="formRef">
    <v-row class="ga-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="localForm.clientName"
          label="Nome do cliente"
          prepend-inner-icon="mdi-account"
          :rules="[rules.required]"
          density="comfortable"
          clearable
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          v-model="localForm.service"
          :items="services"
          label="Serviço"
          prepend-inner-icon="mdi-content-cut"
          :rules="[rules.required]"
          density="comfortable"
          required
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="localForm.date"
          label="Data"
          type="date"
          :rules="[rules.required]"
          density="comfortable"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="localForm.time"
          label="Horário"
          type="time"
          :rules="[rules.required]"
          density="comfortable"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="localForm.professional"
          :items="professionals"
          label="Profissional"
          prepend-inner-icon="mdi-account-tie"
          density="comfortable"
        ></v-select>
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="localForm.notes"
          label="Observações"
          rows="3"
          auto-grow
          clearable
          prepend-inner-icon="mdi-note-text"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-divider class="my-6"></v-divider>

    <div class="d-flex justify-space-between align-center">
      <div>
        <v-chip v-if="isEdit" color="primary" variant="tonal" class="text-uppercase">
          Editando atendimento existente
        </v-chip>
        <v-chip v-else color="secondary" variant="tonal" class="text-uppercase">
          Novo atendimento:
        </v-chip>
      </div>

      <div class="d-flex ga-3">
        <v-btn type="button" variant="tonal" color="grey" @click="handleReset">
          Limpar
        </v-btn>
        <v-btn type="submit" color="primary" prepend-icon="mdi-content-save" :loading="isSubmitting">
          {{ submitLabel }}
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  submitLabel: {
    type: String,
    default: 'Salvar'
  }
});

const emit = defineEmits(['update:modelValue', 'submit']);

const formRef = ref();
const isSubmitting = ref(false);

const baseForm = {
  id: null,
  clientName: '',
  service: '',
  date: '',
  time: '',
  notes: '',
  professional: ''
};

const localForm = reactive({ ...baseForm });

const services = [
  'Corte Clássico',
  'Corte Premium',
  'Barba Completa',
  'Barba + Hidratação',
  'Sobrancelha',
  'Pacote Completo'
];

const professionals = ['Miguel', 'Eduardo', 'Rafael', 'Equipe'];

const rules = {
  required: (value) => !!value || 'Campo obrigatório'
};

const isEdit = computed(() => Boolean(localForm.id));

watch(
  () => props.modelValue,
  (value) => {
    Object.assign(localForm, { ...baseForm, ...value });
  },
  { immediate: true, deep: true }
);

watch(
  localForm,
  (value) => {
    emit('update:modelValue', JSON.parse(JSON.stringify(value)));
  },
  { deep: true }
);

const handleReset = () => {
  Object.assign(localForm, { ...baseForm });
  emit('update:modelValue', { ...localForm });
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (!valid) return;

  try {
    isSubmitting.value = true;
    emit('submit', { ...localForm });
    if (!isEdit.value) {
      handleReset();
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
