<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

// Inject the navigation data
const navigation = inject<Ref<NavItem[]>>('navigation')
const route = useRoute()
const { navPageFromPath } = useContentHelpers()

// Utility function to find the nearest standalone or stripped path
const findValidNavPath = (currentPath: string) => {
  const segments = currentPath.split('/')

  for (let i = segments.length; i > 0; i--) {
    const partialPath = segments.slice(0, i).join('/')

    // Find the corresponding navigation node for this partial path
    const currentNav = navPageFromPath(partialPath, navigation.value)

    // Check if the directory is standalone or stripped
    if (currentNav) {
      if (currentNav.standalone) {
        return { node: currentNav, type: 'standalone', path: partialPath }
      } else if (currentNav.stripped) {
        // Render children of the stripped directory as if they are at the root
        return { node: currentNav, type: 'stripped', path: partialPath }
      }
    }
  }

  return null // Return null if no valid directory found
}

// Computed navigation links
const navigationLinks = computed(() => {
  // Construct the current path based on the route
  const path = route.path

  // Find the nearest standalone or stripped navigation node
  const validNav = findValidNavPath(path)

  if (validNav) {
    if (validNav.type === 'standalone') {
      // Map the standalone directory and its children
      const mappedNav = mapContentNavigation([validNav.node])
      return mappedNav
    } else if (validNav.type === 'stripped') {
      // Strip the parent folder and only render its children
      const strippedChildren = validNav.node.children || []
      const mappedNav = mapContentNavigation(strippedChildren)
      return mappedNav
    }
  }

  return [] // If no valid directory is found, return an empty array
})
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree
            :links="navigationLinks"
            default-open
            :multiple="false"
          />
        </UAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
