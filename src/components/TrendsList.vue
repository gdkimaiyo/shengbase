<template>
  <div class="trends q-my-xl">
    <q-card class="trending-words">
      <q-card-section class="card-header"> Most Liked </q-card-section>

      <q-card-section class="q-pt-none q-mt-md">
        <q-list v-if="!isLoading && mostLikes?.length > 0">
          <div v-for="(word, index) in mostLikes" :key="word._id">
            <q-item>
              <q-item-section>
                <q-item-label class="word text-primary">
                  {{ word.word }}
                </q-item-label>
                <q-item-label caption lines="2" class="meaning">
                  {{ word.rMeaning }}
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="fas fa-thumbs-up" color="positive" />
                  {{ word.likes.likes.length }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced inset v-if="index !== mostLikes.length - 1" />
          </div>
        </q-list>
        <div v-if="isLoading">
          <q-item v-for="index in 5" :key="index">
            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" width="37%" />
              </q-item-label>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="80%" />
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label class="row" caption>
                <q-icon
                  name="fas fa-thumbs-up"
                  style="padding-right: 4px"
                  color="grey"
                />
                <q-skeleton type="text" width="10px" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div v-if="!isLoading && mostLikes?.length === 0">
          <p style="color: rgba(0, 0, 0, 0.65)">List unavailable</p>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="top-users">
      <q-card-section class="card-header"> Top Users </q-card-section>

      <q-card-section class="q-pt-none q-mt-md">
        <q-list v-if="!isLoading && topUsers?.length > 0">
          <div v-for="(user, index) in topUsers" :key="user._id">
            <q-item>
              <q-item-section top avatar>
                <q-avatar
                  color="primary"
                  text-color="white"
                  icon="fas fa-user"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <span
                    :class="{
                      'logged-user': user.authorId === loggedInUser?._id,
                    }"
                  >
                    {{ user.author }}
                  </span>
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-icon :name="user.pos" color="positive" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator
              spaced
              inset="item"
              v-if="index !== topUsers.length - 1"
            />
          </div>
        </q-list>
        <div v-if="isLoading">
          <q-item v-for="index in 5" :key="index">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="65%" />
              </q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                <q-icon :name="`fas fa-${index}`" color="grey" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <div v-if="!isLoading && topUsers?.length === 0">
          <p style="color: rgba(0, 0, 0, 0.65)">List unavailable</p>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
// import { Notify } from "quasar";
import { getWords } from "../shared/services/word.service";

import { randomNumber } from "../utils/helpers.js";

export default defineComponent({
  name: "TrendsList",

  setup() {
    const loggedInUser = JSON.parse(localStorage.getItem("sb_user"));
    return {
      allWords: ref(null),
      mostLikes: ref(null),
      topUsers: ref(null),
      loggedInUser: ref(loggedInUser),
      isLoading: ref(false),
    };
  },

  methods: {
    getAllWords() {
      this.isLoading = true;
      getWords()
        .then((response) => {
          // Sort by total word likes
          this.allWords = response.data?.sort((a, b) => {
            return b?.likes?.likes?.length - a?.likes?.likes?.length;
          });
          // Get only the top 5 words
          this.mostLikes = this.allWords?.slice(0, 5);
          // Randomly pick the word meaning
          this.mostLikes?.forEach((element) => {
            // Random number/index of word meaning.
            const rn = randomNumber(0, element?.meaning?.length - 1);
            element.rMeaning =
              element?.meaning[rn]?.meaning?.length > 0
                ? element.meaning[rn].meaning
                : element?.meaning[0].meaning;
          });
          // Get only the words with likes
          this.mostLikes = this.mostLikes?.filter(
            (word) => word?.likes?.likes?.length > 0
          );

          this.topUsers = [];
          let authorIds = [];
          this.allWords.forEach((wrd) => {
            if (!authorIds.includes(wrd.author._id)) {
              authorIds.push(wrd.author._id);
              // Filter out user words
              const uWords = this.allWords?.filter(
                (word) => word?.author._id === wrd.author._id
              );
              let likes = 0;
              uWords.forEach((element) => {
                likes += element?.likes?.likes?.length;
              });
              this.topUsers.push({
                author: `${wrd.author.firstname} ${wrd.author.lastname}`,
                authorId: wrd.author._id,
                likes: likes,
              });
            }
          });
          // Sort by totals likes in descending order
          this.topUsers = this.topUsers?.sort((a, b) => {
            return b?.likes - a?.likes;
          });
          // Get only the top 5 users
          this.topUsers = this.topUsers?.slice(0, 5);
          // Assign fontawesome badge icon
          let i = 1;
          this.topUsers.forEach((element) => {
            element.pos = `fas fa-${i}`;
            i++;
          });
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.allWords = [];
          this.mostLikes = [];
          this.topUsers = [];
        });
    },
  },

  mounted() {
    this.getAllWords();
  },
});
</script>

<style lang="scss" scoped>
.trending-words,
.top-users {
  width: 100%;
  max-width: 100%;
  margin-top: 24px;
}

.card-header {
  font-size: 1.35rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  background-color: rgba(83, 183, 129);
  // background-color: rgba(12, 69, 176, 0.9);
}

.word {
  font-size: 17px;
}
.meaning {
  font-size: 14px;
}

.logged-user {
  color: green;
  font-weight: bold;
}

@media only screen and (max-width: 575px) {
  .top-users {
    margin-top: 48px;
  }
  .logged-user {
    font-weight: normal;
  }
}
</style>
