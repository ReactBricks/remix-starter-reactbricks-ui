import classNames from "classnames"
import {
  fetchPage,
  fetchPages,
  fetchTags,
  types,
  cleanPage,
  PageViewer,
} from "react-bricks/frontend"
import { useReactBricksContext } from "react-bricks"
import { useLoaderData, Link } from "@remix-run/react"
import PostListItem from "~/components/PostListItem"

export const loader = async ({ params }: { params: any }) => {
  const { tag } = params

  const pagesByTag = await fetchPages(process.env.API_KEY as string, {
    tag: tag.toString(),
    type: "blog",
    pageSize: 1000,
    sort: "-publishedAt",
  })
  const popularPosts = await fetchPages(process.env.API_KEY as string, {
    type: "blog",
    tag: "popular",
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

  return {
    pagesByTag,
    filterTag: tag,
    popularPosts,
    allTags: tags,
    header,
    footer,
  }
}

interface LoaderProps {
  pagesByTag: types.Page[]
  popularPosts: types.Page[]
  error: string
  filterTag: string
  allTags: string[]
  header: types.Page
  footer: types.Page
}

export default function List() {
  const { filterTag, pagesByTag, popularPosts, allTags, header, footer } =
    useLoaderData<LoaderProps>()

  const { pageTypes, bricks } = useReactBricksContext()
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
          <section className='flex-[2] space-y-8'>
            <h2 className='text-pink-500 uppercase mb-8 tracking-widest font-bold'>
              {filterTag}
            </h2>
            {pagesByTag?.map((post) => (
              <PostListItem
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
                {/* T A G  */}
                {allTags
                  ?.filter((tag) => tag !== "popular")
                  .map((tag) => (
                    <Link
                      to={tag === filterTag ? "/blog" : `/blog/tag/${tag}`}
                      key={tag}
                    >
                      <a
                        className={classNames(
                          "inline-block text-sm font-bold mr-2 mb-2 transform duration-200  rounded-md px-2 py-1",
                          tag === filterTag
                            ? "text-blue-800 bg-blue-100 hover:bg-blue-200 hover:text-blue-900"
                            : "text-cyan-800 bg-cyan-100 hover:bg-cyan-200 hover:text-cyan-900"
                        )}
                      >
                        <div className='' style={{ zIndex: -1 }} />
                        {tag}
                      </a>
                    </Link>
                  ))}
                {/*  */}
              </div>
            </div>
            <div>
              <h2 className='text-pink-500 uppercase mb-8 tracking-widest font-bold'>
                Most Popular
              </h2>
              <ul>
                {popularPosts?.map((post) => (
                  <li key={post.id}>
                    <Link to={`/blog/${post.slug}`}>
                      <a className='text-gray-900 hover:text-cyan-600 font-bold text-lg leading-10 transition-colors'>
                        {post.name}
                      </a>
                    </Link>
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
