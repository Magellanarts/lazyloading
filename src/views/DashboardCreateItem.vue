<template>
  <div>
    <form
      @submit.prevent="submitForm"
      novalidate
    >
      <text-input
        name="name"
        label="Name of item"
        v-model="item.name"
        :errors="errors"
        required
        labelClass="text-label--two-lines"
      />

      <h4>Details</h4>

      <text-input
        name="dailyPrice"
        label="Daily Price"
        v-model="item.dailyPrice"
        :errors="errors"
        required
        labelClass="text-label--two-lines"
      />

      <text-input
        name="deposit"
        label="Deposit"
        v-model="item.deposit"
        :errors="errors"
        required
      />

      <text-input
        name="description"
        label="Description"
        v-model="item.description"
        :errors="errors"
        required
        textarea
      />

      <h4>Location</h4>

      <text-input
        name="streetAddress"
        label="Street Address"
        v-model="item.streetAddress"
        :errors="errors"
        labelClass="text-label--two-lines"
      />

      <text-input
        name="city"
        label="City"
        v-model="item.city"
        :errors="errors"
      />

      <text-input
        name="state"
        label="State"
        v-model="item.state"
        :errors="errors"
      />

      <h4>Tags</h4>
      <multi-input
        :values="item.tagsSearchbale"
        label="Tags"
        @tagChange="handleTagChange"
      />

      <h4>Main Image</h4>

      <file-upload
        name="mainImage"
        @uploadComplete="mainImageUploaded"
        :multiple="false"
        :curImage="item.mainImage"
      />

      <h4>Other Images</h4>
      <multi-file-upload
        :images="item.otherImages"
        @uploadComplete="otherImagesUploaded"
        @imageDeleted="handleImageDelete"
      />

      <div class="form-field">
        <button class="button" type="submit">Submit</button>
      </div>
    </form>

    <transition name="fade" mode="out-in">
      <alert-modal
        v-show="submitSuccess"
        ref="success-modal"
        heading="Saved"
        type="success"
      />
    </transition>
  </div>
</template>

<script>
// TODO: Choose from popular tags?
// TODO: Automatically show potential tags based on other fields (name, description, etc.)?

import AlertModal from '@/components/common/AlertModal.vue';
import TextInput from '@/components/common/forms/TextInput.vue';
import MultiFileUpload from '@/components/common/forms/MultiFileUpload.vue';
import FileUpload from '@/components/common/forms/FileUpload.vue';
import MultiInput from '@/components/common/forms/MultiInput.vue';
import { mapActions, mapState } from 'vuex';
import { CREATE_ITEM, UPDATE_ITEM, SET_ITEM_DETAILS } from '@/store/types';
import { formValidation } from '@/mixins';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      submitSuccess: false,
      numThumbs: 0,
      errors: {
        name: false,
        description: false,
        dailyPrice: false,
        city: false,
        state: false,
        deposit: false,
        streetAddress: false,
      },
    };
  },
  computed: mapState({
    item: state => state.item.curItem,
  }),
  props: {
    itemName: {
      type: String,
      required: false,
    },
    itemPrice: {
      type: String,
      required: false,
    },
    itemDescription: {
      type: String,
      required: false,
    },
  },
  mixins: [
    formValidation,
  ],
  components: {
    TextInput,
    FileUpload,
    MultiInput,
    MultiFileUpload,
    AlertModal,
  },
  methods: {
    ...mapActions({
      createItem: CREATE_ITEM,
      updateItem: UPDATE_ITEM,
      clearItem: SET_ITEM_DETAILS,
    }),
    async submitForm() {
      const returnVal = await this.validateForm({
        fields: this.item,
        options: {
          matchingPasswords: false,
        },
      });

      // check for error,
      // TODO: Uncomment this when live
      // if (!returnVal) {
      // success, show saved modal
      this.showModal();
      if (this.item.ID) {
        this.updateItem(this.item);
      } else {
        this.createItem(this.item);
      }

      // }
    },
    showModal() {
      this.submitSuccess = true;
      setTimeout(() => {
        this.submitSuccess = false;
      }, 2500);
    },
    mainImageUploaded(file) {
      this.item.mainImage = file;
    },
    otherImagesUploaded(file) {
      // the newly uploaded image is getting added correclty.
      // in actions, will need to loop through each in array
      // to see if any need to be uploaed to storage
      this.item.otherImages.push(file);
    },
    handleImageDelete(image) {
      this.item.otherImages = this.item.otherImages.filter(e => e !== image);
    },
    handleTagChange(tags) {
      this.item.tagsSearchbale = tags;
    },
  },
  created() {
    if (!this.item.tagsSearchbale) {
      this.item.tagsSearchbale = [];
    }

    if (!this.item.otherImages) {
      this.item.otherImages = [];
    }
  },
  destroyed() {
    // clear out curItem details
    this.clearItem({});
  },
};
</script>
