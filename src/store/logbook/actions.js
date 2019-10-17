import { db } from '../../firebase';

export function getLogbookData({ commit }) {
  db.collection('logbook').orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
    const tempData = [];
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        cardUid: doc.data().uid,
        sender_id: doc.data().sender_id,
        timestamp: doc.data().timestamp,
      };
      tempData.push(data);
    });
    commit('setLogbookData', tempData);
  });
}

export function changeDialogState({ commit }, payload) {
  commit('dialogAddUser', payload);
}
