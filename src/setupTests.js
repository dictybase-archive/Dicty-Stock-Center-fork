import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-15"
import "jest-styled-components"

configure({ adapter: new Adapter() })