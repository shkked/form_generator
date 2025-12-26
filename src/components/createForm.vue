<template>
  <div>
    <form action="#">
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" />
      <label for="lname">Last name:</label>
      <select name="" id="">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <input type="checkbox" name="checkbox" id="checkbox" value="qwe" />
      <textarea name="textarea" id="textarea" cols="30" rows="10"></textarea>
      <input type="reset" value="Сбросить" />
      <input type="submit" value="Отправить" />
    </form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  label {
    margin-top: 10px;
  }
  input,
  select,
  textarea {
    margin-top: 5px;
    padding: 5px;
    font-size: 16px;
  }
  input[type='submit'],
  input[type='reset'] {
    margin-top: 15px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
