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
        name="weeklyPrice"
        label="Weekly Price"
        v-model="item.weeklyPrice"
        :errors="errors"
        labelClass="text-label--two-lines"
      />

      <text-input
        name="monthlyPrice"
        label="Monthly Price"
        v-model="item.monthlyPrice"
        :errors="errors"
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
        <select
          name="address"
          v-model="item.address"
          v-if="userAddresses"
          @change="setLatLng"
        >
          <option>Choose Existing Address</option>
          <option
            v-for="address in userAddresses"
            :key="address.ID" :value="address.ID"
            :selected="{true: item.address == address.ID}"
            :lat="address._geoloc.lat"
            :lng="address._geoloc.lng"
            :city="address.city"
            :state="address.state"
            :zipCode="address.zipCode"
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
  EDIT_ITEM,
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
      diffIndexes: [],
      item: {
        name: '',
        dailyPrice: '',
        weeklyPrice: '',
        monthlyPrice: '',
        deposit: '',
        description: '',
        tagsSearchbale: [],
        otherImages: [],
        otherImagesURLs: [],
        mainImage: '',
        address: '',
        _geoloc: {},
        addressDetails: {},
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
        EDIT_ITEM(this.item);
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
    otherImagesUploaded(upload) {
      // the newly uploaded image is getting added correclty.
      // in actions, will need to loop through each in array
      // to see if any need to be uploaded to storage
      this.item.otherImages.push(upload.file);
      this.item.otherImagesURLs.push(upload.dataURL);
    },
    arrayDiff(a, b) {
      return a.filter((i) => {
        if (b.indexOf(i) < 0) {
          this.diffIndexes.push(a.indexOf(i));
          return true;
        }
        return false;
      });
    },
    handleImageDelete(image) {
      // image contains image and dataURL
      // duplicate our array of image urls
      const otherImagesURLsDUPLICATE = [...this.item.otherImagesURLs];

      // remove the deleted image from array of image urls
      this.item.otherImagesURLs = this.item.otherImagesURLs.filter(e => e !== image);

      // compare the duplicate array with the array we just removed the deleted image from
      // this will set this.diffIndexes to the index of the removed image
      this.arrayDiff(otherImagesURLsDUPLICATE, this.item.otherImagesURLs);

      // remove the item at the index that was set in the arrayDiff function
      this.item.otherImages.splice(this.diffIndexes, 1);

      // set diffIndexes array back to empty
      this.diffIndexes = [];
    },
    handleTagChange(tags) {
      this.item.tagsSearchbale = tags;
    },
    setLatLng(event) {
      const { options } = event.target;
      // eslint-disable-next-line no-underscore-dangle
      this.item._geoloc = {
        lat: parseFloat(options[options.selectedIndex].attributes.lat.nodeValue),
        lng: parseFloat(options[options.selectedIndex].attributes.lng.nodeValue),
      };
      this.item.addressDetails = {
        city: options[options.selectedIndex].attributes.city.nodeValue,
        state: options[options.selectedIndex].attributes.state.nodeValue,
        zipCode: options[options.selectedIndex].attributes.zipcode.nodeValue,
      };
    },
  },
  async created() {
    this.userAddresses = await GET_USER_ADDRESSES();
    if (this.$route.params.id) {
      this.item = await GET_ITEM_DATA_BY_DOC_ID(this.$route.params.id);
      this.item.otherImagesURLs = [...this.item.otherImages];
    }
  },
};
</script>

<style lang="scss" scoped>
  select {
    margin-bottom: 20px;
  }
</style>
