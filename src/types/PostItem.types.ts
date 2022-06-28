export interface PostFrontmatterType {
  title: string
  date: string
  categories: string[]
  summary: string
  thumbnail: {
    publicURL: string
  }
}

export interface PostListItemType {
  node: {
    id: string
    frontmatter: PostFrontmatterType
  }
}
