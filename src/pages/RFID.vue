<template>
  <div>
    <div>
      <h3>RFID</h3>
      <q-table
        title="Logbook"
        :config="config"
        :data="data"
        :columns="columns"
        :row-key="this.data.uid"
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
      </q-table>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="addUserDialog">
        <q-carousel
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          padding
          v-model="slide"
          style="width: 500px"
          height="250px"
          class="bg-white shadow-2 rounded-borders"
          ref="carousel"
        >
          <q-carousel-slide :name="1" class="no-wrap flex-center">
              <q-card>
                <q-card-section class="bg-primary text-white">
                  <div class="text-h6">Selecione o dispositivo para gravação</div>
                </q-card-section>
              </q-card>
              <q-separator/>
              <div class="col no-wrap flex-center">
                <div class="q-pt-md">
                  <q-select
                    v-model="dispositivoCadastro"
                    :options="options"
                    :option-label="label"
                    :option-value="value"
                    label="Selecione o dispositivo"
                    :rules="[val => !!val || 'Selecione um dispositivo']"
                  />
                </div>
              </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
              <q-card>
                <q-card-section class="bg-primary text-white">
                  <div class="text-h6">Habilite a gravação do cartão</div>
                  <div class="text-subtitle2">{{ this.dispositivoCadastro.value }}</div>
                </q-card-section>
              </q-card>
              <q-separator/>
              <div class="col no-wrap text-center flex-center">
                <div class="q-pt-xl">
                  <q-btn
                    flat
                    color="positive"
                    label="Habilitar leitura"
                    @click="changeRegisterState"
                  />
                </div>
            </div>
          </q-carousel-slide>
          <template v-slot:control>
            <q-carousel-control
              position="top-right"
              :offset="[18, 18]"
            >
              <q-btn
                flat
                round
                color="white"
                icon="close"
                @click="changeDialogState(false)"
              />
            </q-carousel-control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
              class="q-gutter-xs"
            >
              <q-btn
                flat text-color="black" icon="arrow_left"
                @click="$refs.carousel.previous()"
              />
              <q-btn
                color="primary"
                text-color="white"
                label="Próximo"
                icon-right="arrow_right"
                @click="$refs.carousel.next()"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </q-dialog>
    </div>
    <div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-fab push color="primary" icon="add" direction="up">
          <q-fab-action
            push
            text-color="primary"
            color="white"
            @click="changeDialogState(true), $refs.carousel.goTo(1)"
            icon="note_add"
            v-if="options != null"
          />
          <q-fab-action
            push
            text-color="positive"
            color="white"
            @click="populateLogbookTable"
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
  name: 'RFID',
  created() {
    // Vigia mutações e atualiza os dados todas as vezes que um novo dado for inserido
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'logbook/setLogbookData') {
        this.populateLogbookTable();
      }
    });
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'devices/setNewDeviceId') {
        this.getRegistratorDevices();
      }
    });
    this.getRegistratorDevices();
    this.placeRegistratorDevicesOnOptions();
  },
  mounted() {
    this.getLogbookData();
    this.populateLogbookTable();
  },
  computed: {
    ...mapState('logbook', ['logbookData', 'addUserDialog']),
    ...mapState('devices', ['registratorsList']),
  },
  methods: {
    ...mapActions('logbook', ['getLogbookData', 'changeDialogState']),
    ...mapActions('devices', ['getRegistratorDevices', 'autorizaLeitura', 'desautorizaLeitura']),
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
    changeRegisterState() {
      this.autorizaLeitura(this.dispositivoCadastro.value);
      setTimeout(() => {
        this.desautorizaLeitura(this.dispositivoCadastro.value);
      }, 60000);
      this.changeDialogState(false);
    },
    placeRegistratorDevicesOnOptions() {
      this.registratorsList.forEach((device) => {
        this.options.push({
          label: `${device.name} - ID: ${device.id}`,
          value: device.id,
        });
      });
    },
    confirm() {
      this.$q.dialog({
        title: 'Confirme',
        message: 'O nome do dispositivo é: ...',
        cancel: true,
        persistent: true,
      }).onOk(() => {});
    },
  },
  data() {
    return {
      dispositivoCadastro: '',
      options: [],
      slide: 1,
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
          noData: 'Não foram encontrados nenhum registro no banco de dados.',
        },
      },
    };
  },
};
</script>

<style scoped>

</style>
