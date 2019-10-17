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
        <template v-slot:no-data="props">
          <q-banner class="bg-warning text-center col-12">
            <template v-slot:avatar>
              <q-icon class="float-right" :name="props.icon" color="black" />
            </template>
            <a class="text-weight-bolder">Atenção: </a> {{ config.messages.noData }}
          </q-banner>
        </template>
        <template slot='col-action' slot-scope='cell'>
          <button @click='on_edit(cell)'><i>edit</i></button>
        </template>
      </q-table>
    </div>
<!--   Modal para adicionar novo dispositivo   -->
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-positive text-white" style="width: 600px">
          <q-card-section>
            <div class="text-h6">
              Adicionando novo dispositivo
            </div>
          </q-card-section>
            <q-card-section class="bg-white text-black">
              <div class="q-pt-md">
                <q-input
                  color="positive"
                  v-model="newDeviceName"
                  label="Nome do dispositivo"
                  aria-required="true"
                />
              </div>
            </q-card-section>
          <q-card-actions align="left" class="bg-white text-positive">
            <q-btn flat color="negative" label="Cancelar" @click="dialogAddDevice(false)"/>
            <q-space />
            <q-btn
              flat
              label="Cadastrar"
              @click="addNewDevice(newDeviceName), dialogAddDevice(false), newDeviceName=''"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab push color="positive" icon="add" direction="up">
          <q-fab-action
            push
            text-color="primary"
            color="white"
            @click="dialogAddDevice(true)"
            icon="playlist_add"
          />
          <q-fab-action
            push
            text-color="positive"
            color="white"
            @click="populateDevicesTable"
            icon="refresh"
          />
        </q-fab>
      </q-page-sticky>
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
    this.populateDevicesTable();
  },
  computed: {
    ...mapState('devices', ['devices', 'newDeviceId', 'persistent']),
  },
  methods: {
    ...mapActions('devices', ['getDevices', 'addNewDevice', 'dialogAddDevice']),
    // Função para pegar os dados do logbook e popular na tabela
    populateDevicesTable() {
      this.data = [];
      this.devices.forEach((datum) => {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_binaryString", "sender_id"] }] */
        this.data.push({
          uid: datum.id,
          name: datum.name,
          timestamp: moment.unix(datum.timestamp).format('DD MMMM YYYY, H:mm:ss'),
        });
      });
    },
  },
  data() {
    return {
      newDeviceName: '',
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
        },
        {
          name: 'actions',
          required: true,
          label: 'Ação',
          align: 'center',
          field: row => row.timestamp,
          format: val => `${val}`,
        },
        {
          name: 'timestamp',
          required: true,
          label: 'Último ping',
          align: 'right',
          field: '',
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
