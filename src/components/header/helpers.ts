export const shortenAddress = (address: string) =>
  `${address.substr(0, 7)}...${address.substr(-7)}`;
