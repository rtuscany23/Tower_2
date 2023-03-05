<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center mt-3">
        <div class="card text-center">
          <div>
            <!-- <router-link :to="{ name: 'Profile', params: { profileId: comment.creatorId } }"> -->


            <!-- <img class="img-fluid rounded" :src="comment.creator.picture" :alt="comment.creator.name + ' picture'"
              :title="comment.creator.name"> -->


            <!-- </router-link> -->
          </div>
          <div class="card-body">
            <p class="card-text">{{ comment.body }}</p>
            <p>{{ comment }}</p>
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
import { logger } from '../utils/Logger.js';

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
        await commentsService.deleteComment(props.comment.commentId)
        logger.log(props.comment)
        // remove the comment from the local array of comments
        const index = AppState.comments.findIndex(c => c.commentId === props.comment.commentId)
        if (index !== -1 && AppState.comments) {
          AppState.comments.splice(index, 1)
        }
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }


    return {
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),
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