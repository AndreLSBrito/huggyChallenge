<template>
  <section class="containerMessage">
    <section :class="user ? 'userMessage' : 'contactMessage'">
      <figure v-if="file" class="imgContainer">
        <img :src="file" alt="imagem enviada" class="imageMessage"/>
      </figure>
      <p>{{ content }}</p>
    </section>
    
    <p :class="{userHour: user}">
      {{ `${new Date(hour).getHours()}:${new Date(hour).getMinutes()}` }}
    </p>

  </section>
</template>

<script>
  export default {  
    props: [
      'content',
      'hour',
      'user',
      'file'
    ],  
  }
</script>
 
<style>
 .containerMessage{
    display: flex;
    flex-direction: column;
    color: #232326;
    font-size: 0.75rem;
    line-height: 1.35rem; 
  }

  .imgContainer {
    display: flex;
    width: 17.5rem;
    height: 15rem;
    align-items: center;
  }

  .imageMessage {
    display: flex;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .contactMessage{
    display: flex;
    padding: 0.875rem 1.25rem;
    align-self: flex-start;
    flex-direction: column;
    border-radius: 0.375rem 0.375rem 0.375rem 0.125rem;
    border: 1px solid #DCDCE1;
    background:  #FFF;
    font-size: 1rem;
  }

  .userMessage{
    display: flex;
    align-self: flex-end;
    padding: 0.875rem 1.25rem;
    align-self: flex-end;
    flex-direction: column;
    gap: 0.625rem;
    border-radius: 0.375rem 0.375rem 0.125rem 0.375rem;
    border: 1px solid #374FC9;
    background: #374FC9;
    color: #FFFFFF;
    font-size: 1rem;
  }

  .userHour{
    align-self: flex-end;
  }

</style>