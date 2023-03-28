import { types } from "react-bricks/frontend"

const pageTypes: types.IPageType[] = [
  {
    name: "page",
    pluralName: "pages",
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    excludedBlockTypes: [
      "title",
      "paragraph",
      "quote",
      "video",
      "code-block",
      "tweet",
      "tweet-light",
      "image",
    ],
  },
  {
    name: "blog",
    pluralName: "blog",
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    allowedBlockTypes: [
      "title",
      "paragraph",
      "quote",
      "video",
      "code-block",
      "tweet",
      "tweet-light",
      "image",
    ],
  },
  {
    name: "layout",
    pluralName: "layout",
    defaultLocked: false,
    defaultStatus: types.PageStatus.Published,
    getDefaultContent: () => [],
    isEntity: true,
  },
]

export default pageTypes
