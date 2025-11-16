export default function generateRandomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

export function transformEvaluate(value: string) {
  let valueFormat: string = ''
  if (!value) {
    return valueFormat;
  }
  if (value.trim() === '0') {
    valueFormat = 'Não Analisado'
  } else if (value.trim() === '1') {
    valueFormat = 'A analisar...'
  } else if (value.trim() === '2') {
    valueFormat = 'Analisado'
  }
  return valueFormat;
}
