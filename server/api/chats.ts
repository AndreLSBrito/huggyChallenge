export default defineEventHandler(async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/chats`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}` 
      }
    })
    
    const result = await response.json()

    return result
    
  } catch (error) {
    console.log("Erro na busca de chats")
  }
})