<template>
  <v-container class="py-8">
    <v-row class="justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="2" rounded="xl" class="pa-8 mb-6">
          <v-row class="align-center">
            <v-col cols="12" md="5">
              <v-img
                :src="imagem"
                alt="BarberPro"
                class="rounded-xl"
                height="240"
                cover
              ></v-img>
            </v-col>
            <v-col cols="12" md="7">
              <h1 class="text-h4 font-weight-bold mb-4">Sobre a BarberPro Agenda</h1>
              <p class="text-body-1 mb-4">
                A BarberPro Agenda foi desenvolvida para facilitar o dia a dia da nossa barbearia. Com ela, acompanhamos os
                atendimentos, personalizamos serviços e garantimos uma experiência incrível para cada cliente.
              </p>
              <v-divider class="my-4"></v-divider>
              <v-chip-group column>
                <v-chip v-for="tag in tags" :key="tag" color="primary" variant="tonal" class="text-uppercase">
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card>

        <v-row class="g-6">
          <v-col cols="12" md="6">
            <v-card elevation="1" rounded="xl" class="pa-6 h-100">
              <h2 class="text-h5 font-weight-bold mb-4">Horário de funcionamento</h2>
              <v-list lines="two" density="comfortable">
                <v-list-item v-for="schedule in schedules" :key="schedule.day">
                  <v-list-item-title class="font-weight-medium">{{ schedule.day }}</v-list-item-title>
                  <v-list-item-subtitle>{{ schedule.time }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="1" rounded="xl" class="pa-6 h-100">
              <h2 class="text-h5 font-weight-bold mb-4">Nosso compromisso</h2>
              <v-timeline side="end" line-color="primary" density="compact">
                <v-timeline-item
                  v-for="(item, index) in timeline"
                  :key="index"
                  :dot-color="item.color"
                  size="small"
                >
                  <template #opposite>
                    <span class="text-caption text-medium-emphasis">{{ item.year }}</span>
                  </template>
                  <v-card variant="tonal" :color="item.color" class="pa-3">
                    <h3 class="text-subtitle-1 font-weight-bold mb-2">{{ item.title }}</h3>
                    <p class="text-body-2 mb-0">{{ item.description }}</p>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import imagem from '@/assets/generated-img.png'

const tags = ['Excelência no atendimento', 'Barba e cabelo', 'Equipe especializada', 'Experiência premium'];

const schedules = [
  { day: 'Segunda a Sexta', time: '9h às 20h' },
  { day: 'Sábado', time: '9h às 18h' },
  { day: 'Domingo', time: 'Sob agendamento especial' }
];

const timeline = [
  {
    year: '2015',
    title: 'Fundação da BarberPro',
    description: 'Nasceu em Sinop a barbearia focada em atendimento personalizado.',
    color: 'primary'
  },
  {
    year: '2018',
    title: 'Expansão da equipe',
    description: 'Chegaram novos barbeiros especialistas em tendências e cuidados masculinos.',
    color: 'secondary'
  },
  {
    year: '2022',
    title: 'Digitalização do agendamento',
    description: 'Implementamos o sistema BarberPro Agenda para otimizar a rotina e encantar clientes.',
    color: 'primary'
  }
];
</script>
