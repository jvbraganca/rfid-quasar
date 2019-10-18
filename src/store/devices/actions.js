import { db } from '../../firebase';

export function getDevices({ commit }) {
  db.collection('devices').orderBy('name').get().then((snapshot) => {
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

export function addNewDevice({ commit }, payload) {
  db.collection('devices').add({
    name: payload,
    registeredBy: 'Default',
    timestamp: null,
  }).then((doc) => {
    commit('setNewDeviceId', doc.id);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log(`Erro ao adicionar documento: ${error}`);
  });
}

export function dialogAddDevice({ commit }, payload) {
  commit('enableDialog', payload);
}
