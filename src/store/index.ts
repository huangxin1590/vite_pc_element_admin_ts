import { createStore } from 'vuex';
import user from './modules/user';
import menu from './modules/menu';
import tags from './modules/tags';

export default createStore({
  modules: {
    user,
    menu,
    tags
  }
});
