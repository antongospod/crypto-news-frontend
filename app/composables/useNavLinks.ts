export interface NavLink {
  name: string
  url: string
}

export function useNavLinks(...pages: NavLink[]): Ref<NavLink[]> {
  return ref<NavLink[]>(pages)
}
