<template>
  <div style="height: 100%">
    <div>
      <div>fileReader</div>
      <input ref="refInputFile" type="file" @change="fileReader" />
      <img height="100" width="100" :src="imgSrc" />
    </div>
    <div>-----------------------</div>
    <div>
      <div class="btn" @click="fileHiddenBtnClick">隐藏的input file上传</div>
      <input
        style="display: none"
        type="file"
        ref="refInputFileHidden"
        @change="console.log(123)"
      />
    </div>
    <div>-----------------------</div>
    <div>
      <input type="file" id="fileElem1" multiple accept="image/*" style="display: none" />
      <label for="fileElem1" class="btn">label与input关联</label>
    </div>
    <div>-----------------------</div>
    <div>
      <input type="file" id="fileElem2" multiple accept="image/*" style="display: none" />
      <a href="javascript:void(0);" id="fileSelect" class="btn">window.URL.createObjectURL</a>
      <div id="fileList">
        <p>No files selected!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

export default defineComponent({
  name: 'FileUpload',
  setup() {
    const imgSrc = ref('')

    const refInputFile = ref(null)
    const fileReader = () => {
      ;(refInputFile as Ref).value.addEventListener('change', (e: Event) => {
        const file = (e.target as any).files[0]
        const fileImg: FileReader = new FileReader()

        if (!file || !fileImg) {
          return
        }

        fileImg.onload = () => {
          if (file.type !== ('image/png' || 'image/jpg' || 'image/jpeg')) {
            alert('图片格式错误')
            return
          }
          // 图片base64\
          ;(imgSrc as Ref).value = fileImg.result
        }
        fileImg.readAsDataURL(file)
      })
    }

    const refInputFileHidden = ref(null)
    const fileHiddenBtnClick = () => {
      ;(refInputFileHidden as Ref).value.click()
    }

    const createObjectURL = () => {
      window.URL = window.URL || window.webkitURL

      const fileSelect: HTMLElement | null = document.getElementById('fileSelect')
      const fileElem2: HTMLElement | null = document.getElementById('fileElem2')
      const fileList: HTMLElement | null = document.getElementById('fileList')

      if (fileSelect) {
        fileSelect.addEventListener(
          'click',
          function (e) {
            if (fileElem2) {
              fileElem2.click()
            }
            e.preventDefault() // prevent navigation to "#"
          },
          false
        )
      }

      if (fileElem2) {
        fileElem2.addEventListener('change', function (e: Event) {
          if (fileList === null) return

          const { files } = e.target as any
          if (!files.length && fileList !== null) {
            fileList.innerHTML = '<p>No files selected!</p>'
          } else {
            fileList.innerHTML = ''
            const list = document.createElement('ul')
            fileList.appendChild(list)
            for (let i: number = 0; i < files.length; i++) {
              const li = document.createElement('li')
              list.appendChild(li)

              const img = document.createElement('img')
              img.src = window.URL.createObjectURL(files[i])
              img.height = 60
              img.onload = function () {
                window.URL.revokeObjectURL(img.src)
              }
              li.appendChild(img)
              const info = document.createElement('span')
              info.innerHTML = `${files[i].name}: ${files[i].size} bytes`
              li.appendChild(info)
            }
          }
        })
      }
    }

    return {
      imgSrc,
      refInputFile,
      refInputFileHidden,
      fileReader,
      fileHiddenBtnClick,
      createObjectURL
    }
  },
  mounted() {
    this.fileReader()
    this.createObjectURL()
  }
})
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 5px;
  cursor: pointer;
}
</style>
