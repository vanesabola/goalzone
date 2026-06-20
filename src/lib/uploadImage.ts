import { supabase } from './supabase'

export async function uploadImageToStorage(file: File): Promise<string | null> {
  try {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const filePath = `articles/${fileName}`

    const { error } = await supabase.storage
      .from('article-images')
      .upload(filePath, file, { cacheControl: '31536000', upsert: false })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data } = supabase.storage.from('article-images').getPublicUrl(filePath)
    return data.publicUrl
  } catch (err) {
    console.error('Upload exception:', err)
    return null
  }
}