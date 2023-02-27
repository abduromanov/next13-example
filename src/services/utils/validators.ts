export default function validators() {
  const required = (message?: string) => {
    return { required: message || "Field ini wajib diisi" };
  };

  return { required };
}
