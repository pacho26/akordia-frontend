<script lang="ts" setup>
import { useAuth } from '@/composables/api/auth';
import { useUserStore } from '@/stores/user';
import { useChordsBreakpoints } from '@/composables/useChordsBreakpoints';

const breakpoints = useChordsBreakpoints();
const md = breakpoints.smaller('md');

const { logout } = useAuth();

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
          no-hover
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
          <Button @click="logout" class="p-button-danger">Logout</Button>
        </div>
      </template>
    </VDropdown>
    <Link v-else to="/login">
      <HeaderNavItem icon="user" label="Login" />
    </Link>
    <Link to="/requests">
      <Button h="43px" whitespace="nowrap" class="p-button-secondary">
        {{ md ? 'Rate' : 'Rate requests' }}
      </Button>
    </Link>
  </div>
</template>
