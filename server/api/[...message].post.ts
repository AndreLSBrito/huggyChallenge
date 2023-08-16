export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const response = await fetch(`${process.env.BASE_URL}/chats/${event?.context?.params?.message}`,{
      method: 'POST',
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}` 
      }
    })

    const result = await response.json()
    
    console.log("🚀 ~ file: [...message].post.ts:6 ~ defineEventHandler ~ result:", result)
    
  } catch (error) {
    console.log(error)
    console.log('Não foi possível enviar mensagem')
  }
})