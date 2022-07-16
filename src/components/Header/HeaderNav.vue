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
    >
      <HeaderNavItem
        icon="user"
        :label="userStore.user ? userStore.username : 'Login'"
      />
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
