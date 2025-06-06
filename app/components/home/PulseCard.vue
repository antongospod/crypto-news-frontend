<script setup lang="ts">
const { t } = useI18n()

interface Trend {
  id: number
  name: string
}

interface Highlight {
  id: number
  title: string
  subtext: string
  month: string
  reference: string
}

const trends: Trend[] = [
  { id: 1, name: t('home.pulseCard.trend1') },
  { id: 2, name: t('home.pulseCard.trend2') },
  { id: 3, name: t('home.pulseCard.trend3') },
  { id: 4, name: t('home.pulseCard.trend4') },
  { id: 5, name: t('home.pulseCard.trend5') },
]

const highlights: Highlight[] = [
  {
    id: 1,
    title: t('home.pulseCard.highlight1.title'),
    subtext: t('home.pulseCard.highlight1.subtext'),
    month: t('home.pulseCard.highlight1.month'),
    reference: 'https://www.investors.com/news/bitcoin-circle-ipo-crcl-stock-stablecoin-usdc-trump-media-bitcoin-etf/',
  },
  {
    id: 2,
    title: t('home.pulseCard.highlight2.title'),
    subtext: t('home.pulseCard.highlight2.subtext'),
    month: t('home.pulseCard.highlight2.month'),
    reference: 'https://news.bitcoin.com/bitcoin-goes-mainstream-highlights-from-the-bitcoin-2025-conference/',
  },
  {
    id: 3,
    title: t('home.pulseCard.highlight3.title'),
    subtext: t('home.pulseCard.highlight3.subtext'),
    month: t('home.pulseCard.highlight3.month'),
    reference: 'https://cointelegraph.com/news/trump-truth-social-files-spot-bitcoin-etf',
  },
];

</script>

<template>
  <div class="mx-auto mb4 border rounded-md px4 pt4 lg:w-4xl sm:core-border sm:core-theme md:(px8 pt8)">
    <div class="mb-4 flex flex-col items-center justify-between rounded-lg bg-yellow-4 p-3 sm:mb-6 sm:flex-row sm:p-4">
      <UiScrollAnimation
          class="mb-2 text-center text-xl text-black font-bold sm:mb-0 sm:text-left md:text-4xl sm:text-2xl"
          element="h2"
          animation="zoom-in"
          :duration="800"
      >
        {{ t('home.pulseCard.title') }}
      </UiScrollAnimation>
      <Icon name="lucide:heart-pulse" class="h-8 w-8 text-black sm:h-12 sm:w-12 animate-heart-beat" aria-hidden="true" />
    </div>
    <div class="grid gap-3 md:grid-cols-2 sm:gap-4">
      <section aria-labelledby="trend-title" class="rounded-lg bg-zinc-900 p-3 sm:p-4">
        <div class="mb-3 flex items-center sm:mb-4">
          <Icon name="lucide:trending-up" class="mr-2 h-5 w-5 flex-shrink-0 text-4 text-yellow-4" />
          <h3 id="trend-title" class="text-lg text-yellow-4 font-semibold sm:text-xl">
            {{ t('home.pulseCard.trendTitle') }}
          </h3>
        </div>
        <ul role="list" class="p0 space-y-3">
          <UiScrollAnimation
              v-for="(trend, key) in trends"
              :key="trend.id"
              class="flex cursor-pointer items-center border-l-4 rounded bg-zinc-800 p-3 transition-all hover:bg-zinc-700"
              element="li"
              animation="fade-down"
              :delay="key * 250"
              :duration="1200"
          >
            <span class="px4 text-3xl text-white font-bold op70">{{ trend.id }}.</span>
            <p class="text-sm text-white font-medium sm:text-base">
              {{ trend.name }}
            </p>
          </UiScrollAnimation>
        </ul>
      </section>
      <section aria-labelledby="recent-breaches-title" class="rounded-lg bg-zinc-900 p-3 sm:p-4">
        <div class="mb-3 flex items-center sm:mb-4">
          <Icon name="lucide:sun" class="mr-2 h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
          <h3 id="recent-breaches-title" class="text-lg text-white font-semibold sm:text-xl">
            {{ t('home.pulseCard.highlightsTitle') }}
          </h3>
        </div>
        <ul role="list" class="list-none p0 space-y-3">
          <UiScrollAnimation
              v-for="(highlight, key) in highlights"
              :key="highlight.id"
              class="cursor-pointer border-l-4 rounded bg-yellow-4 p-3 transition-all hover:bg-yellow-5"
              element="li"
              animation="fade-down"
              :delay="key * 250"
              :duration="1200"
          >
            <NuxtLink
                :to="highlight.reference"
                class="relative grid grid-cols-[1fr,auto] items-start gap-2 decoration-none" target="_blank"
                :aria-label="`${highlight.title} - ${highlight.subtext} ${t('home.pulseCard.ariaLabel')}`"
            >
              <div class="min-w-0">
                <p class="truncate text-sm text-black font-semibold sm:text-base">
                  {{ highlight.title }}
                </p>
                <p class="mt-0.5 truncate text-xs text-black/80 sm:text-sm">
                  {{ highlight.subtext }}
                </p>
              </div>
              <span class="mr-auto whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-yellow-4 font-bold">
                {{ highlight.month }}
              </span>
              <Icon name="lucide:external-link" class="absolute right-0 h5 w5 text-black" aria-hidden="true" />
            </NuxtLink>
          </UiScrollAnimation>
        </ul>
      </section>
    </div>
    <p class="mt-4 px-1 text-xs text-inherit op70 sm:text-sm">
      {{ t('home.pulseCard.source') }}
    </p>
  </div>
</template>
