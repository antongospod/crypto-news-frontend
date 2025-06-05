<script setup>
const urls = [
  {
    url: 'https://defibank.online/',
    name: 'DefiBank',
    delay: 100,
  },
  {
    url: 'https://www.synergyslab.com/',
    name: 'SynergysLab',
    delay: 200,
  },
]

function getSvgIconUrl(name) {
  return `/images/home/${name.toLowerCase()}.svg`
}
</script>

<template>
  <div class="relative flex items-center justify-center">
    <ul
      class="m-0 w-full flex flex-col list-none items-center justify-center p-0 sm:flex-row lg:gap-20 md:gap-10 sm:gap-6"
      role="list"
    >
      <UiScrollAnimation
        v-for="link in urls"
        :key="link.name"
        role="listitem"
        element="li"
        animation="fade-up"
        :delay="link.delay"
        :duration="1000"
      >
        <NuxtLink :href="link.url" target="_blank" class="group inline-block">
          <div
            class="h-32 flex items-center justify-center grayscale filter transition-all duration-300 ease-in-out lg:h-64 dark:grayscale group-hover:filter-none dark:group-hover:filter-none"
          >
            <NuxtImg
              :src="getSvgIconUrl(link.name)"
              class="h-auto max-h-24 max-w-[120px] min-h-24 transition-all duration-300 ease-in-out lg:max-h-52 lg:max-w-[300px] sm:max-h-32 sm:max-w-[150px] sm:min-h-32"
              :alt="`${link.name} logo`"
              loading="lazy"
            />
          </div>
        </NuxtLink>
      </UiScrollAnimation>
    </ul>
  </div>
</template>
