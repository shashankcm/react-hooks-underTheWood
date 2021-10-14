const React = (function () {
  let hooks = [];
  let index = 0;
  function useState(initVal) {
    const state = hooks[index] || initVal;
    const _index = index;
    const setState = (newVal) => {
      hooks[_index] = newVal;
    };
    index++;
    return [state, setState];
  }
  function useEffect(cb, depsArray) {
    const oldDeps = hooks[index];
    let hasChanged = true;
    if (oldDeps) {
      hasChanged = depsArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    }
    if (hasChanged) cb();
    hooks[index] = depsArray;
    index++;
  }
  function render(Component) {
    index = 0;
    const C = Component();
    C.render();
    return C;
  }
  return { useState, render, useEffect };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");
  React.useEffect(() => {
    console.log("Heyyyy useEffect called");
  }, []);
  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word)
  };
}
