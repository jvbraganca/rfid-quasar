import { Notify } from 'quasar';
import { db } from '../../firebase';


export function getDevices({ commit }) {
  db.collection('devices')
    .orderBy('name')
    .get()
    .then((snapshot) => {
      const tempData = [];
      snapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          name: doc.data().name,
          timestamp: doc.data().timestamp,
        };
        tempData.push(data);
      });
      commit('appendDevices', tempData);
    });
}

export function getRegistratorDevices({ commit }) {
  db.collection('devices')
    .orderBy('name')
    .where('registrator', '==', true)
    .get()
    .then((snapshot) => {
      const tempData = [];
      snapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          name: doc.data().name,
        };
        tempData.push(data);
      });
      commit('setRegistratorDevices', tempData);
    });
}

export function autorizaLeitura({ commit }, payload) {
  db.collection('devices').doc(payload)
    .update({ mayRegister: true })
    .then(() => {
      Notify.create({
        position: 'top',
        color: 'warning',
        message: `O dispositivo <span class="text-weight-bolder">${payload}</span> está liberado para leitura por <span class="text-weight-bolder">60 segundos</span>`,
        html: true,
        timeout: 5000,
      });
      commit('setMayRegister', true);
    });
}

export function desautorizaLeitura({ commit }, payload) {
  db.collection('devices').doc(payload)
    .update({ mayRegister: false })
    .then(() => {
      Notify.create({
        position: 'top',
        color: 'negative',
        message: `O dispositivo <span class="text-weight-bolder">${payload}</span> está bloqueado para leitura`,
        html: true,
        timeout: 5000,
      });
      commit('setMayRegister', false);
    });
}

export function addNewDevice({ commit }, payload) {
  db.collection('devices')
    .add({
      name: payload[0],
      registrator: payload[1],
      registeredBy: 'Default',
      timestamp: null,
    })
    .then((doc) => {
      commit('setNewDeviceId', doc.id);
      Notify.create({
        position: 'top',
        color: 'info',
        message: `O dispositivo <span class="text-weight-bolder">${payload[0]}</span> foi criado e seu ID é <span class="text-weight-bolder">${doc.id}</span>`,
        html: true,
        timeout: 5000,
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(`Erro ao adicionar documento: ${error}`);
    });
}

export function dialogAddDevice({ commit }, payload) {
  commit('enableDialog', payload);
}
