<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})

const seoImage = 'https://images.pexels.com/photos/27050060/pexels-photo-27050060.jpeg'
useLangMeta('about.meta', seoImage)
</script>

<template>
  <UiPulseOverlay />
  <div class="flex flex-col items-center py-10 md:py-20">
    <h1>{{ t('about.title') }}</h1>
    <div class="p8 text-sm prose sm:(p2 text-base)">
      <p>{{ t('about.paragraphs.introduction') }}</p>
      <p>{{ t('about.paragraphs.mission') }}</p>
      <p>{{ t('about.paragraphs.goal') }}</p>
      <p>{{ t('about.paragraphs.importance') }}</p>
      <p>{{ t('about.paragraphs.closing') }}</p>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "ru": {
    "about": {
      "title": "О нас",
      "paragraphs": {
        "introduction": "Мир криптовалют стремительно развивается, полон возможностей и сложностей. С постоянными изменениями в блокчейн-технологиях и цифровых активах важно всегда быть в курсе событий.",
        "mission": "Наша миссия — предоставлять точные, своевременные и доступные новости и аналитику о криптовалютах, инновациях в блокчейне и цифровой экономике.",
        "goal": "Мы стремимся стать надежным источником информации для инвесторов, разработчиков и энтузиастов, которые хотят понимать крипторынки и тренды — от Биткойна и Эфириума до DeFi и Web3.",
        "importance": "В мире, полном шума и дезинформации, особенно важны независимая аналитика и четкая подача. CryptoCenter помогает ориентироваться в рисках и находить ценность в этой динамичной среде.",
        "closing": "Криптомир продолжает развиваться — и мы вместе с ним. Спасибо, что вы с нами. Давайте вместе исследовать будущее финансов."
      },
      "meta": {
        "description": "Актуальные новости криптовалют, аналитика блокчейна и обзоры рынка. CryptoCenter — ваш проводник в мире цифровых финансов.",
        "title": "Крипто-новости, тренды блокчейна и аналитика"
      }
    }
  },
  "en": {
    "about": {
      "title": "About",
      "paragraphs": {
        "introduction": "The world of cryptocurrency is fast-moving, complex, and full of opportunity. With daily developments in blockchain technology and digital assets, staying informed is more important than ever.",
        "mission": "Our mission is to deliver accurate, timely, and accessible news and analysis about cryptocurrencies, blockchain innovations, and the evolving digital economy.",
        "goal": "We aim to be a trusted hub for investors, developers, and enthusiasts looking to make sense of crypto markets and trends, from Bitcoin and Ethereum to DeFi and Web3.",
        "importance": "In a landscape full of hype and misinformation, clear reporting and independent analysis are vital. CryptoCenter helps readers navigate risk and discover value in this rapidly changing space.",
        "closing": "As the crypto world continues to evolve, so will we. Thank you for being part of our journey — let's explore the future of finance together."
      },
      "meta": {
        "description": "Up-to-date cryptocurrency news, blockchain analytics, and market insights. CryptoCenter — your guide to the digital finance frontier.",
        "title": "Crypto News, Blockchain Trends & Market Analysis"
      }
    }
  },
  "it": {
    "about": {
      "title": "Chi siamo",
      "paragraphs": {
        "introduction": "Il mondo delle criptovalute è in continua evoluzione: dinamico, complesso e pieno di opportunità. Con sviluppi quotidiani nella tecnologia blockchain e negli asset digitali, restare informati è più importante che mai.",
        "mission": "La nostra missione è offrire notizie e analisi accurate, tempestive e accessibili su criptovalute, innovazioni blockchain e sull'economia digitale in crescita.",
        "goal": "Vogliamo essere un punto di riferimento affidabile per investitori, sviluppatori ed appassionati che desiderano comprendere i mercati crypto e le tendenze, da Bitcoin ed Ethereum a DeFi e Web3.",
        "importance": "In un panorama pieno di hype e disinformazione, un'informazione chiara e un'analisi indipendente sono essenziali. CryptoCenter aiuta i lettori a navigare i rischi e a scoprire valore in un contesto in costante cambiamento.",
        "closing": "Il mondo cripto continua a evolversi — e noi con lui. Grazie per far parte del nostro viaggio: esploriamo insieme il futuro della finanza."
      },
      "meta": {
        "description": "Notizie aggiornate su criptovalute, analisi blockchain e approfondimenti di mercato. CryptoCenter — la tua guida nel mondo della finanza digitale.",
        "title": "Cripto-notizie, trend blockchain e analisi di mercato"
      }
    }
  }
}
</i18n>
