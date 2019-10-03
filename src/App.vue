<template>
  <div class="q-gutter-md" id="q-app">
    <q-layout view="hHh lpR lff">
      <DrawerMenu/>
      <q-page-container>
        <q-page padding>
          <router-view/>
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
      console.log(this.$firebase);
    },
};
</script>
