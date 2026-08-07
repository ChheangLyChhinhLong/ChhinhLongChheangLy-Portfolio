import { groq } from "next-sanity";

// Reusable post fields
const postField = groq`
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  description,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  featured,
  isPublished
`;

export const profileQuery = groq`*[_type == "profile"][0]{
  _id,
  fullName,
  headline,
  profileImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  shortBio,
  location,
  fullBio,
  email,
  "resumeURL": resumeURL.asset->url,
  socialLinks,
  usage
}`;

export const jobQuery = groq`*[_type == "job"] | order(_createdAt desc){
  _id,
  name,
  jobTitle,
  "logo": logo.asset->url,
  url,
  description,
  startDate,
  endDate,
}`;

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc){
  _id, 
  name,
  "slug": slug.current,
  tagline,
  "logo": logo.asset->url,
}`;

export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  name,
  projectUrl,
  repository,
  coverImage {
    "image": asset->url,
    "lqip": asset->metadata.lqip,
    alt,
  },
  tagline,
  description
}`;

export const postsQuery = groq`*[_type == "Post"] | order(_createdAt desc){
  ${postField},
  date,
  "author": author-> {
    name, 
    photo, 
    twitterUrl
  },
  body,
}`;

const blogPostPreviewFields = groq`
  _id,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(date, _createdAt),
  description,
  "mainImage": {
    "image": coverImage.asset->url,
    "lqip": coverImage.asset->metadata.lqip,
    "alt": coverImage.alt,
  },
  tags,
  featured,
  "authorName": coalesce(author->name, "ChhinhLong ChheangLy"),
  body
`;

export const initialBlogPostsQuery = groq`
  *[_type == "Post" && isPublished == true && defined(slug.current)]
    | order(coalesce(date, _createdAt) desc)[0...3] {
      ${blogPostPreviewFields}
    }
`;

export const paginatedBlogPostsQuery = groq`
  *[_type == "Post" && isPublished == true && defined(slug.current)]
    | order(coalesce(date, _createdAt) desc)[$start...$end] {
      ${blogPostPreviewFields}
    }
`;

export const publishedBlogPostsCountQuery = groq`
  count(*[_type == "Post" && isPublished == true && defined(slug.current)])
`;

export const featuredPostsQuery = groq`
  *[_type == "Post" && isPublished == true && defined(slug.current)]
    | order(featured desc, coalesce(date, _createdAt) desc)[0...3] {
      ${blogPostPreviewFields}
    }
`;

export const singlePostQuery = groq`*[_type == "Post" && slug.current == $slug][0]{
  ${postField},
  _updatedAt,
  canonicalLink,
  date,
  tags,
  "author": author-> {
    name, 
    photo {
      "image": asset->url,
      alt
    }, 
    twitterUrl
  },
  body,
}`;

export const heroesQuery = groq`*[_type == "heroe"] | order(_createdAt asc) { _id, _createdAt, name, url, met }`;

export const photosQuery = groq`
  *[_type == "photo" && defined(image.asset)] | order(takenAt desc) {
    _id,
    title,
    location,
    takenAt,
    featured,
    "imageUrl": image.asset->url,
    "blurDataURL": image.asset->metadata.lqip,
    "dimensions": image.asset->metadata.dimensions
  }
`;
