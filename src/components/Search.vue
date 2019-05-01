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

    <div v-show="results" class="search-results">
      <h2>Results</h2>

      <div class="ui-tabs">
        <div class="ui-tab"
          :class="listView? 'active': ''"
          @click="mapView = false;
      listView = true;"
        >
        List
        </div>
        <div class="ui-tab"
          :class="mapView? 'active': ''"
          @click="mapView = true;
      listView = false;"
        >
          Map
        </div>
      </div>

      <div>
        <div
          v-show="listView"
          class="ui-tab-view"
        >
          <div class="search-results__list">
            <item-card
              v-for="result in results"
              :key="result.objectID"
              :item="result"
            />
          </div>
        </div>

        <div
        class="ui-tab-view"
        v-show="mapView">
          <GmapMap
            v-if="results"
            :center="{lat:results[0]._geoloc.lat, lng:results[0]._geoloc.lng}"
            :zoom="13"
            style="width: 100%; height: 400px"
          >
            <GmapCircle
              :key="result.ID"
              v-for="result in results"
              :center="{lat:result._geoloc.lat, lng:result._geoloc.lng}"
              :radius="600"
              :options="{strokeColor: 'rgb(86, 116, 247)',fillColor:'rgb(86, 116, 247)',fillOpacity:.4
                }"
            />
          </GmapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';
import ItemCard from '@/components/Item/Card/ItemCard.vue';
import axios from 'axios';
// import gmapsInit from '@/gmaps';
// https://markus.oberlehner.net/blog/using-the-google-maps-api-with-vue/
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
      mapView: false,
      listView: true,
    };
  },
  components: {
    ItemCard,
  },
  methods: {
    submitSearch() {
      const query = this.searchText;
      if (this.location) {
        let aroundLatLng;
        if (this.location === 'My Location' && localStorage.lat && localStorage.lon) {
          aroundLatLng = `${localStorage.lat}, ${localStorage.lon}`;

          const searchQuery = {
            query,
            aroundLatLng,
            aroundRadius: 3000,
          };

          index
            .search(searchQuery)
            .then((response) => {
              this.results = response.hits;
            });
        } else {
          // Get lat/long of location
          axios.get(`https://open.mapquestapi.com/nominatim/v1/search.php?key=WWoKqSLir2hzGkpTBhbJbFXeyC8Gz96S&format=json&q=${this.location}`)
            .then((res) => {
              aroundLatLng = `${res.data[0].lat}, ${res.data[0].lon}`;

              const searchQuery = {
                query,
                aroundLatLng,
                aroundRadius: 3000,
              };

              index
                .search(searchQuery)
                .then((response) => {
                  this.results = response.hits;
                });
            });
        }
      }
    },
  },
  async mounted() {
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

.gmap {
  height: 500px;
}

.ui-tabs {
  border-bottom: 1px solid #ccc;
  display: flex;
  margin-bottom: 8px;
}

.ui-tab {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-bottom: none;
  margin-left: 6px;
  cursor: pointer;

  &.active {
    background: #ccc;
    color: #fff;
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
