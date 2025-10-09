// server/api/debug-auth.ts
export default defineEventHandler(() => {
  return useRuntimeConfig().public.auth
})
