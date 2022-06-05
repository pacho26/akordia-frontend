<script lang="ts" setup>
import { useChordsBreakpoints } from '@/composables/use-chords-breakpoints';

const breakpoints = useChordsBreakpoints();
const sm = breakpoints.smaller('sm');
</script>

<template>
  <div p="t-2 b-4 sm:y-4" bg="white" shadow="sm">
    <Container flex="~ col gap-3">
      <div flex="vcenter" justify="between">
        <div flex="vcenter gap-12">
          <Link to="/">
            <img
              src="@/assets/img/logos/logo-placeholder.png"
              alt="Placeholder logo"
              h="36px"
            />
          </Link>

          <div v-if="!sm" class="p-inputgroup">
            <InputText
              placeholder="Search for songs, artists..."
              class="p-inputtext"
            />
            <Button icon="pi pi-search" class="p-button-success" />
          </div>
        </div>

        <HeaderNav />
      </div>

      <div v-if="sm" class="p-inputgroup">
        <InputText
          placeholder="Search for songs, artists..."
          class="p-inputtext"
        />
        <Button icon="pi pi-search" class="p-button-success" />
      </div>
    </Container>
  </div>
</template>
