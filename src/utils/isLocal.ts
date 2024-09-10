export const isLocal = () => {
  const local = ["localhost", "192.168.0.62"];
  return local.indexOf(location.hostname) != -1 ? true : false;
};
