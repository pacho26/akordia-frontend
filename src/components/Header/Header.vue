<script lang="ts" setup>
import { useChordsBreakpoints } from '@/composables/useChordsBreakpoints';
import Container from '../Base/Container.vue';
import AlphabetList from './AlphabetList.vue';

const breakpoints = useChordsBreakpoints();
const sm = breakpoints.smaller('sm');
const lg = breakpoints.smaller('lg');
</script>

<template>
  <div p="t-4 b-4 sm:t-4 lg:b-0" bg="white" shadow="sm">
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

    <div v-if="!lg" m="t-4" bg="gray-100" border="y-1 gray-300">
      <Container flex="~" justify="between" p="y-1 x-8">
        <AlphabetList />
      </Container>
    </div>
  </div>
</template>
