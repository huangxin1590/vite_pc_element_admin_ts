// 文件对象
let file: Blob;
// 文件 base64 码
let fileDataURL: string | ArrayBuffer;
/**
 * @information: 图片回显
 */
export function showImg(base64: string) {
  const imgs = document.createElement('IMG');
  imgs.src = base64;
}

/**
 * @information: 从 canvas 中获取文件 dataURL
 */
export function canvasToDataURL() {
  const canvas = document.createElement('canvas');
  const canvasDataURL = canvas.toDataURL('image/png', 1.0);
  console.log('从 canvas 中获取文件 dataURL :', canvasDataURL);
}

/**
 * @information: File, Blob 文件数据绘制到 canvas
 * 思路：File, Blob ——> dataURL ——> canvas
 */
export function fileAndBlobToCanvas(fileDataURL: string) {
  const img = new Image();
  img.src = fileDataURL;
  const canvas = document.createElement('canvas');
  if (!canvas.getContext) {
    alert('浏览器不支持canvas');
    return;
  }
  const ctx = canvas.getContext('2d');
  const canvasBox = document.getElementById('canvas-box');
  if (canvas) {
    (canvasBox as HTMLCanvasElement).appendChild(canvas);
  }
  if (ctx) {
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvasToDataURL();
    };
  }
}

/**
 * @information: dataURL(base64) ——> Blob(二进制)对象
 */
export function dataURLToBlob(fileDataURL: string) {
  if (!fileDataURL) {
    return;
  }
  const arr = fileDataURL.split(',');
  let mime: string = arr[0] || '';
  mime = mime.match(/:(.*?);/)[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  console.log('blob->', new Blob([u8arr], { type: mime }));
  fileAndBlobToCanvas(fileDataURL);
  return new Blob([u8arr], { type: mime });
}

/**
 * @information: 使用 FileReader 读取文件内容， File(二进制) ——> dataURL(base64)   Blob ——> dataURL 同理
 */
export function fileToDataURL(file: Blob) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    fileDataURL = reader.result as string;
    showImg(fileDataURL);
    dataURLToBlob(fileDataURL);
  };
}

/**
 * @Date: 2020-11-25 10:32:51
 * @information: 获取文件
 */
export function onChangeInput(event: any) {
  file = event.target.files[0];
  if (!FileReader) {
    alert('浏览器版本过低，请升级版本');
    return;
  } else if (file) {
    fileToDataURL(file);
  }
}
