<template>
  <div class="cake-options">
    <p class="">✔ the options you want for your chinchin</p>

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
        <label for="6inches" class="text-sm">
          <input id="6inches" type="checkbox" value="6inches" />
          Small
        </label>

        <label for="8inches" class="text-sm">
          <input id="8inches" type="checkbox" value="8inches" />
          Medium
        </label>

        <label for="10inches" class="text-sm">
          <input id="10inches" type="checkbox" value="10inches" />
          Big
        </label>

        <label for="12inches" class="text-sm">
          <input id="12inches" type="checkbox" value="12inches" />
          Large
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Frosting</p>
      <div class="grid">
        <label for="buttercream" class="text-sm">
          <input id="buttercream" type="checkbox" value="buttercream" />
          Buttercream
        </label>
      </div>
    </div>

    <div class="p-4 border rounded-md mb-6">
      <p class="font-bold mb-3">Occasion</p>
      <div class="grid grid-cols-3">
        <label for="birthday" class="text-sm">
          <input id="birthday" type="checkbox" value="birthday" />
          Birthday
        </label>

        <label for="wedding" class="text-sm">
          <input id="wedding" type="checkbox" value="wedding" />
          Wedding
        </label>

        <label for="naming-ceremony" class="text-sm">
          <input id="naming-ceremony" type="checkbox" value="naming-ceremony" />
          Naming ceremony
        </label>

        <label for="personal" class="text-sm">
          <input id="personal" type="checkbox" value="personal" />
          Personal
        </label>
      </div>
    </div>
  </div>
</template>
