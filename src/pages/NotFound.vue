<template>
  <v-container class="py-12 text-center">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="2" class="pa-8">
          <v-icon size="64" color="primary" class="mb-4">mdi-emoticon-confused-outline</v-icon>
          <h1 class="text-h4 font-weight-bold mb-2">Página não encontrada</h1>
          <p class="text-body-2 text-medium-emphasis mb-6">
            O link que você tentou acessar não existe. Que tal voltar para a agenda e continuar os atendimentos?
          </p>
          <v-btn color="primary" to="/agenda" prepend-icon="mdi-arrow-left">
            Ir para a agenda
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
