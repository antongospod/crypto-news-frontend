<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import type { NuxtLinkLocale } from '#components'

type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'

interface ScrollAnimationProps {
  animation?: AnimationType
  duration?: number
  delay?: number
  threshold?: number
  once?: boolean
  element?: keyof HTMLElementTagNameMap | typeof NuxtLinkLocale
  root?: HTMLElement | null
  rootMargin?: string
}

const props = withDefaults(defineProps<ScrollAnimationProps>(), {
  animation: 'fade-up',
  duration: 800,
  delay: 0,
  threshold: 0.1,
  once: true,
  element: 'div',
  root: null,
  rootMargin: '0px',
})

const rootElement = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isReducedMotion = ref(false)
let observer: IntersectionObserver | null = null

function createObserver() {
  if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver is not supported in this browser')
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        if (props.once && observer) {
          observer.disconnect()
        }
      }
      else if (!props.once) {
        isVisible.value = false
      }
    },
    {
      root: props.root,
      rootMargin: props.rootMargin,
      threshold: props.threshold,
    },
  )
}

function startObserving() {
  if (rootElement.value && observer) {
    observer.observe(rootElement.value)
  }
}

function stopObserving() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

onMounted(() => {
  isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isReducedMotion.value) {
    createObserver()
    startObserving()
  }
  else {
    isVisible.value = true
  }
})

onUnmounted(() => {
  stopObserving()
})
</script>

<template>
  <component
    :is="element"
    ref="rootElement"
    class="scroll-animation"
    :class="[`animation-${animation}`, isVisible ? 'is-visible' : '', isReducedMotion ? 'reduce-motion' : '']"
    :style="{
      '--animation-duration': `${duration}ms`,
      '--animation-delay': `${delay}ms`,
    }"
    role="presentation"
  >
    <slot />
  </component>
</template>

<style scoped>
.scroll-animation {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.reduce-motion {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
}

.scroll-animation.is-visible {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .scroll-animation.is-visible {
    animation-duration: var(--animation-duration);
    animation-delay: var(--animation-delay);
    animation-fill-mode: both;
    animation-timing-function: ease-out;
  }

  .animation-fade-up.is-visible {
    animation-name: fadeUp;
  }

  .animation-fade-down.is-visible {
    animation-name: fadeDown;
  }

  .animation-fade-left.is-visible {
    animation-name: fadeLeft;
  }

  .animation-fade-right.is-visible {
    animation-name: fadeRight;
  }

  .animation-zoom-in.is-visible {
    animation-name: zoomIn;
  }

  .animation-zoom-out.is-visible {
    animation-name: zoomOut;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeRight {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoomOut {
  from {
    opacity: 0;
    transform: scale(1.05);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
