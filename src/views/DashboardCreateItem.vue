<template>
  <div>
    <form
      @submit.prevent="submitForm"
      novalidate
      v-if="$route.params.id && item.name || !$route.params.id"
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

      <div class="form-field">
        <select name="address" v-model="item.address" v-if="userAddresses">
          <option>Choose Existing Address</option>
          <option
            v-for="address in userAddresses"
            :key="address.ID" :value="address.ID"
            :selected="{true: item.address == address.ID}"

          >
            {{ address.label }}
          </option>
        </select>

        <br>

        <router-link class="button" to="/dashboard/edit-address">Add New Address</router-link>
      </div>

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

import {
  GET_ITEM_DATA_BY_DOC_ID,
  UPDATE_ITEM,
  CREATE_ITEM,
} from '@/actions/item';

import {
  GET_USER_ADDRESSES,
} from '@/actions/user';

import { formValidation } from '@/mixins';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      submitSuccess: false,
      numThumbs: 0,
      userAddresses: [],
      item: {
        name: '',
        dailyPrice: '',
        deposit: '',
        description: '',
        tagsSearchbale: [],
        otherImages: [],
        mainImage: '',
        address: '',
      },
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
    async submitForm() {
      const returnVal = await this.validateForm({
        fields: this.item,
        options: {
          matchingPasswords: false,
        },
      });

      // check for error,
      if (!returnVal) {
      // success, show saved modal
        this.showModal();
        if (this.item.ID) {
          UPDATE_ITEM(this.item);
        } else {
          CREATE_ITEM(this.item, this.$store.getters.userId);
        }
      }
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
      // to see if any need to be uploaded to storage
      this.item.otherImages.push(file);
    },
    handleImageDelete(image) {
      this.item.otherImages = this.item.otherImages.filter(e => e !== image);
    },
    handleTagChange(tags) {
      this.item.tagsSearchbale = tags;
    },
  },
  async created() {
    this.userAddresses = await GET_USER_ADDRESSES();
    if (this.$route.params.id) {
      this.item = await GET_ITEM_DATA_BY_DOC_ID(this.$route.params.id);
    }
  },
};
</script>

<style lang="scss" scoped>
  select {
    margin-bottom: 20px;
  }
</style>
