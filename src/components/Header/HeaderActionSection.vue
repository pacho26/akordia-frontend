<template>
  <div flex="~ gap-3.75 sm:gap-6">
    <div class="p-inputgroup">
      <InputText
        placeholder="Search for songs, artists..."
        class="p-inputtext"
      />
      <Button icon="pi pi-search" class="p-button-success" />
    </div>

    <Link to="/new-chords">
      <HeaderNavItem
        icon="plus"
        label="Add new"
        bg="primary-500 hover:primary-600"
        text="white"
      />
    </Link>
  </div>
</template>
