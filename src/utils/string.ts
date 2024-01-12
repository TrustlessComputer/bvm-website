const getAvatarName = (name: string): string => {
  let words = '';
  if (name && name.split(' ').length > 0) {
    name.split(' ').length = 21;
    const arrName = name.split(' ');
    if (arrName[0]) {
      words = arrName[0].charAt(0);
      if (arrName[1]) {
        words += arrName[1].charAt(0);
      } else if (arrName[0].charAt(1)) {
        words += arrName[0].charAt(1);
      }
      words = words.toUpperCase();
    }
  }
  return words;
};

const compareString = (a: unknown, b: unknown) => {
  return a?.toString?.()?.toLowerCase?.() === b?.toString?.()?.toLowerCase?.();
};


export {
  getAvatarName,
  compareString
}
