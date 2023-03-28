import {
  fetchPage,
  fetchPages,
  fetchTags,
  ReactBricksContext,
  types,
  cleanPage,
  PageViewer,
} from "react-bricks/frontend"
import { useLoaderData, Link } from "@remix-run/react"

import BlogListItem from "~/components/PostListItem"
import { useContext } from "react"

export const loader = async () => {
  const posts = await fetchPages(process.env.API_KEY as string, {
    type: "blog",
    pageSize: 1000,
    sort: "-publishedAt",
  })

  const { items: tags } = await fetchTags(process.env.API_KEY as string)
  tags.sort()

  const header = await fetchPage("header", process.env.API_KEY as string).catch(
    () => {
      throw new Error(
        `Cannot find header. Create a new 'header' entity under 'Layout'`
      )
    }
  )
  const footer = await fetchPage("footer", process.env.API_KEY as string).catch(
    () => {
      throw new Error(
        `Cannot find footer. Create a new 'footer' entity under 'Layout'`
      )
    }
  )

  return { posts, tags, header, footer }
}

export default function List() {
  const { posts, tags, header, footer } = useLoaderData<{
    posts: types.PageFromList[]
    tags: string[]
    header: types.Page
    footer: types.Page
  }>()

  const { pageTypes, bricks } = useContext(ReactBricksContext)
  const headerOk = header ? cleanPage(header, pageTypes, bricks) : null
  const footerOk = header ? cleanPage(footer, pageTypes, bricks) : null

  return (
    <>
      <PageViewer page={headerOk} />
      <div className='container mx-auto'>
        <h1 className='text-center text-4xl sm:text-6xl lg:text-7xl leading-none font-black tracking-tight text-gray-900 pb-4 mt-10 sm:mt-12 mb-4'>
          Blog
        </h1>
        <div className='max-w-6xl mx-auto px-8 py-16 flex space-x-24'>
          <section style={{ flex: "2 2 0" }} className='flex-2 space-y-8'>
            <h2 className='text-pink-500 uppercase mb-8 tracking-widest font-bold'>
              Recently published
            </h2>
            {posts?.map((post) => (
              <BlogListItem
                key={post.id}
                title={post.name}
                href={`/blog/${post.slug}`}
                content={post.meta.description || ""}
              />
            ))}
          </section>
          <section className='flex-1 space-y-16'>
            <div>
              <h2 className='text-pink-500 uppercase mb-8 tracking-widest font-bold'>
                Tags
              </h2>
              <div className='flex flex-wrap items-center'>
                {tags
                  ?.filter((tag) => tag !== "popular")
                  .map((tag) => (
                    <Link
                      to={`tag/${tag}`}
                      key={tag}
                      className='inline-block text-sm font-bold mr-2 mb-2 transform duration-200 text-cyan-800 bg-cyan-100 hover:bg-cyan-200 hover:text-cyan-900 rounded-md px-2 py-1'
                    >
                      <div className='' style={{ zIndex: -1 }} />
                      {tag}
                    </Link>
                  ))}
              </div>
            </div>
            <div>
              <h2 className='text-pink-500 uppercase mb-8 tracking-widest font-bold'>
                Most Popular
              </h2>
              <ul>
                {posts
                  ?.filter((post) => post.tags.find((tag) => tag === "popular"))
                  .map((post) => (
                    <li key={post.id}>
                      <a
                        href={`/blog/${post.slug}`}
                        className='text-gray-900 hover:text-cyan-600 font-bold text-lg leading-10 transition-colors'
                      >
                        {post.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
      <PageViewer page={footerOk} />
    </>
  )
}
