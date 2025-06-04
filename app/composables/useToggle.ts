interface ToggleComposable {
  toggle: (componentName: string) => void
  isActive: (componentName: string) => boolean
}

export function useToggle(initialComponent: string | null = null): ToggleComposable {
  const activeComponent = ref<string | null>(initialComponent)

  function toggle(componentName: string) {
    if (activeComponent.value === componentName) {
      activeComponent.value = null
    }
    else {
      activeComponent.value = componentName
    }
  }

  function isActive(componentName: string) {
    return activeComponent.value === componentName
  }

  return { toggle, isActive }
}
