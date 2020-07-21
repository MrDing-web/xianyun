export const state = () => ({
  list:[]
})

export const mutations = {
  addHistory(state, data) {
    // 这里传进来的数据是 data
    // 源数据是 state.list
    // 我们要校验的是, list 当中是否已经存在传入的搜索
    // 不存在再放入
    let existed = false;

    state.list.forEach(element => {

      if (
        element.departCode === data.departCode &&
        element.destCode === data.destCode &&
        element.departDate === data.departDate
      ) {
        // 其中有一个符合, 就证明已经存在,
        // 不应该保存, 利用一个变量来储存这个状态
        existed = true;
      }
    });

    if (!existed) {
      state.list.unshift(data);
    }
  }
}
