<template>
  <div class="cake-options">
    <p class="">CAKE OPTIONS</p>

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
      <p class="font-bold mb-3">Sizes</p>
      <div class="grid grid-cols-4">
        <label for="6inches" class="text-sm">
          <input id="6inches" type="checkbox" value="6inches" />
          6in
        </label>

        <label for="8inches" class="text-sm">
          <input id="8inches" type="checkbox" value="8inches" />
          8in
        </label>

        <label for="10inches" class="text-sm">
          <input id="10inches" type="checkbox" value="10inches" />
          10in
        </label>

        <label for="12inches" class="text-sm">
          <input id="12inches" type="checkbox" value="12inches" />
          12in
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
      <p class="font-bold mb-3">Toppings</p>
      <div class="grid grid-flow-col-dense">
        <label for="yes" class="text-sm">
          <input id="yes" type="checkbox" value="yes" />
          Yes
        </label>

        <label for="no" class="text-sm">
          <input id="no" type="checkbox" value="no" />
          No
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
