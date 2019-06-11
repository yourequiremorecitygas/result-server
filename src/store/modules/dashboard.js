import axios from 'axios'
var querystring = require('querystring');

  const state = {
    activeDevices: 0,
    activeRegion: [],
    ongoingNode: [],
    finishedDevice: [],
    deferredDevice: [],
    ocrResult: [],
    latestActions: []
  }
  
  // getters
  const getters = {

  }
  
  // actions
  const actions = {
    fetchLatestLog({commit, state}){
      axios.get('http://52.69.61.180:3000/log')
        .then(r => {
          debugger;
          state.latestActions = r.data.result.reverse()
        })
    },

    insertLog({dispatch, state}, payload){
      debugger;
      const fd = new FormData() 
      fd.append('cmd', payload.cmd) 
      fd.append('date', payload.date)

      const req = {
        'cmd' : payload.cmd,
        'date' : payload.date
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      axios.post('http://52.69.61.180:3000/log', querystring.stringify(req), config)
        .then(r => {
          if(r.status === 202){
            dispatch('fetchLatestLog')
          }
        })
    }
  }
  
  // mutations
  const mutations = {

    increaseCount (state) {
        state.activeDevices++;
    },

    decreaseCount (state) {
        state.activeDevices = (state.activeDevices <= 0)? 0 : --state.activeDevices;
    },

    activeRegion (state, region){
        if( state.ongoingNode.indexOf(region) > -1 ){
          state.deferredDevice.push(region)
        } else {
          state.activeRegion.push(region)
        }
    },

    inactiveRegion (state, region){
        state.activeRegion = state.activeRegion.filter( r => r != region )
        state.deferredDevice = state.deferredDevice.filter( r => r != region )
    },

    saveocr(state, result){
        state.ocrResult = result
    },

    destoryData (state){
        state.activeDevices = 0
        state.activeRegion = []
        state.ongoingNode = []
    },

    ongoingDevice(state, topic){
      state.activeRegion = state.activeRegion.filter( r => r != topic )
      state.ongoingNode.push(topic)
    },

    finishedDevice(state, node){
      state.ongoingNode = state.ongoingNode.filter( r => r != node )
      state.finishedDevice.push(node)
    },

    finishToActive(state, node){
      state.finishedDevice = []
      state.deferredDevice.forEach(node => {
        state.activeRegion.push(node)
      })
      state.deferredDevice = []
    }

  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }