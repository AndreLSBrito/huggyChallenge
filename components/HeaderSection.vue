<template>
  <section class="headerContainer">
    <img class="photoProfile" src="../assets/Agostinho.png" alt="Foto do contato"/>
    
    <p class="contactName">
      {{ contactName }}
    </p>
  </section>
</template>

<script>
  export default {
    props: [
      'contactName'
  ]
  }
</script>

<style>
.headerContainer{
  display: flex;
  height: 4rem;
  padding: 0 1rem;
  align-items: center;
  background:  #FFF;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
  gap: 0.5rem;
}

.photoProfile{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid  #E8E8EB; 
}

.contactName{
  font-size: 1rem;
  font-weight: 500;
  color: #141316;
}
</style>