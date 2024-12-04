<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import router from '@/router';
import { reactive } from 'vue';

const form = reactive({
  field1: 'Option 1',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: ''
});

const handleSubmit = () => {

}

</script>

<template>
  <div class="mb-10">
    <Navbar></Navbar>
  </div>
  <!-- <Hero title="Process Payroll"></Hero> -->
  <!-- class="bg-center bg-no-repeat h-screen " style="background-image: url('src/assets/img/laboserv3.png');"" -->
  <section class="bg-sky-300 w-auto mx-60">
    <div class="container m-auto max-w-2xl py-12">
      <div class="bg-white px-12 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <!-- Form title -->
          <h2 class="text-3l text-center font-semibold mb-6">Payroll Form</h2>

          <!-- Dropdown Field -->
          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Field 1</label>
            <select v-model="form.field1" id="type" name="type" class="border rounded w-full py-2 px-3" required>
              <option value="Option-1">Option 1</option>
              <option value="Option-2">Option 2</option>
              <option value="Option-3">Option 3</option>
              <option value="Option-4">Option 4</option>
              <option value="Option-5">Option 5</option>
            </select>
          </div>

          <!-- Text Field -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Field 2</label>
            <input type="text" v-model="form.field2" id="field2" name="field2"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="This is a text field" required>
          </div>

          <!-- Text area field -->
          <div class="mb-4">
            <label for="field3" class="block text-gray-700 font-bold mb-2">Field 3</label>
            <textarea id="field3" v-model="form.field3" class="border rounded w-full py-2 px-3" rows="4"
              placeholder="This is a text area field"></textarea>
          </div>

          <!-- More text fields -->

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Field 4</label>
            <input type="text" v-model="form.field4" id="field4" name="field4"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="This is also text field" required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Field 5</label>
            <input type="text" v-model="form.field4" id="field5" name="field5"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="This is also text field" required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Field 6</label>
            <input type="text" v-model="form.field6" id="field6" name="field6"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="This is also text field" required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Field 7</label>
            <input type="text" v-model="form.field7" id="field7" name="field7"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="This is also text field" required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Field 8</label>
            <input type="text" v-model="form.field8" id="field8" name="field8"
              class="border rounded w-full py-2 px-3 mb-2" placeholder="This is also text field" required>
          </div>

          <!-- Submit button -->
          <div>
            <button
              class="bg-sky-300 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
