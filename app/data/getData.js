export default async function (user) {
  const response = await fetch('http://138.68.103.215/user/' + user)
  const data = await response.json()
  return data
}
