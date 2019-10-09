<template>
  <div>
    <div>
      <h3>RFID</h3>
      <q-table
        title="Logbook"
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
  name: 'RFID',
  created() {
    // Vigia mutações e atualiza os dados todas as vezes que um novo dado for inserido
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'logbook/setLogbookData') {
        this.populateLogbookTable();
      }
    });
  },
  mounted() {
    this.getLogbookData();
  },
  computed: {
    ...mapState('logbook', ['logbookData']),
  },
  methods: {
    ...mapActions('logbook', ['getLogbookData']),
    // Função para pegar os dados do logbook e popular na tabela
    populateLogbookTable() {
      this.data = [];
      this.logbookData.forEach((datum) => {
        /* eslint no-underscore-dangle: ["error", { "allow": ["_binaryString", "sender_id"] }] */
        this.data.push({
          uid: datum.id,
          card_id: datum.cardUid._binaryString,
          timestamp: moment.unix(datum.timestamp).format('llll'),
          local: datum.sender_id._binaryString,
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
          name: 'card_id',
          required: true,
          label: 'Card ID',
          align: 'left',
          field: row => row.card_id,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'timestamp',
          required: true,
          label: 'Horario',
          align: 'left',
          field: row => row.timestamp,
          format: val => `${val}`,
        },
        {
          name: 'sender',
          required: true,
          label: 'Local',
          align: 'left',
          field: row => row.local,
          sortable: true,
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
