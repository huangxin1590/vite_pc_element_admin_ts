// declare module '*.svg'
// declare module '*.png'
// declare module '*.jpg'
// declare module '*.jpeg'
// declare module '*.gif'
// declare module '*.bmp'
// declare module '*.tiff'

declare module '*.svg' {
  interface Svg {
    content: string;
    id: string;
    viewBox: string;
    node: any;
  }
  const svg: Svg;
  export default svg;
}

declare module '*.png' {
  const png: string;
  export default png;
}

declare module '*.mp3' {
  const mp3: string;
  export default mp3;
}

declare module '*.gif' {
  const png: string;
  export default png;
}
