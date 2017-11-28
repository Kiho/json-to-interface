import createStore from 'redux-zero';
import { connect, getActions } from 'redux-zero/svelte';

const initialState = { 
  counter: 0
};

const store = createStore(initialState);
const context: any = store;

context.create = function(ctor, target) {
  const component = new ctor({
    target,
    data: store.getState()
  });
  return component;
}

context.destroy = function(ref){
  ref.destroy();
}

const init = (component, options) => {
  options.data = options.data || {};

  component.connect = (mapToProps, mapActions) => {
    if (component.constructor.show) {
      component.observe('show', show => {
        if (show) {
          component.set({instance: component.constructor.show(component, store)});
        } else {
          context.destroy(component.get('instance'));
        }
      }, { defer: true })
      component.on('destroy', component.get('instance'));  
    }
    
    if (mapActions) {
      const actions = getActions(store, mapActions);
      const methods = {};
      Object.keys(actions).forEach(x => {
        if (component[x]) methods[x] = actions[x];
      });
      Object.assign(component, methods);
    }
    connect(component, store, mapToProps);
  }
  Object.assign(options.data, store.getState());
}

context.init = init;

export default store;
