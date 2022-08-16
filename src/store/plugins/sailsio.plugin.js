export default function createSailsIOPlugin(io) {
  return (store) => {
    store.$io = io;
  };
}
