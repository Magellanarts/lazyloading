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
      />
      <!-- file-upload
        v-for="(file, index) in item.otherImages"
        :key="`value-${index}`"
        name="otherImages"
        @uploadComplete="otherImagesUploaded"
        multiple
      / -->

      <div class="form-field">
        <button class="button" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
// TODO: Choose from popular tags?
// TODO: Automatically show potential tags based on other fields (name, description, etc.)?
// TODO: clear curItem after leave

// Get lat/lon http://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=QUERYGOESHERE


import TextInput from '@/components/common/forms/TextInput.vue';
import MultiFileUpload from '@/components/common/forms/MultiFileUpload.vue';
import FileUpload from '@/components/common/forms/FileUpload.vue';
import MultiInput from '@/components/common/forms/MultiInput.vue';

import { mapActions, mapState } from 'vuex';
import { CREATE_ITEM, UPDATE_ITEM } from '@/store/types';
import { formValidation } from '@/mixins';

export default {
  data() {
    return {
      numThumbs: 0,
      errors: {
        name: false,
        description: false,
        dailyPrice: false,
        city: false,
        state: false,
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
  },
  methods: {
    ...mapActions({
      createItem: CREATE_ITEM,
      updateItem: UPDATE_ITEM,
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
      if (this.item.ID) {
        this.updateItem(this.item);
      } else {
        this.createItem(this.item);
      }

      // }
    },
    mainImageUploaded(file) {
      this.item.mainImage = file;
    },
    otherImagesUploaded(file) {
      // this.item.otherImages = file;
      this.item.otherImages.push(file);
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
};
</script>
