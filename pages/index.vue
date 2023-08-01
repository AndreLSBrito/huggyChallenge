<template>
  <section class="container">
    <aside class="inBox">
      <section class="headerInBox">
        <h1 >Minhas Mensagens</h1>     
      </section>
      
      <ContactCard/>
    </aside>
    <main class="chat">
      bbbbb
    </main>
  </section>
</template>

<script>
  // import colors from "../utils/colors";

  // export default {
  //   data(){
  //     return {
  //       colors: colors
  //     }
  //   }
  // }
</script>

<style>

*{
  margin: 0;
  padding: 0;
}

.container{
  display: flex;
  height: 100vh;
}

.inBox{
  margin: 0 0.5rem;
  flex:1;
}

.headerInBox{
  margin: 0.88rem 0;
  padding: 0 1rem;
  align-items: center;
}

h1{
  color: #2934A5;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 500;
  line-height: 180%; /* 2.25rem */
}

.chat{
  flex: 2;
  background-color: blueviolet;
}

</style>

