export default async function (user) {
  const response = await fetch(
    'http://carbon-api.younessidbakkasse.com/user/' + user
  )
  const data = await response.json()
  return data
}
