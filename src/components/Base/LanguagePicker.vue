<script lang="ts" setup>
import CroatiaFlag from '@/assets/img/flags/croatia.png';
import UnitedKingdomFlag from '@/assets/img/flags/united-kingdom.png';
import { getLanguages, setLocale } from '@/i18n/i18n';

type Language = 'hr' | 'en';

const availableLanguages = getLanguages();

const currentLang = ref<Language>('hr');

onBeforeMount(() => {
  const lang = localStorage.getItem('lang') as Language;
  if (lang) {
    currentLang.value = lang;
    changeLanguage(lang);
  }
});

const getLanguageName = (language: string) => {
  switch (language) {
    case 'en':
      return 'English';
    case 'hr':
      return 'Hrvatski';
    default:
      return '';
  }
};

const getLanguageFlag = (language: string) => {
  switch (language) {
    case 'en':
      return UnitedKingdomFlag;
    case 'hr':
      return CroatiaFlag;
    default:
      return '';
  }
};

const changeLanguage = (language: Language) => {
  setLocale(language);
  currentLang.value = language;
};
</script>

<template>
  <VDropdown
    :triggers="['hover', 'click', 'focus']"
    :popperTriggers="['hover']"
    :distance="10"
    placement="bottom-end"
  >
    <div h="38.5px" p="2 md:(y-2 x-3)" cursor="pointer">
      <img :src="getLanguageFlag(currentLang)" alt="Croatia flag" />
    </div>
    <template #popper>
      <div
        w="fit"
        flex="col center"
        p="4"
        border="rounded"
        class="country-container"
      >
        <div
          v-for="lang in availableLanguages"
          :key="lang"
          @click="changeLanguage(lang as Language)"
          flex="vcenter gap-3"
          min-w="138px"
          p="y-2 x-4"
          transition="default"
          select="none"
          class="country-container"
          :class="
            lang === currentLang
              ? 'bg-primary-100'
              : 'opacity-65 cursor-pointer hover:bg-primary-50'
          "
        >
          <img
            :src="getLanguageFlag(lang)"
            :alt="`${getLanguageName(lang)} flag`"
          />
          <p text="gray-800">{{ getLanguageName(lang) }}</p>
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<style lang="scss" scoped>
img {
  width: 30px;
}

.country-container {
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
