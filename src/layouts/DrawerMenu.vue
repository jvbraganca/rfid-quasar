<template>
  <div>
    <q-header class="bg-positive text-white" elevated>
      <q-toolbar>
        <q-btn
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          dense
          flat
          icon="menu"
          round
        />
        <q-toolbar-title>
          IFMG - RFID
        </q-toolbar-title>
        <div>
          <q-btn color="white" flat label="Login"/>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      bordered
      content-class="bg-grey-2"
      show-if-above
      v-model="leftDrawerOpen"
    >
      <q-scroll-area class="fit">

        <q-list :key="i" v-for="(menuItem, i) in menuList">
          <q-item :to="menuItem.link" clickable exact v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon"/>
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <!--          <q-separator v-if="menuItem.separator"/>-->
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
const menuList = [
  {
    icon: 'stars',
    label: 'Início',
    separator: true,
    link: '/',
  },
  {
    icon: 'credit_card',
    label: 'RFID cards',
    separator: false,
    link: '/rfid',
  },
  {
    icon: 'face',
    label: 'Usuários',
    separator: false,
    link: '/users',
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
