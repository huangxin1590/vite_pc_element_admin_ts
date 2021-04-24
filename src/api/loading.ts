import { ElLoading } from 'element-plus';

export let loading: any;
// 开始加载动画
export function startLoading() {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加载中....',
    background: 'rgba(0,0,0,0.7)'
  });
}
// 结束加载动画
export function endLoading() {
  loading.close();
}
