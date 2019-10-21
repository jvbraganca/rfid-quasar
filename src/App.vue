<template>
  <div class="q-gutter-md" id="q-app">
    <q-layout view="hHh lpR lFf">
      <DrawerMenu/>
      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
      <q-footer reveal elevated class="bg-green-7">
        <q-toolbar>
          <q-toolbar-title>
            Copyright &copy; {{ this.ano }} <span class="text-weight-bold">ATHENA</span>
            <span class="text-weight-light text-body1">IFMG</span>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
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
    this.ano = new Date().getFullYear();
  },
  data() {
    return {
      ano: '',
    };
  },
};
</script>
