export const createInstanceDummy = async () => {
    const promise = new Promise(resolve => {
        setTimeout(() => {resolve(true)}, 2000);
      });
    await promise;
    return "done";
}