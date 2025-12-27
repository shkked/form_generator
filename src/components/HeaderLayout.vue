<template>
  <div>
    <nav class="nav">
      <ul class="ul">
        <li class="li"><router-link to="/">Главная</router-link></li>
        <li class="li"><router-link to="/order">Оформление заказа</router-link></li>
        <li class="li"><router-link to="/feedback">Обратная связь</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: center;
  padding: 10px;
  .ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    width: 500px;
		.li {
			font-family: 'NeueMontreal', sans-serif;
			font-size: 18px;
			a {
				text-decoration: none;
				color: #333;
				&:hover {
					text-decoration: underline;
					color: #007bff;
				}
			}
		}
  }
}
</style>
