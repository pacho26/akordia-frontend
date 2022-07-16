<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
  <div flex="vcenter gap-3 md:gap-5">
    <Link to="/my-songbook">
      <HeaderNavItem icon="music" label="My songbook" />
    </Link>
    <VDropdown
      v-if="userStore.user"
      :triggers="['hover', 'click', 'focus']"
      :popperTriggers="['hover']"
      :distance="8"
      pos="relative"
    >
      <div>
        <HeaderNavItem
          icon="user"
          :label="userStore.user ? userStore.username : 'Login'"
        />
        <i
          display="lg:none"
          bg="primary-400"
          text="7px white"
          p="0.4"
          pos="absolute bottom-1.9 right-2"
          border="rounded-full"
          class="fa-solid fa-check aspect-square"
        />
      </div>
      <template #popper>
        <div flex="~ col gap-4" items="center" p="4">
          <Link to="/profile">
            <Button class="p-button-info">Profile</Button>
          </Link>
          <Button class="p-button-danger">Logout</Button>
        </div>
      </template>
    </VDropdown>
    <Link v-else to="/login">
      <HeaderNavItem icon="user" label="Login" />
    </Link>
    <HeaderNavItem icon="bars" label="Menu" />
  </div>
</template>
