import { db } from '../../firebase';

export function getDevices({ commit }) {
  db.collection('devices').onSnapshot((snapshot) => {
    const tempData = [];
    snapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        name: doc.data().name,
        timestamp: doc.data().timestamp,
        mayRegistry: doc.data().mayRegistry,
      };
      tempData.push(data);
    });
    commit('appendDevices', tempData);
  });
}
