<template>
  <section class="containerMessage">
    <section v-if="user" class="userMessage">
      {{ content }}
    </section>

    <section v-else class="contactMessage">
      {{ content }}
    </section>
    
    <p v-bind:class="{userHour: user}">
      {{ hour }}
    </p>

  </section>
</template>

<script>
  export default {  
    props: [
      'content',
      'hour',
      'user'
    ]
  }
</script>
 
<style>
 .containerMessage{
    display: flex;
    padding: 0.5rem 0rem 0.5rem 1rem;
    flex-direction: column;
    color: #232326;
    font-size: 0.75rem;
    line-height: 1.35rem 
  }

  .contactMessage{
    display: flex;
    padding: 0.875rem 1.25rem;
    align-self: flex-start;
    border-radius: 0.375rem 0.375rem 0.375rem 0.125rem;
    border: 1px solid #DCDCE1;
    background:  #FFF;
    font-size: 1rem;
  }

  .userMessage{
    display: flex;
    align-self: flex-end;
    padding: 0.875rem 1.25rem;
    justify-content: flex-end;
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