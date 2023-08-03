<template>
  <section class="card">
    <img src="../assets/Agostinho.png"/>

    <section class="contact">
      <h2>{{ contact }}</h2>

      <article class="message">{{ lastMessage }}</article>
    </section>
  </section>
</template>

<script>
  export default {
    props: [
      'contact',
      'lastMessage'
  ]
  }
</script>

<style>
  .card {
    display: flex;
    height: 5.375rem;
    padding: 0rem 0.5rem;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.25rem;
    background:  #EEF0FC;
    
  }

  .contact {
    width: 17.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
  }

  h2 {
    color: #2934A5;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.6rem 
  }

  .message {
    color: #46464A;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.875rem;
    line-height: 1.575rem 
  }
</style>