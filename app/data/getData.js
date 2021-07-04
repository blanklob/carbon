export default async function (user) {
  const response = await fetch(
    'https://carbon-apirest.herokuapp.com/user/' + user
  )
  const data = await response.json()
  return data
}
