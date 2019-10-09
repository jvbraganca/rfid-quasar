<template>
  <div class="q-gutter-md" id="q-app">
    <q-layout view="hhh lpR lFf">
      <DrawerMenu/>
      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import DrawerMenu from './layouts/DrawerMenu';

export default {
  name: 'App',
  components: {
    DrawerMenu,
  },
  mounted() {
  },
};
</script>
