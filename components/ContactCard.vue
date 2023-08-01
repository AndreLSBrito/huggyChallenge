<template>
  <section class="card">
    <img src="../assets/Agostinho.png"/>

    <section class="contact">
      <h2>Augustinho Carrara</h2>

      <article class="message">199,99 asdasdasd asdasda aasdas  sadas asd asdas asd asdsdasdasdsad asdasd asdas dsadsad sadaasd asdas asd a</article>
    </section>
  </section>
</template>

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
    
  }

  h2 {
    color: #2934A5;
    font-family: IBM Plex Sans;
    font-size: 1rem;
    font-style: normal;
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