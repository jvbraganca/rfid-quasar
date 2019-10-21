export function appendDevices(state, payload) {
  state.devices = payload;
}

export function setNewDeviceId(state, payload) {
  state.newDeviceId = payload;
}

export function setRegistratorDevices(state, payload) {
  state.registratorsList = payload;
}

export function enableDialog(state, payload) {
  state.persistent = payload;
}
export function setMayRegister(state, payload) {
  state.mayRegister = payload;
}
