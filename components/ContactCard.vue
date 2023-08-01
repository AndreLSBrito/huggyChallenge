<template>
  <section class="card">
    <img/>

    <secttion class="contact">
      <h2>Augustinho Carrara</h2>

      <div class="message">199,99 asdasdasd asdasda aasdas  sadas asd asdas asd asdsdasdasdsad asdasd asdas dsadsad sadaasd asdas asd a</div>
    </secttion>
  </section>
</template>

<style>
  .card {
    width: 100%;
    display: flex;
    height: 5.375rem;
    padding: 0rem 0.5rem;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.25rem;
    background:  #EEF0FC;
  }

  .contact {
    display: flex;
    width: 100%;
    height: 1.8125rem;
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
    width: 100px;
    white-space: nowrap;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    font-size: 0.875rem;
    line-height: 1.575rem 
  }
</style>