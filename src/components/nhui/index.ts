import { App } from 'vue';
import XAutocomplate from './autocomplate/index.vue';
import Xupload from './upload/index.vue';
import XTree from './tree/index.vue';

const components = [XAutocomplate, Xupload, XTree];

function install(app: App) {
  components.forEach(item => {
    app.component(item.name, item);
  });
}

export default {
  install
};
