import { types } from 'react-bricks/frontend'
import reactBricksUITheme from './react-bricks-ui/index'
import HeroUnit from './custom/HeroUnit'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Custom Theme 1',
    categories: [
      {
        categoryName: 'Hero sections',
        bricks: [HeroUnit], // Custom Bricks
      },
    ],
  },
]

export default bricks
