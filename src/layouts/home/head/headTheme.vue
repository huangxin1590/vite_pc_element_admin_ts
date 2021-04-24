<template>
  <div class="heand-theme-wapper">
    <el-dialog title="主题" v-model="showThemeDialog" append-to-body width="30%">
      <el-radio-group v-model="themeList" class="list">
        <el-row :span="24">
          <el-col v-for="(item, index) in list" :key="index" :md="4" :xs="12" :sm="4">
            <el-radio :label="item.value">{{ item.name }}</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
      <el-color-picker v-model="themeColor.color"></el-color-picker>
      <el-color-picker v-model="themeColor['background-color']"></el-color-picker>
      <el-color-picker v-model="themeColor['border-color']"></el-color-picker>

      <!-- footer -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showThemeDialog = false">取 消</el-button>
          <el-button type="primary" @click="fnChangeTheme">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <span>
      <i class="el-icon-view head-theme-icon" @click="open"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { hexToRgba } from '@/utils/color'
import globalScssVar from '@/styles/global/_var.scss'

import bgImg from '@/assets/star-squashed.jpg'
import headBgImg from '@/assets/main-header-bg-custom.png'

interface ThemeOptions {
  themeColor: object
  replaceImgs: object
  classCallback?: (Options: ClassCallback) => string
  propCallback?: PropCallback
  [propname: string]: any
}

interface ReplaceStyle
  extends Pick<ThemeOptions, 'replaceImgs' | 'classCallback' | 'propCallback'> {
  styleText: string
  replaceColors: object
}

interface ClassCallback {
  classString: string
  replaceColors: object
  replaceImgs: object
}

interface PropCallback {
  (options: {
    classString: string
    prop: string
    propObjKeys: string[]
    propObj: object
    replaceColors: object
  }): string
}

interface ReplaceColor {
  classString: string
  replaceColors: object
  propObjKeys: string[]
  propObj: object
  propCallback: PropCallback | undefined
}

interface ReplaceImg {
  replaceImgPropList: string[]
  currentClass: string
  propObj: object
  replaceImgs: object
}

export default defineComponent({
  name: 'HeadTheme',
  data() {
    return {
      showThemeDialog: false,
      themeList: '',
      list: [
        { name: '默认主题', value: '' }
        // {
        //   name: '炫彩主题',
        //   value: 'theme-star'
        // }
      ],
      themeFeature: '#theme-custom',
      elColor: '',
      // 最终需要的自定义属性
      themeColor: {
        color: '#D31111',
        'background-color': '#D31111',
        'border-color': '#D31111'
      },
      // class作为key，自定义主题的时候需要添加
      themeImg: {
        'bg-img': bgImg,
        'head-bg-img': headBgImg
      }
    }
  },
  created() {
    // 设置自定义主题标识在 body上
    this.elColor = (globalScssVar as any).primaryColor
    document.body.setAttribute('id', 'theme-custom')
  },
  methods: {
    open() {
      this.showThemeDialog = true
    },
    async fnChangeTheme() {
      this.showThemeDialog = false

      await this.replaceTheme({
        themeColor: this.themeColor,
        replaceImgs: this.themeImg,
        classCallback: this.classCallback
      })

      this.elColor = this.themeColor.color
    },
    classCallback({ classString, replaceColors }: ClassCallback): string {
      if (classString.indexOf('.el-menu-item.is-active') !== -1) {
        classString = classString.replace(/#ecf5ff/, 'rgba(0,0,0,0.05)')
      }

      // element-ui的颜色(根据.el- 为依据判断)
      if (classString.indexOf('.el-') !== -1 && classString.indexOf(this.elColor) !== -1) {
        const propObj: object = this.strToPropsForStyle(classString)
        let elPropObj: object = {}

        for (const prop in propObj) {
          if (propObj[prop] === this.elColor) {
            elPropObj[prop] = propObj[prop]
          }
        }

        // 替换颜色
        elPropObj = this.replaceColor({
          classString,
          replaceColors,
          propObj: elPropObj,
          propCallback: undefined,
          propObjKeys: Object.keys(elPropObj).map((key) => key.trim())
        })

        // 重新拼接style
        classString = this.reCombineClass({ ...propObj, ...elPropObj }, classString)
      }

      if (classString.indexOf('.el-button--primary:') !== -1) {
        const rgba = hexToRgba(this.themeColor.color, 0.9)
        const spPropObj: object = this.strToPropsForStyle(classString)

        spPropObj['background'] = rgba
        spPropObj['border-color'] = rgba

        classString = classString = this.reCombineClass(spPropObj, classString)
      }

      return classString
    },
    /** 点击主题切换(主要获取link跟style的dom，并且获取有效的css链接) */
    async replaceTheme(options: ThemeOptions) {
      const { themeColor, replaceImgs, classCallback, propCallback } = options

      // 1:需要替换的color
      // 2、3:需要被替换的style与link
      // 4:获取需要用到的链接,link可能加载js文件,link可能预加载css，造成两个一样路径的link
      const finalThemeColor = this.calcFinalThemeColor(themeColor)
      const head = document.getElementsByTagName('head')[0]
      const styles = Array.from(head.getElementsByTagName('style'))
      const cssLinks = Array.from(head.getElementsByTagName('link')).filter(
        (item) =>
          (item as HTMLLinkElement).href.includes('css') &&
          (item as HTMLLinkElement).rel !== 'preload'
      )

      // link与style公用的参数
      const themeObj = {
        replaceColors: finalThemeColor,
        replaceImgs,
        classCallback,
        propCallback
      }

      // 加载link样式并且生成style
      for (let i = 0; i < cssLinks.length; i++) {
        await this.getCssFromLink(cssLinks[i].href).then((innerText) => {
          const styleTag = document.createElement('style')
          styleTag.type = 'text/css'
          this.setStyleInnerText({
            style: styleTag,
            innerText: innerText as string,
            themeObj: themeObj
          })
          head.appendChild(styleTag)
        })
      }

      // 修改style样式
      styles.forEach((style: HTMLStyleElement) => {
        this.setStyleInnerText({
          style: style,
          innerText: style.innerText,
          themeObj: themeObj
        })
      })

      // 将css的link链接删除(等待dom加载完成再删除,否则出现闪烁问题)
      this.$nextTick(() => {
        setTimeout(() => {
          cssLinks.forEach((item) => head.removeChild(item))
        }, 1000)
      })
    },
    // 给style标签设置值
    setStyleInnerText(options: { style: HTMLStyleElement; innerText: string; themeObj: any }) {
      const { style, innerText, themeObj } = options
      style.innerText = this.replaceStyle({
        ...themeObj,
        styleText: innerText
      })
    },
    /** 异步获取link链接的样式 */
    getCssFromLink(url: string, variable = '') {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            if (variable) {
              this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            }
            resolve(xhr.responseText)
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },
    /** 替换样式   */
    replaceStyle(options: ReplaceStyle): string {
      const { styleText, replaceColors, replaceImgs, classCallback, propCallback } = options
      const combineStyle = this.strToClassForStyle(styleText)

      combineStyle.forEach((currentClass, currentClassIndex) => {
        if (currentClass.includes(this.themeFeature)) {
          // style属性或者是style的class集合
          let propObj: object = this.strToPropsForStyle(combineStyle[currentClassIndex])

          // 替换颜色
          propObj = this.replaceColor({
            classString: currentClass,
            propObj,
            replaceColors,
            propCallback,
            propObjKeys: Object.keys(propObj).map((key) => key.trim())
          })

          // 替换img
          propObj = this.replaceImg({
            propObj,
            currentClass: currentClass,
            replaceImgs,
            replaceImgPropList: Object.keys(replaceImgs).map((prop) => prop)
          })

          // 重新拼接style
          combineStyle[currentClassIndex] = this.reCombineClass(
            propObj,
            combineStyle[currentClassIndex]
          )
        }

        // 编辑类的回调
        if (classCallback && typeof classCallback === 'function') {
          combineStyle[currentClassIndex] =
            classCallback({
              replaceColors,
              replaceImgs,
              classString: combineStyle[currentClassIndex]
            }) || combineStyle[currentClassIndex]
        }
      })
      return combineStyle.join('')
    },
    // 将字符串转化成每一个class
    strToClassForStyle(text: string): string[] {
      if (!text.length) {
        return []
      }

      // 为了处理文件（font/img）的路径问题，替换之后直接把路径提取到index.html的位置
      // 去掉所有的换行
      // 切割成属于每一个元素的class
      const textArr = text
        .replace(/\.\.\//g, '')
        .replace(/\n/g, '')
        .split('}')
      textArr.pop()

      return textArr.map((item) => (item += '}'))
    },
    /** 将字符串转化成style的属性 */
    strToPropsForStyle(str: string): object {
      const REX = /\{(.+?)\}/g
      let REXResult: string[] = []
      let styleProps: string[] | object = {}
      REXResult = str.match(REX) || []
      styleProps = REXResult[0]
        .slice(1, -1)
        .split(';')
        .filter((item) => item.trim().length > 0)

      styleProps = (styleProps as string[]).map((item) => {
        return item.split(':').map((item) => item.trim())
      })
      return Object.fromEntries(styleProps as [])
    },
    /** 替换颜色 */
    replaceColor(options: ReplaceColor): object {
      const { classString, replaceColors, propObjKeys, propObj, propCallback } = options
      for (const prop in replaceColors) {
        if (propObjKeys.includes(prop)) {
          propObj[prop] = replaceColors[prop]

          // 编辑属性的回调
          if (propCallback) {
            propObj[prop] =
              propCallback({ classString, prop: prop, propObjKeys, propObj, replaceColors }) ||
              propObj[prop]
          }
        }
      }
      return propObj
    },
    /** 替换img */
    replaceImg(option: ReplaceImg): object {
      const { replaceImgPropList, currentClass, propObj, replaceImgs } = option

      replaceImgPropList.length &&
        replaceImgPropList.forEach((curImgProp) => {
          if (currentClass.indexOf(curImgProp) !== -1) {
            propObj['background-image'] = `url(${replaceImgs[curImgProp]})`
          }
        })

      return propObj
    },
    /** 重组class */
    reCombineClass(propObj: object, classString: string): string {
      let newStr = ''
      for (const key in propObj) {
        newStr += `${key.trim()}:${propObj[key]};`
      }
      newStr = `{${newStr}}`
      return classString.replace(/\{(.*)+\}/g, newStr)
    },
    /** 获得最终的对比定义颜色数据 */
    calcFinalThemeColor(customTheme: object): object {
      const allTheme: object = {}
      const allColor = {
        'border-color': [
          'border-top-color',
          'border-bottom-color',
          'border-left-color',
          'border-right-color'
        ],
        'background-color': ['background', 'background-color']
      }

      // 将用户选择的定义颜色传值给最终的对比数据
      Object.keys(customTheme).forEach((item) => {
        allTheme[item] = customTheme[item]
      })

      // 对边框颜色进行对比
      if ('border-color' in customTheme) {
        allColor['border-color'].forEach((prop) => {
          allTheme[prop] = customTheme['border-color']
        })
      }

      // 背景颜色进行对比
      if ('background-color' in customTheme) {
        allColor['background-color'].forEach((prop) => {
          allTheme[prop] = customTheme['background-color']
        })
      }

      return allTheme
    }
  }
})
</script>

<style lang="scss" scoped>
.heand-theme-wapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list {
  width: 100%;
}
.head-theme-icon {
  cursor: pointer;
}
</style>
