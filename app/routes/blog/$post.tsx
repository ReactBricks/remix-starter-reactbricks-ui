import { useContext } from 'react'
import { ReactBricksContext, PageViewer, fetchPage, cleanPage } from 'react-bricks/frontend'
import { useLoaderData } from 'remix'
import type { MetaFunction } from 'remix'

export const loader = async ({ params }: { params: { post: string } }) => {

  try {
    const page = await fetchPage(params.post, process.env.API_KEY as string)
    return { page }
  } catch {
    throw new Error(`Cannot find the "${params.post}" post.`)
  }
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.page?.meta?.title || 'Blog post',
  }
}

export default function Page() {
  const { page } = useLoaderData()
  // Clean the received content
  // Removes unknown or not allowed bricks
  const { pageTypes, bricks } = useContext(ReactBricksContext)
  const pageOk = page ? cleanPage(page, pageTypes, bricks) : null

  return <PageViewer page={pageOk} />
}
