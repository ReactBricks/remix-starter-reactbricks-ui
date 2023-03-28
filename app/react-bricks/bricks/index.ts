import { types } from "react-bricks/frontend"
//import reactBrickUi from "./react-bricks-ui"
// Example brick
import HeroUnit from "./custom/HeroUnit"

const bricks: types.Brick<any>[] = [
  //...reactBrickUi, // React Bricks UI
  HeroUnit,
  // Put here your other bricks...
]

export default bricks
