<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center mt-3">
        <div class="card text-center">
          <div>
            <!-- <router-link :to="{ name: 'Profile', params: { profileId: comment.creatorId } }">
              <img :src="comment.creator.picture" :alt="comment.creator?.name" class="profile-picture">
            </router-link> -->
          </div>
          <h3>{{ comment.creator?.name }}</h3>
          <div class="card-body">
            <p class="card-text">{{ comment.body }}</p>

            <button class="btn btn-danger" v-if="comment.creatorId == account.id" @click="deleteComment">Delete
              Comment</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from 'vue'
import { Comment } from "../models/Comment";
import { commentsService } from '../services/CommentsService.js';
import { AppState } from '../AppState'
import Pop from "../utils/Pop";

export default {
  props: {
    comment: {
      type: Comment,
      required: true
    }
  },
  setup(props) {

    async function deleteComment() {
      try {
        await commentsService.deleteComment(props.comment.id)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    return {
      account: computed(() => AppState.account),
      deleteComment
    }
  }
}

</script>


<style lang="scss" scoped>
.cover-image {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}

.profile-picture {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  box-shadow: 2px 2px 4px black;
}
</style>