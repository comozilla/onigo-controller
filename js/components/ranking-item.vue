<template>
  <li :value="rank" :data-rank="rank">
    {{ name }}
    <span class="ranking-hp">{{ hp }}</span>
    <span :style="{ backgroundColor: color }">{{ color }}</span>
  </li>
</template>

<script>
export default {
  props: ["name", "hp", "rank", "color"]
};
</script>

<style>
[data-rank="1"] {
  background-color: #f39c12;
}

[data-rank="1"] span {
  background-color: #f1c40f;
}

[data-rank="2"] {
  background-color: #95a5a6;
}

[data-rank="2"] span {
  background-color: #bdc3c7;
}

[data-rank="3"] {
  background-color: #c0392b;
}

[data-rank="3"] span {
  background-color: #e74c3c;
}

.ranking-hp::before {
  content: "HP: ";
}

li {
  width: 100%;
  padding: 5px 0;
}

li span {
  background-color: #c0392b;
  padding: 4px;
  border-radius: 10px;
  color: white;
  margin-left: 10px;
  font-size: 13px;
}
</style>
