<template>
  <q-form class="form" @submit.prevent="onSubmit">
    <q-input
      class="q-py-md"
      filled
      v-model="email"
      label="Email Address *"
      dense
      type="email"
      lazy-rules
      :rules="[
        (val) => validateEmail(val) || 'Please provide a valid email address',
      ]"
    />
    <q-input
      class="q-py-md"
      filled
      v-model="password"
      label="Password *"
      dense
      :type="isPwd ? 'password' : 'text'"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Password cannot be empty!']"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <div class="q-mt-md">
      <q-btn no-caps :loading="isLoading" type="submit" color="primary">
        Sign In
        <template v-slot:loading>
          <q-spinner class="on-left" color="white" />
        </template>
      </q-btn>
      <span v-if="isLoading" class="q-pl-md">Signing In...</span>
      <div class="q-mt-lg">
        <a class="href-link" @click="forgotPass()"> Forgot password </a>
      </div>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";

import { validateEmail, saveActivityLogs } from "../utils/helpers.js";

export default defineComponent({
  name: "LoginForm",

  setup() {
    return {
      isPwd: ref(true),
      email: ref(null),
      password: ref(null),
      isLoading: ref(false),
    };
  },

  methods: {
    async onSubmit() {
      this.isLoading = true;

      const data = {
        email: this.email,
        password: this.password,
      };

      await this.$store.dispatch("auth/login", data).then(
        (res) => {
          Notify.create({
            type: "positive",
            message: "Success. Sign-In successful.",
            group: false,
          });

          // Save user activity log
          const userAction = {
            userId: res.data?._id,
            action: `Signed in to your account`,
          };
          saveActivityLogs(userAction);

          this.isLoading = false;
          this.$router.push("/");
        },
        (error) => {
          if (
            error?.response?.status === 400 ||
            error?.response?.status === 404
          ) {
            Notify.create({
              type: "warning",
              message: "Email or password do not match.",
              group: false,
            });

            // Save user activity log
            const userAction = {
              userId: error?.response?.data?.data?._id,
              action: `Attempted to sign in to your account: Email or password do not match.`,
            };
            saveActivityLogs(userAction);
          } else {
            Notify.create({
              type: "negative",
              message: error?.response?.data?.message
                ? error.response.data.message
                : "Something went wrong while signing in.",
              group: false,
            });
          }
          this.isLoading = false;
        }
      );
    },

    validateEmail,

    forgotPass() {
      Notify.create({
        type: "info",
        color: "teal",
        position: "center",
        message: "Feature is in development. It will be available soon.",
        group: false,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.href-link {
  color: green;
  cursor: pointer;
}
.href-link:hover {
  color: rgba(0, 128, 0, 0.85);
}

@media only screen and (max-width: 575px) {
  //
}
</style>
