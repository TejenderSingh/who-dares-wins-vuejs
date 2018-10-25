<template>
  <section>
    <transition name="fade">
      <div v-show="isActive">
        <h1 class="title">Who Dares Wins!</h1>
        <h2 class="title is-4">Enter your name and email to go in the draw</h2>
        <form @submit.prevent="addEntry(name, email)">
          <b-field label="Name" :type="errors.has('name') ? 'is-danger' : ''"
            :message="errors.has('name') ? errors.first('name') : '' ">
              <b-input
                placeholder="Name"
                name="name"
                ref="nameInput"
                v-validate="'required|min:2|alpha'"
                v-model="name">
              </b-input>
          </b-field>
          <b-field label="Email" :type="errors.has('email') ? 'is-danger' : ''"
            :message="errors.has('email') ? errors.first('email') : ''">
              <b-input type="email"
                placeholder="Email"
                name="email"
                v-validate="'required|email'"
                v-model="email"
                @keypress.enter="setFocus()"
                maxlength="30">
              </b-input>
          </b-field>
          <input type="submit" value="submit" class="button is-primary" @click="setFocus()">
        </form>
        <section v-show="isActive">
          <b-table
            :data="isEmpty ? [] : data"
            >
            <template slot-scope="props">
                <b-table-column field="name" label="Name">
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column field="email" label="Email">
                    {{ props.row.email }}
                </b-table-column>

                <b-table-column field="created" label="Created">
                    {{ props.row.created }}
                </b-table-column>

                <b-table-column centered>
                    <span class="tag is-danger" @click="deleteEntry(props.row.id)">
                        Delete
                    </span>
                </b-table-column>
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>Nothing here.</p>
                    </div>
                </section>
            </template>
          </b-table>
        <button class="button is-info" :disabled="!data.length >= 2" @click="pickWinner()">Draw !</button>
        </section>
      </div>
    </transition>
    <transition name="bounce">
      <section id="msg" v-show="!isActive">
        <b-message type="is-info" size="is-medium">
          Congratulations {{ msgUc() }}, you have won Frontend Masters subscription!
        </b-message>
        <button class="button is-dark" @click="isActive = !isActive">Close</button>
      </section>
    </transition>
  </section>
</template>

<script>
import { db } from '../main'
export default {
  name: 'HelloWorld',
  data() {
    return {
      data: [],
      columns: [
        {
          field: 'name',
          label: 'Name'
        },
        {
          field: 'email',
          label: 'Email'
        },
        {
          field: 'created',
          label: 'Created'
        }
      ],
      isEmpty: false,
      isActive: true,
      delItem: '',
      winner: '',
      name: '',
      email: ''
    };
  },
  firestore() {
    return {
      data: db.collection('data').orderBy('created')
    };
  },
  methods: {
    addEntry(name, email) {
      this.$validator.validate().then((result) => {
        if(result) {
          const d = new Date();
          const created = d.toLocaleString(['en-gb'], {
            month: 'short',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          db.collection('data').add({ name, email, created })
          this.name = ''
          this.email = ''
        } else {
            this.$toast.open( {
              duration: 5000,
              message: `Please enter a valid Name and Email`,
              position:'is-bottom',
              type: 'is-danger'
            })
        }
      })
    },
    setFocus() {
      this.$refs.nameInput.focus()
    },
    pickWinner() {
      const randomIndex = Math.floor(Math.random() * this.data.length)
      this.isActive = !this.isActive
      return (this.winner = this.data[randomIndex].name)
    },
    msgUc() {
      return this.winner.toUpperCase()
    },
    deleteEntry(id) {
      db.collection('data')
        .doc(id)
        .delete()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1.title {
  margin-top: 2rem;
  font-family: 'Merriweather', serif;
}
h2 {
  font-family: 'Merriweather', serif;
}
form {
  margin-bottom: 2rem;
}
.button.is-info {
  margin: 2rem 0;
}
#msg {
  margin-top: 2rem;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  transition: opacity 0s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.fade-enter-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-active {
  transition: opacity 0s;
}
.tag {
  cursor: pointer;
}
</style>
