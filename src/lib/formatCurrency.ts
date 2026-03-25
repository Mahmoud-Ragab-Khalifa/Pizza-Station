export const formatCurrency = (price: number) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  return currencyFormatter.format(price);
};
