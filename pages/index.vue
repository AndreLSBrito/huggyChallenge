<template>
  <section class="mainPage">
    <aside class="inBox">
      <section class="headerInBox">
        <h1 >Minhas Mensagens</h1>     
      </section>
      
      <ContactCard
        v-for="(chat, indexChat) in chats"
        @click="activeChat = indexChat"
        :contact="chat.name"
        :lastMessage="'199,99 asdasdsadasdasdasdsadsdasdsdasdsadasdasddasd'"
        v-bind:key="indexChat"
      />
     
    </aside>
    <main class="chat">
      <HeaderSection
        :contactName="chats[activeChat].name"
      />
     
      <article class="chatList">
        <Message
          v-for="(message, indexMessage) in chats[activeChat].messages"
          v-bind:key="indexMessage"
          :content="message.content"
          :hour="message.hour"
          :user="message.user"
        />
        <section>
          <input
            type="text"
            class="input"
            placeholder="Escreva sua mensagem"
            v-model="contentNewMessage"
            v-on:keyup.enter="sentMessage"
          />
        </section>
      </article>
    </main>
  </section>
</template>

<script>
  import { chats } from '../dados';
  
  export default {
    data: function(){
      return {
        chats: chats,
        activeChat: 0,
        contentNewMessage: ""
      }
    },

    methods: {
      sentMessage: function(){
        let currentTime = new Date().getHours() +":" + new Date().getMinutes();

        let newMessage = {
          "hour": currentTime,
          "content": this.contentNewMessage,
          "user": true
        };

        this.chats[this.activeChat]
          .messages
          .push(newMessage)
        ;

        this.contentNewMessage="";

        
      }
    }
  }
</script>

<style>

*{
  margin: 0;
  padding: 0;
}


.mainPage{
  display: flex;
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
  font-weight: 500;
  line-height: 180%; /* 2.25rem */
}

.chat{
  flex: 3;
  background-color: #F6F6F8;
  height: 100vh;
  overflow: auto;
  
}

.chatList{
  margin-top: 2.5rem;
  padding: 1.5rem 1rem;
  justify-content: flex-end;
  flex-direction: column;
}


</style>

