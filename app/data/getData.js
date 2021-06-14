// Fetch data
console.log('Fetching data starts here.')

export default async function () {
  const response = await fetch('data.json')
  const data = await response.json()
  return data
}
