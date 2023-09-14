<template>
  <section class="mainPage">
    <nav :class="isNavOpen ? 'sideNavOpen' : 'sideNav'">
      <div class="navIcon" @click="toggleNav">
        <PhCaretLeft v-if="isNavOpen" size="16" color="white"/>
        <PhCaretRight v-else size="16" color="white"/>
      </div>

      <div v-if="isNavOpen">
        <section class="headerInBox">
          <h1 >Minhas Mensagens</h1>     
        </section>
        
        <ContactCard
          v-for="(chat, indexChat) in chats"
          @click="activeChat = indexChat"
          :contact="chat.chatCustomer ? chat.chatCustomer.name : ''"
          :lastMessage="chat.lastMessage ? chat.lastMessage.text : ''"
          :key="indexChat"
          :src="chats[activeChat] ? chats[activeChat].chatCustomer.photo : 'https:\/\/c.pzw.io\/img\/avatar-user-boy.jpg'"
        />
      </div>
    </nav>
    
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
        :src="chats[activeChat] ? chats[activeChat].chatCustomer.photo : 'https:\/\/c.pzw.io\/img\/avatar-user-boy.jpg'"
      />
     
    </aside>
    <main class="chat">
      <HeaderSection
        :contactName="chats[activeChat] ? chats[activeChat].chatCustomer.name: ''"
        :src="chats[activeChat] ? chats[activeChat].chatCustomer.photo : 'https:\/\/c.pzw.io\/img\/avatar-user-boy.jpg'"
      />
     
      <section class="chatList" ref="chatMessages">
        <Message
          v-for="(message, indexMessage) in messages"
          :key="indexMessage"
          :content="message.text"
          :hour="message.sendAt"
          :user="message.receiver!==null"
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
              <input type="file" @change="handleFileInputChange" class="imageInput" />
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
  import { PhImage, PhXCircle, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";

  export default {
    data(){
      return {
        chats:[],
        messages: [],
        activeChat: 0,
        contentNewMessage: "",
        selectedImage: null,
        attachFile: null,
        isNavOpen: false
      }
    },

    async mounted(){
      await this.fetchChats();
      this.chats && await this.fetchMessages(this.chats[0].id);
      this.scrollToBottom();
    },

    methods: {

      toggleNav() {
        // change sideNav state
        this.isNavOpen = !this.isNavOpen;
      },

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
        try {
          const url = await this.uploadFile();

          const data =await $fetch(`/api/message/${id}/messages`, {
            method: 'POST',
            body: JSON.stringify({
              text: this.contentNewMessage,
              file: url,
              isInternal: false,
            }),
          })
          
          this.contentNewMessage="";
          this.attachFile= null;
          this.selectedImage = null;
          await Promise.all([this.fetchMessages(id), this.fetchChats()]); 
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          
        } catch (error) {
          console.log('Erro no envio da mensagem')
        }
      },

      handleFileInputChange(event) {
        this.attachFile = event.target.files[0];
        this.selectedImage = URL.createObjectURL(this.attachFile)
      },

      async uploadFile() {
        if (!this.attachFile) {
          return null;
        }

        const formData = new FormData();
        formData.append('file', this.attachFile);

        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const url = await response.text(); // A URL do arquivo no s3
            return url
          } else {
            console.error('Erro ao fazer upload do arquivo:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao fazer upload do arquivo:', error);
        }
      },

      handleImageRemove(){
        this.selectedImage = null;
        this.attachFile = null
      },

      scrollToBottom(){
        const chatMessages = this.$refs.chatMessages

        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    },

    components: {
      PhImage,
      PhXCircle,
      PhCaretLeft,
      PhCaretRight
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

.sideNav{
  width: .5%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  display: none;
  transition: 0.5s;
}

.sideNavOpen{
  width: 80%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  transition: 0.5s;
  box-shadow: 0 0 7px 7px #00000062;
}

.navIcon{
  display: flex;
  align-items: center;
  position: relative;
  top: 50%;
  left: 95%;
  border-radius: 0px;
  background-color: #9D9DA3 ;
  width: 1rem;
  height: 2rem;
}

@media (max-width: 600px){
  .inBox{
    display: none;
  }

  .chat{
    padding: 0 1.5rem 1rem 0;
  }
  .sideNav{
    display: list-item;
  }
}


</style>

