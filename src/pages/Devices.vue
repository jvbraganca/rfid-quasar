w<template>
  <div>
    <div>
      <h3>Dispositivos cadastrados</h3>
      <q-table
        title="Dispositivos"
        :config="config"
        :data="data"
        :columns="columns"
        :row-key="uid"
        :pagination.sync="pagination"
      >
        <slot no-data-label>{{ config.messages.noData }}</slot>
      </q-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

require('moment/min/locales.min');
const moment = require('moment');

// Define o local do moment como o Brasil
moment.locale('pt-br');

export default {
  name: 'Devices',
  created() {
    // Vigia mutações e atualiza os dados todas as vezes que um novo dado for inserido
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'devices/appendDevices') {
        this.populateDevicesTable();
      }
    });
  },
  mounted() {
    this.getDevices();
  },
  computed: {
    ...mapState('devices', ['devices']),
  },
  methods: {
    ...mapActions('devices', ['getDevices']),
    // Função para pegar os dados do logbook e popular na tabela
    populateDevicesTable() {
      this.data = [];
      this.devices.forEach((datum) => {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_binaryString", "sender_id"] }] */
        this.data.push({
          uid: datum.id,
          name: datum.name,
          timestamp: moment.unix(datum.timestamp).format('DD MMMM YYYY, h:mm:ss'),
        });
      });
    },
  },
  data() {
    return {
      pagination: {
        rowsPerPage: 10, // current rows per page being displayed
      },
      columns: [
        {
          name: 'unique_id',
          required: true,
          label: 'Unique ID',
          align: 'left',
          field: row => row.uid,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'name',
          required: true,
          label: 'Nome do dispositivo',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'timestamp',
          required: true,
          label: 'Último ping',
          align: 'right',
          field: row => row.timestamp,
          format: val => `${val}`,
        },
      ],
      data: [
      ],
      config: {
        messages: {
          noData: 'Atenção: Não foram encontrados nenhum registro no banco de dados.',
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
