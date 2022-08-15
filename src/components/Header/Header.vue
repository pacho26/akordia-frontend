<script lang="ts" setup>
import { useChordsBreakpoints } from '@/composables/useChordsBreakpoints';

const breakpoints = useChordsBreakpoints();
const sm = breakpoints.smaller('sm');
const xl = breakpoints.smaller('xl');
</script>

<template>
  <div p="t-4 b-4 sm:t-4 xl:b-0" bg="white" shadow="sm">
    <Container flex="~ col gap-3">
      <div flex="vcenter" justify="between">
        <div flex="vcenter gap-8 md:gap-10">
          <Link to="/">
            <img
              src="@/assets/img/logos/logo-placeholder.png"
              alt="Placeholder logo"
              h="43px"
            />
          </Link>

          <HeaderActionSection v-if="!sm" />
        </div>
        <HeaderNav />
      </div>

      <HeaderActionSection v-if="sm" />
    </Container>

    <div v-if="!xl" m="t-4" bg="gray-100" border="y-1 gray-300">
      <Container flex="vcenter" justify="between" p="y-1 x-8" min-h="48px">
        <AlphabetList />
      </Container>
    </div>
  </div>
</template>
