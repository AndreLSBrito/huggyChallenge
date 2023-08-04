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

        <section class="inputContainer">
          <section class="inputMessage">
            <input
              type="text"
              class="inputText"
              placeholder="Escreva sua mensagem"
              v-model="contentNewMessage"
              v-on:keyup.enter="sentMessage"  
            />
            
            <section class="imageSection">
              <section v-if="selectedImage" class="imageContainer">
                <span class="imagePreview">
                  <img :src="selectedImage" alt="Imagem selecionada" />
                </span>
                
                <PhXCircle v-on:click="handleImageRemove" class="iconRemove" size="18" weight="thin" />
              </section>
              
              <label v-else class="iconContainer">
                <input type="file" @change="handleImageUpload" class="imageInput" />
                <PhImage  class="icon" size="24" weight="thin" color="#75757B"/>
              </label>

            </section>  
          </section>
          
          <button
           class="sendButton"
            v-on:click="sentMessage"
            v-bind:disabled="contentNewMessage.trim() == ''"
          >
            Enviar
          </button>
        </section>

      </article>
    </main>
  </section>
</template>

<script>
  import { chats } from '../dados';
  import { PhImage, PhXCircle } from "@phosphor-icons/vue";
  
  export default {
    data: function(){
      return {
        chats: chats,
        activeChat: 0,
        contentNewMessage: "",
        selectedImage: null
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

        
      },

      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.selectedImage = URL.createObjectURL(file);
        } else {
          this.selectedImage = null;
        }
      },

      handleImageRemove(){
        this.selectedImage = null
      }
    },

    components: {
      PhImage,
      PhXCircle
    },

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

.inputContainer{
  display: flex;
  padding: 1rem 1.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.03);
  background: #FFF;
}

.inputMessage{
  display: flex;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.25rem;
  border: 1px solid var(--color-border-neutral-1, #E8E8EB);
}

.inputText{
  display: flex;
  padding: 0.25rem 0.75rem;
  align-items: flex-start;
  align-self: stretch;
  color: #46464A;
  border: none;
}

.imageSection{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.iconContainer {
  cursor: pointer;
  color: #75757B
}

.icon {
  padding: 0.125rem 0.25rem;
  border-radius: 0.5rem;
}

.imageInput {
  display: none;
}

.imageContainer{
  display: flex;
  align-items: flex-end;
}

.imagePreview img {
  width: 5.375rem;
  height: 5rem;
  padding: 0.15rem;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.iconRemove:hover{
  cursor: pointer;
  color: #D7494B;
}

.sendButton{
  display: flex;
  padding: 0.75rem 1.5rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 0.5rem;
  background: #38A96D;
  color: #fff;
  border: none;
}

.sendButton:disabled{
  color: #9D9DA3 ;
  background-color: #DCDCE1;
}

</style>

