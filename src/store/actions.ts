export const mapActions = {
  increment: state => ({ counter: state.counter + 1 }),
  decrement: state => ({ counter: state.counter - 1 }),
  increment2: state => ({ counter: state.counter + 2 }),
  decrement2: state => ({ counter: state.counter - 2 })
};

export const actions = store => mapActions;