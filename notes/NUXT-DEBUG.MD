window.__findTabsNavNode = (currentPath, navItems) => {
  function findNavItemByPath(path, items) {
    for (const item of items) {
      if (item.path === path)
        return item

      if (item.children?.length) {
        const found = findNavItemByPath(path, item.children)
        if (found) return found
      }
    }
    return null
  }

  let searchPath = currentPath
  let currentNav = findNavItemByPath(searchPath, navItems || [])

  while (currentNav) {
    if (currentNav.tabs)
      return currentNav

    const parentPath = searchPath.split('/').slice(0, -1).join('/')
    if (!parentPath) break

    searchPath = parentPath
    currentNav = findNavItemByPath(searchPath, navItems || [])
  }

  return null
}

DAARNA:

__findTabsNavNode(window.location.pathname, window.__NUXT__?.payload?.navigation)
