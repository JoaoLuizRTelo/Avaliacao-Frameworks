<template>
  <v-app>
    <AppToolbar @toggle-drawer="drawer = !drawer" />

    <v-navigation-drawer
      v-model="drawer"
      :permanent="isLargeScreen"
      :temporary="!isLargeScreen"
      class="bg-deep"
    >
      <v-list density="comfortable">
        <v-list-subheader>Menu</v-list-subheader>
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          @click="drawer = isLargeScreen ? true : false"
          link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <template #append>
            <v-icon v-if="isActive(item.to)" color="primary">mdi-circle</v-icon>
            <v-icon v-else color="grey">mdi-checkbox-blank-circle-outline</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="py-6">
        <router-view />
      </v-container>
    </v-main>

    <v-footer app height="56" class="bg-grey-lighten-4 d-flex align-center justify-center">
      <span class="text-caption">© {{ currentYear }} BarberPro Agenda</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import AppToolbar from './components/AppToolbar.vue';

const route = useRoute();
const drawer = ref(false);
const { mdAndUp } = useDisplay();

const isLargeScreen = computed(() => mdAndUp.value);

watch(
  isLargeScreen,
  (value) => {
    drawer.value = value;
  },
  { immediate: true }
);

const currentYear = new Date().getFullYear();

const menuItems = [
  { title: 'Agenda em Cards', to: '/agenda', icon: 'mdi-calendar-clock' },
  { title: 'Atendimentos (CRUD)', to: '/atendimentos', icon: 'mdi-account-wrench' },
  { title: 'Sobre o Sistema', to: '/sobre', icon: 'mdi-information' }
];

const isActive = (path) => route.path === path;
</script>

<style scoped>
.bg-deep {
  background: linear-gradient(180deg, #1b5e20 0%, #2e7d32 100%);
  color: white;
}

.bg-deep .v-list-item-title {
  font-weight: 500;
}
</style>
