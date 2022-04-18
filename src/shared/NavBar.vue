<template>
  <q-header elevated id="navbar">
    <q-toolbar class="toolbar q-py-sm">
      <q-toolbar-title>
        <a @click="goHome()" class="logo-btn" clickable>ShengBase</a>
      </q-toolbar-title>

      <div>
        <div id="onDesktop">
          <q-btn no-caps flat to="/about" class="nav-btn" label="About" />
          <q-btn no-caps flat to="/faqs" class="nav-btn" label="FAQs" />
          <q-btn no-caps flat to="/register" class="nav-btn" label="Register" />
          <q-btn no-caps flat to="/login" class="nav-btn" label="Login" />
        </div>

        <q-btn
          flat
          dense
          round
          id="onHandset"
          icon="menu"
          aria-label="Menu"
          @click="dropDownMenu = !dropDownMenu"
        >
          <q-menu auto-close>
            <q-list
              style="min-width: 100px; height: calc(100% - 0); margin-top: 0"
            >
              <q-item to="/about" exact clickable v-ripple>
                <q-item-section> About </q-item-section>
              </q-item>

              <q-item to="/faqs" exact clickable v-ripple>
                <q-item-section> FAQs </q-item-section>
              </q-item>

              <q-item to="/register" exact clickable v-ripple>
                <q-item-section> Register </q-item-section>
              </q-item>

              <q-item to="/login" exact clickable v-ripple>
                <q-item-section> Login </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavBar",

  setup() {
    return {
      dropDownMenu: ref(false),
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
#navbar {
  box-shadow: 0 3px 5px -1px #0003, 0 6px 10px #00000024, 0 1px 18px #0000001f;
}
.toolbar {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.logo-btn {
  font-size: 1.7rem;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
}
.logo-btn:hover {
  color: rgba(255, 255, 255, 0.6);
}
.nav-btn {
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
}
.nav-btn:hover {
  color: #42b983;
}

#onHandset {
  display: none;
}

#onDesktop {
  display: block;
}

@media only screen and (max-width: 575px) {
  .logo-btn:hover {
    color: #ffffff;
  }
  #onHandset {
    display: block;
  }
  #onDesktop {
    display: none;
  }
}
</style>