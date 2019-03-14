<template>
  <form>
    <input
      placeholder="What are you looking for?"
    />
    <button
      @click.prevent=""
    >Submit</button>
  </form>
</template>

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

button {
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
</style>
