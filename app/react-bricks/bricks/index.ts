import { types } from 'react-bricks/frontend'

// React Bricks UI website bricks
import website from 'react-bricks-ui/website'
import blog from 'react-bricks-ui/blog'

// Example brick
import HeroUnit from './HeroUnit'

const bricks: types.Brick<any>[] = [
  ...website,
  ...blog,
  HeroUnit,
  // Put here your other bricks...
]

export default bricks
