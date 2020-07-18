export const state = () => ({
  ticket:{}
});
export const mutations = {
  saveTicket(state,date){
    state.ticket = date;
  }
}
