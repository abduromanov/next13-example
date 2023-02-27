export default function toIDR(number = 0) {
  return number?.toLocaleString("id-ID", {
    currency: "IDR",
    style: "currency",
  });
}
