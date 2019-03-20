<template>
  <div>
    <form>
      <input
        v-model="searchText"
        placeholder="What are you looking for?"
      />
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

const algolia = algoliasearch(
  '9AURVLYOP7',
  '94f720be87cbb56ec79609495979cad9',
);

const index = algolia.initIndex('items');

export default {
  data() {
    return {
      searchText: '',
      results: null,
    };
  },
  components: {
    ItemCard,
  },
  methods: {
    submitSearch() {
      const query = this.searchText;
      index
        .search({
          query,
        })
        .then((response) => {
          this.results = response.hits;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 80%;
  margin: 0 auto 32px;
  border: none;
  box-shadow: 1px 1px 3px #ccc;
  height: 50px;
  box-sizing: border-box;
  padding: 0 16px;
  border-radius: 4px;
  font: 20px/50px 'Merriweather';
  outline: none;
  display: block;
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
