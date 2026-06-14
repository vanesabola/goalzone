import { cookies } from 'next/headers'

export async function isAdminLoggedIn(): Promise<boolean> {
  try {
    const c = await cookies()
    return c.get('gz_admin_token')?.value === process.env.NEXTAUTH_SECRET
  } catch {
    return false
  }
}
