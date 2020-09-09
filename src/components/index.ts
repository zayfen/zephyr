
  // export all components
  import { ComponentAssets } from '../core/component-assets'

  let allComponentInstallers: Array<(asset: ComponentAssets) => void> = []
  

  import { install as aInstaller } from './a'
  allComponentInstallers.push(aInstaller)
  

  import { install as addressInstaller } from './address'
  allComponentInstallers.push(addressInstaller)
  

  import { install as articleInstaller } from './article'
  allComponentInstallers.push(articleInstaller)
  

  import { install as asideInstaller } from './aside'
  allComponentInstallers.push(asideInstaller)
  

  import { install as audioInstaller } from './audio'
  allComponentInstallers.push(audioInstaller)
  

  import { install as baseInstaller } from './base'
  allComponentInstallers.push(baseInstaller)
  

  import { install as buttonInstaller } from './button'
  allComponentInstallers.push(buttonInstaller)
  

  import { install as canvasInstaller } from './canvas'
  allComponentInstallers.push(canvasInstaller)
  

  import { install as codeInstaller } from './code'
  allComponentInstallers.push(codeInstaller)
  

  import { install as ddInstaller } from './dd'
  allComponentInstallers.push(ddInstaller)
  

  import { install as defInstaller } from './def'
  allComponentInstallers.push(defInstaller)
  

  import { install as divInstaller } from './div'
  allComponentInstallers.push(divInstaller)
  

  import { install as dlInstaller } from './dl'
  allComponentInstallers.push(dlInstaller)
  

  import { install as dtInstaller } from './dt'
  allComponentInstallers.push(dtInstaller)
  

  import { install as footerInstaller } from './footer'
  allComponentInstallers.push(footerInstaller)
  

  import { install as formInstaller } from './form'
  allComponentInstallers.push(formInstaller)
  

  import { install as h1Installer } from './h1'
  allComponentInstallers.push(h1Installer)
  

  import { install as h2Installer } from './h2'
  allComponentInstallers.push(h2Installer)
  

  import { install as h3Installer } from './h3'
  allComponentInstallers.push(h3Installer)
  

  import { install as h4Installer } from './h4'
  allComponentInstallers.push(h4Installer)
  

  import { install as h5Installer } from './h5'
  allComponentInstallers.push(h5Installer)
  

  import { install as h6Installer } from './h6'
  allComponentInstallers.push(h6Installer)
  

  import { install as headerInstaller } from './header'
  allComponentInstallers.push(headerInstaller)
  

  import { install as headInstaller } from './head'
  allComponentInstallers.push(headInstaller)
  

  import { install as hgroupInstaller } from './hgroup'
  allComponentInstallers.push(hgroupInstaller)
  

  import { install as iframeInstaller } from './iframe'
  allComponentInstallers.push(iframeInstaller)
  

  import { install as imgInstaller } from './img'
  allComponentInstallers.push(imgInstaller)
  

  import { install as inputInstaller } from './input'
  allComponentInstallers.push(inputInstaller)
  

  import { install as iInstaller } from './i'
  allComponentInstallers.push(iInstaller)
  

  import { install as labelInstaller } from './label'
  allComponentInstallers.push(labelInstaller)
  

  import { install as liInstaller } from './li'
  allComponentInstallers.push(liInstaller)
  

  import { install as navInstaller } from './nav'
  allComponentInstallers.push(navInstaller)
  

  import { install as optionInstaller } from './option'
  allComponentInstallers.push(optionInstaller)
  

  import { install as sectionInstaller } from './section'
  allComponentInstallers.push(sectionInstaller)
  

  import { install as selectInstaller } from './select'
  allComponentInstallers.push(selectInstaller)
  

  import { install as spanInstaller } from './span'
  allComponentInstallers.push(spanInstaller)
  

  import { install as tableInstaller } from './table'
  allComponentInstallers.push(tableInstaller)
  

  import { install as tbodyInstaller } from './tbody'
  allComponentInstallers.push(tbodyInstaller)
  

  import { install as tdInstaller } from './td'
  allComponentInstallers.push(tdInstaller)
  

  import { install as textareaInstaller } from './textarea'
  allComponentInstallers.push(textareaInstaller)
  

  import { install as theadInstaller } from './thead'
  allComponentInstallers.push(theadInstaller)
  

  import { install as thInstaller } from './th'
  allComponentInstallers.push(thInstaller)
  

  import { install as titleInstaller } from './title'
  allComponentInstallers.push(titleInstaller)
  

  import { install as trInstaller } from './tr'
  allComponentInstallers.push(trInstaller)
  

  import { install as ulInstaller } from './ul'
  allComponentInstallers.push(ulInstaller)
  

  import { install as videoInstaller } from './video'
  allComponentInstallers.push(videoInstaller)
  

  import { install as __text__Installer } from './__text__'
  allComponentInstallers.push(__text__Installer)
  
  export default allComponentInstallers
  