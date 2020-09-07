
import { makeZephyrWithInnerComponents } from '../src/zephyr'

let zephyr = makeZephyrWithInnerComponents()

const template = (`
<div class="test"><span class="span"></span></div>
`)

zephyr.useLayout('html')
zephyr.useTheme('zephyr')

console.log(zephyr.renderTemplate(template))
