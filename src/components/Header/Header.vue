<script lang="ts" setup>
import { useChordsBreakpoints } from '@/composables/useChordsBreakpoints';

const breakpoints = useChordsBreakpoints();
const sm = breakpoints.smaller('sm');
</script>

<template>
  <div p="t-2 b-4 sm:y-4" bg="white" shadow="sm">
    <Container flex="~ col gap-3">
      <div flex="vcenter" justify="between">
        <div flex="vcenter gap-8 md:gap-12">
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
  </div>
</template>
