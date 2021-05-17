<template>
  <div class="cake-options">
    <p class="">✔ the options you want for your parfait</p>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Flavor</p>
      <div class="grid grid-cols-3">
        <label for="vanilla" class="text-sm">
          <input id="vanilla" type="checkbox" value="vanilla" />
          Vanilla
        </label>

        <label for="chocolate" class="text-sm">
          <input id="chocolate" type="checkbox" value="chocolate" />
          Chocolate
        </label>

        <label for="red-velvet" class="text-sm">
          <input id="red-velvet" type="checkbox" value="red-velvet" />
          Red velvet
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Size</p>
      <div class="grid grid-cols-4">
        <label for="small" class="text-sm">
          <input id="small" type="checkbox" value="small" />
          Small
        </label>

        <label for="medium" class="text-sm">
          <input id="medium" type="checkbox" value="medium" />
          Medium
        </label>

        <label for="big" class="text-sm">
          <input id="big" type="checkbox" value="big" />
          Big
        </label>
      </div>
    </div>
  </div>
</template>
