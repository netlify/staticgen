import slug from 'slug'

export function toSlug (str) {
  return slug(str.toLowerCase())
}
