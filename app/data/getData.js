export default async function (user) {
  const response = await fetch('http://138.68.103.215/data-json/' + user)
  const data = await response.json()
  return data
}
