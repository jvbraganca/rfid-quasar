<template>
  <q-layout view="hHh lpR lff">
    <q-header elevated class="bg-positive text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          IFMG - RFID
        </q-toolbar-title>
        <div>
          <q-btn flat color="white" label="Login" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-scroll-area class="fit">

        <q-list v-for="(menuItem, i) in menuList" :key="i" >
            <q-item clickable v-ripple :to="menuItem.link">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: 'stars',
    label: 'Início',
    separator: true,
    link: '/test',
  },
  {
    icon: 'credit_card',
    label: 'RFID cards',
    separator: false,
    link: 'about',
  },
  {
    icon: 'face',
    label: 'Usuários',
    separator: false,
    link: 'users',
  },
];

export default {
  name: 'DrawerMenu',

  data() {
    return {
      leftDrawerOpen: false,
      menuList,
    };
  },
};
</script>
