<template>
  <section class="mainPage">
    <aside class="inBox">
      <section class="headerInBox">
        <h1 >Minhas Mensagens</h1>     
      </section>
      
      <ContactCard
        v-for="(chat, indexChat) in chats"
        @click="activeChat = indexChat"
        :contact="chat.chatCustomer ? chat.chatCustomer.name : ''"
        :lastMessage="chat.lastMessage ? chat.lastMessage.text : ''"
        :key="indexChat"
      />
     
    </aside>
    <main class="chat">
      <HeaderSection
        :contactName="chats[activeChat] ? chats[activeChat].chatCustomer.name: ''"
      />
     
      <section class="chatList" ref="chatMessages">
        <Message
          v-for="(message, indexMessage) in messages"
          :key="indexMessage"
          :content="message.text"
          :hour="message.sendAt"
          :user="message.receiver===null"
          :file="message.file"
        />
      </section>

      <section class="inputContainer">
        <section class="inputMessage">
          <input
            type="text"
            class="inputText"
            placeholder="Escreva sua mensagem..."
            v-model="contentNewMessage"
            v-on:keyup.enter="()=>sendMessage(chats[activeChat].id)"  
          />
          
          <section class="imageSection">
            <section v-if="selectedImage" class="imageContainer">
              <figure class="imagePreview">
                <img :src="selectedImage" alt="Imagem selecionada" />
              </figure>
              
              <PhXCircle @:click="handleImageRemove" class="iconRemove" size="18" weight="thin" />
            </section>
            
            <label v-else class="iconContainer">
              <input type="file" @change="handleImageUpload" class="imageInput" />
              <PhImage  class="icon" size="24" weight="thin" color="#75757B"/>
            </label>

          </section>  
        </section>
        
        <button
         class="sendButton"
          @:click="()=>sendMessage(chats[activeChat].id)"
          :disabled="contentNewMessage.trim() == '' && selectedImage==null"
        >
          Enviar
        </button>
      </section>
    </main>
  </section>
</template>

<script>
  // import { chats } from '../dados';
  import { PhImage, PhXCircle } from "@phosphor-icons/vue";

  
  export default {

    data(){
      return {
        chats:[],
        messages: [],
        activeChat: 0,
        contentNewMessage: "",
        selectedImage: null
      }
    },

    async mounted(){
      await this.fetchChats();
      this.chats && await this.fetchMessages(this.chats[0].id);
      this.scrollToBottom();

    },

    methods: {

      async fetchChats(){
  
        const data = await $fetch('/api/chats')
        return this.chats = data
      },

      async fetchMessages(id){
  
        const data = await $fetch(`/api/${id}/messages`)
        if(data){
          data.reverse()
        }
        return this.messages = data
      },

      async sendMessage(id){

        // let currentTime = new Date().getHours() +":" + new Date().getMinutes();

        // let newMessage = {
        //   "hour": currentTime,
        //   "content": this.contentNewMessage,
        //   "user": true,
        //   "file": this.selectedImage
        // };
       
        // this.chats[this.activeChat]
        //   .messages
        //   .push(newMessage)
        // ;

        // this.contentNewMessage="";
        // this.selectedImage= null;
        // this.$nextTick(() => {
        //   this.scrollToBottom();
        // });

        await $fetch(`/api/${id}/message`, {
          method: 'POST',
          body: JSON.stringify({
            text: this.contentNewMessage,
            file: this.selectedImage,
            isInternal: false,
          }),
        })
        
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
      },

      scrollToBottom(){
        const chatMessages = this.$refs.chatMessages

        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    },

    components: {
      PhImage,
      PhXCircle
    },

  }
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

.mainPage {
  display: flex;
  max-width: 100vw;
  max-height: 100vh;
}

.inBox {
  margin: 0 0.5rem;
  height: 100%;
  overflow-y: auto;
}

.headerInBox {
  margin: 0.88rem 0;
  padding: 0 1rem;
  align-items: center;
}

h1 {
  color: #2934A5;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 180%; /* 2.25rem */
}

.chat {
  display: flex;
  flex: 1;
  padding: 0 1rem 1.5rem;
  flex-direction: column;
  background-color: #F6F6F8;
  height: 95vh;
}  

.chatList{
  max-height: 100%;
  overflow-y: auto;
  flex: 1;
  flex-direction: column-reverse;
}

.inputContainer {
  display: flex;
  padding: 1rem 1.5rem 1rem 0;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0px -1px 6px 0px rgba(0, 0, 0, 0.03);
  background: #FFF;
}

.inputMessage {
  display: flex;
  padding: 0.5rem 0.5rem 0.5rem 0;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.25rem;
  border: 1px solid var(--color-border-neutral-1, #E8E8EB);
}

.inputText {
  display: flex;
  padding: 0.25rem 0.75rem;
  align-items: flex-start;
  align-self: stretch;
  color: #46464A;
  border: none;
}

.imageSection {
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

.sendButton:hover:not(:disabled){
  opacity: 0.6;
  transition: 0.2s;
}

.sendButton:disabled{
  color: #9D9DA3 ;
  background-color: #DCDCE1;
}

</style>

