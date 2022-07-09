const numberWithCommas = (num: string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default numberWithCommas;
