<template>
  <v-dialog v-model="internalValue" max-width="420">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        {{ title }}
      </v-card-title>
      <v-card-text class="text-body-2">
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="grey" @click="internalValue = false">Cancelar</v-btn>
        <v-btn color="error" variant="flat" @click="handleConfirm">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirmação'
  },
  message: {
    type: String,
    default: 'Deseja continuar com esta ação?'
  }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const handleConfirm = () => {
  emit('confirm');
  internalValue.value = false;
};
</script>
