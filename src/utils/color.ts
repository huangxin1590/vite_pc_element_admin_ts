// 十六进制颜色值的正则表达式
const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/

/* RGB颜色转换为16进制 */
export function rgbToHex(this: any) {
  if (/^(rgb|RGB)/.test(this)) {
    const aColor = this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    let strHex = '#'
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = this
    }
    return strHex
  }
  if (reg.test(this)) {
    const aNum = this.replace(/#/, '').split('')
    if (aNum.length === 6) {
      return this
    }
    if (aNum.length === 3) {
      let numHex = '#'
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum + aNum
      }
      return numHex
    }
  } else {
    return this
  }
}

/* 16进制颜色转为RGB格式 */
export function hexToRgba(hex: string, opacity = 1) {
  let sColor = hex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    const sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
    }
    // return 'rgb(' + sColorChange.join(',') + ')';
    return `rgba(${sColorChange.join(',')},${opacity})`
  }
  return sColor
}
