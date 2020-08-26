import * as Storage from '../utils/storageSyncTool';

const ID = 'DRIVER_ID';

const isLogin = () => {
  const isLogin = Storage.getStorage(ID);
  if (isLogin) {
    return true;
  }
  return false;
}

const setLogin = (id) => {
  return Storage.setStorage(ID,id);
}

module.exports = {
  isLogin,
  setLogin
}