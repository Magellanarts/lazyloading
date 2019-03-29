<template>
  <div>
    <form>
      <div class="inputs-container">
        <input
          v-model="searchText"
          placeholder="What are you looking for?"
        />
        <input
          v-model="location"
          placeholder="Location"
        />
      </div>
      <button
        class="search-button"
        @click.prevent="submitSearch"
      >Submit</button>
    </form>

    <div v-if="results" class="search-results">
      <h2>Results</h2>
      <div class="search-results__list">
        <item-card
          v-for="result in results"
          :key="result.objectID"
          :item="result"
        />
      </div>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import ItemCard from '@/components/Item/Card/ItemCard.vue';
import axios from 'axios';

const algolia = algoliasearch(
  '9AURVLYOP7',
  '94f720be87cbb56ec79609495979cad9',
);

const index = algolia.initIndex('items');

export default {
  data() {
    return {
      searchText: '',
      location: '',
      results: null,
    };
  },
  components: {
    ItemCard,
  },
  methods: {
    submitSearch() {
      const query = this.searchText;
      if (this.location) {
        // Get lat/long of location
        axios.get(`http://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=${this.location}`)
          .then((res) => {
            let aroundLatLng;
            if (this.location === 'My Location' && localStorage.lat && localStorage.lon) {
              aroundLatLng = `${localStorage.lat}, ${localStorage.lon}`;
            } else {
              aroundLatLng = `${res.data[0].lat}, ${res.data[0].lon}`;
            }

            const searchQuery = {
              query,
              aroundLatLng,
              aroundRadius: 3000,
            };

            console.log(searchQuery);

            index
              .search(searchQuery)
              .then((response) => {
                this.results = response.hits;
              });
          });
      }
    },
  },
  mounted() {
    if (localStorage.lat) {
      this.location = 'My Location';
    }
  },
};
</script>

<style lang="scss" scoped>
.inputs-container {

  margin-bottom: 32px;

    @media screen and (min-width: 760px) {
     display: flex;
    }
}

input {
  margin: 0 auto 16px;
  border: none;
  box-shadow: 1px 1px 3px #ccc;
  height: 50px;
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 4px;
  font: 20px/50px 'Merriweather';
  outline: none;
  display: block;
  width: 90%;


   @media screen and (min-width: 760px) {
       flex: 1;
         margin: 0 1%;
   }

}

.search-button {
  min-width: 45%;
  padding: 8px 20px;
  border: none;
  color: #fff;
  background-color: rgb(86, 116, 247);
  border-radius: 5px;
  font: 26px/40px 'Merriweather';
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
}

.search-results {
  padding: 48px 0;
}

.search-results__list {
  @media screen and (min-width: 760px) {
    display: flex;
    justify-content: space-between;

    > a {
      flex: 1;
      max-width: 32%;
    }
  }
}
</style>
