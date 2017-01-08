<template>
  <button @data-block-index="index" @id="command-name">{{label}}</button>
</template>

<script>
export default {
  props: ["index", "command-name", "label"]
}
</script>

<style scoped>
button {
  width: 150px;
  height: 150px;
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 20px;
  margin: 0 0 10px 10px;
  background-position: center 30%;
  background-repeat: no-repeat;
  padding-top: calc(150px - 2em);
}
</style>
