import { InjectionKey } from "vue";
import * as Vuex from "../index";

namespace StricterStoreInstance {
  const store = Vuex.createStore(
    {
      stricterTypes: true,
      state: { state1: 1 },
      getters: { getter1: () => 1 },
      mutations: { mutation1: (state, payload: { a: string }) => {} },
      actions: { action1: async (context, payload: { a: string }) => 1 },
      modules: {
        module1: {
          namespaced: true,
          state: { state2: "" },
          getters: { getter2: () => "" },
          mutations: { mutation2: (state, payload: { b: number }) => {} },
          actions: { action2: async (context, payload: { b: number }) => "" },
          modules: {
            module2: {
              namespaced: false,
              state: { state3: true },
              getters: { getter3: () => true },
              mutations: { mutation3: (state, payload: { c: boolean }) => {} },
              actions: {
                action3: async (context, payload: { c: boolean }) => true,
              },
            },
          },
        },
      },
    },
  );

  const state1 = store.state.state1;
  const state2 = store.state.module1.state2;
  const state3 = store.state.module1.module2.state3;

  const getter1 = store.getters.getter1;
  const getter2 = store.getters["module1/getter2"];

  let commitResult1 = store.commit("mutation1", { a: "" });
  let commitResult2 = store.commit("module1/mutation2", { b: 1 });

  commitResult1 = store.commit({ type: "mutation1", a: "" });
  commitResult2 = store.commit({ type: "module1/mutation2", b: 1 });

  let dispatchResult1 = store.dispatch("action1", { a: "" });
  let dispatchResult2 = store.dispatch("module1/action2", { b: 1 });

  dispatchResult1 = store.dispatch({ type: "action1", a: "" });
  dispatchResult2 = store.dispatch({ type: "module1/action2", b: 1 });
}

namespace StoreInstance {
  const store = new Vuex.Store({
    state: {
      value: 0
    }
  });

  store.state.value;
  store.getters.foo;

  store.dispatch("foo", { amount: 1 }).then(() => {});
  store.dispatch({
    type: "foo",
    amount: 1
  }).then(() => {});

  store.commit("foo", { amount: 1 });
  store.commit({
    type: "foo",
    amount: 1
  });

  store.watch(state => state.value, value => {
    value = value + 1;
  }, {
    immediate: true,
    deep: true
  });

  store.subscribe((mutation, state) => {
    mutation.type;
    mutation.payload;
    state.value;
  });

  store.subscribe(() => {}, { prepend: true });

  store.subscribeAction((action, state) => {
    action.type;
    action.payload;
    state.value;
  });

  store.subscribeAction({
    before(action, state) {
      action.type;
      action.payload;
      state.value;
    }
  });

  store.subscribeAction({
    before(action, state) {
      action.type;
      action.payload;
      state.value;
    },
    after(action, state) {
      action.type;
      action.payload;
      state.value;
    }
  });

  store.subscribeAction({
    before(action, state) {
      action.type;
      action.payload;
      state.value;
    },
    error(action, state, error) {
      action.type;
      action.payload;
      state.value;
      error;
    }
  });

  store.subscribeAction({
    before(action, state) {
      action.type;
      action.payload;
      state.value;
    },
    after(action, state) {
      action.type;
      action.payload;
      state.value;
    },
    error(action, state, error) {
      action.type;
      action.payload;
      state.value;
      error;
    }
  });

  store.subscribeAction({
    after(action, state) {
      action.type;
      action.payload;
      state.value;
    }
  });

  store.subscribeAction({
    after(action, state) {
      action.type;
      action.payload;
      state.value;
    },
    error(action, state, error) {
      action.type;
      action.payload;
      state.value;
      error;
    }
  });

  store.subscribeAction({
    error(action, state, error) {
      action.type;
      action.payload;
      state.value;
      error;
    }
  });

  store.subscribeAction({}, { prepend: true });

  store.replaceState({ value: 10 });
}

namespace UseStoreFunction {
  interface State {
    a: string
  }

  const key: InjectionKey<string> = Symbol('store')

  const storeWithKey = Vuex.useStore(key)
  storeWithKey.state.a

  const storeWithKeyString = Vuex.useStore('store')
  storeWithKeyString.state.a

  const storeWithState = Vuex.useStore<State>()
  storeWithState.state.a

  const storeAsAny = Vuex.useStore()
  storeAsAny.state.a
}

namespace RootModule {
  const store = new Vuex.Store({
    state: {
      value: 0
    },
    getters: {
      count: state => state.value,
      plus10: (_, { count }) => count + 10
    },
    actions: {
      foo ({ state, getters, dispatch, commit }, payload) {
        this.state.value;
        state.value;
        getters.count;
        dispatch("bar", {});
        commit("bar", {});
      }
    },
    mutations: {
      bar (state, payload) {}
    },
    strict: true,
    devtools: true
  });
}

namespace RootDefaultModule {
  const store = new Vuex.default.Store({
    state: {
      value: 0
    },
    getters: {
      count: state => state.value,
      plus10: (_, { count }) => count + 10
    },
    actions: {
      foo ({ state, getters, dispatch, commit }, payload) {
        this.state.value;
        state.value;
        getters.count;
        dispatch("bar", {});
        commit("bar", {});
      }
    },
    mutations: {
      bar (state, payload) {}
    },
    strict: true
  });
}

namespace InitialStateFunction {
  const store = new Vuex.Store({
    state: () => ({
      value: 1
    })
  });
  const n: number = store.state.value;
}

namespace NestedModules {
  interface RootState {
    a: {
      value: number;
    };
    b: {
      c: {
        value: number;
      };
      d: {
        value: number;
      },
      e: {
        value: number;
      }
    };
  }

  type ActionStore = Vuex.ActionContext<{ value: number }, RootState>

  const module = {
    state: {
      value: 0
    },
    actions: {
      foo (
        { state, getters, dispatch, commit, rootState }: ActionStore,
        payload: { amount: number }
      ) {
        state.value;
        getters.root;
        rootState.b.c.value;
        dispatch("bar", {});
        commit("bar", payload);
      }
    },
    mutations: {
      bar (state: { value: number }, payload: { amount: number }) {
        state.value += payload.amount;
      }
    }
  };

  const store = new Vuex.Store<RootState>({
    getters: {
      root: state => state
    },
    modules: {
      a: module,
      b: {
        modules: {
          c: module,
          d: module,
          e: {
            state: {
              value: 0
            },
            actions: {
              foo(context: ActionStore, payload) {
                this.state.a;
              }
            }
          }
        }
      }
    }
  });
}

namespace NamespacedModule {
  const store = new Vuex.Store({
    state: { value: 0 },
    getters: {
      rootValue: state => state.value
    },
    actions: {
      foo () {}
    },
    mutations: {
      foo () {}
    },
    modules: {
      a: {
        namespaced: true,
        state: { value: 1 },
        actions: {
          test: {
            root: true,
            handler ({ dispatch }) {
              dispatch('foo')
            }
          },
          test2: {
            handler ({ dispatch }) {
              dispatch('foo')
            }
          }
        },
        modules: {
          b: {
            state: { value: 2 }
          },
          c: {
            namespaced: true,
            state: { value: 3 },
            getters: {
              constant: () => 10,
              count (state, getters, rootState, rootGetters) {
                getters.constant;
                rootGetters.rootValue;
              }
            },
            actions: {
              test ({ dispatch, commit, getters, rootGetters }) {
                getters.constant;
                rootGetters.rootValue;

                dispatch("foo");
                dispatch("foo", null, { root: true });

                commit("foo");
                commit("foo", null, { root: true });
              },
              foo () {}
            },
            mutations: {
              foo () {}
            }
          }
        }
      }
    }
  });
}

namespace RegisterModule {
  interface RootState {
    value: number;
    a?: {
      value: number;
      b?: {
        value: number;
      }
    };
  }

  const store = new Vuex.Store<RootState>({
    state: {
      value: 0
    }
  });

  store.registerModule("a", {
    state: { value: 1 }
  });

  store.hasModule('a')

  store.registerModule(["a", "b"], {
    state: { value: 2 }
  });

  store.registerModule(["a", "b"], {
    state: { value: 2 }
  }, { preserveState: true });

  store.hasModule(['a', 'b'])

  store.unregisterModule(["a", "b"]);
  store.unregisterModule("a");
}

namespace HotUpdate {
  interface RootState {
    value: number;
    a: {
      b: {
        value: number;
      };
    };
  };

  type ActionStore = Vuex.ActionContext<{ value: number }, RootState>

  const getters = {
    rootValue: (state: RootState) => state.value
  };

  const actions = {
    foo (store: ActionStore, payload: number) {}
  };

  const mutations = {
    bar (state: { value: number }, payload: number) {}
  };

  const module = {
    state: {
      value: 0
    },
    getters: {
      count: (state: { value: number }) => state.value
    },
    actions,
    mutations
  };

  const modules = {
    a: {
      modules: {
        b: module
      }
    }
  };

  const store = new Vuex.Store<RootState>({
    state: {
      value: 0
    } as any,
    getters,
    actions,
    mutations,
    modules
  });

  store.hotUpdate({
    getters,
    actions,
    mutations,
    modules
  });
}

namespace Plugins {
  function plugin (store: Vuex.Store<{ value: number }>) {
    store.subscribe((mutation, state) => {
      mutation.type;
      state.value;
    });
  }

  class MyLogger {
    log(message: string) {
       console.log(message);
    }
  }

  const logger = Vuex.createLogger<{ value: number }>({
    collapsed: true,
    transformer: state => state.value,
    mutationTransformer: (mutation: { type: string }) => mutation.type,
    logger: new MyLogger()
  });

  const store = new Vuex.Store<{ value: number }>({
    state: {
      value: 0
    },
    plugins: [plugin, logger]
  });
}
