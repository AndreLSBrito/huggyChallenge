export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const response = await fetch(`${process.env.BASE_URL}/chats/${event?.context?.params?.message}`,{
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}` 
      }
    })

    const result = await response.json()

    return result
    
  } catch (error) {
    console.log(error)
    console.log('Não foi possível enviar mensagem')
  }
})