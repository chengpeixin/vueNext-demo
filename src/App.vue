<template>
<div>
  <h1>事件清单</h1>
  <input type="text" v-model="eventName">
  <button @click="addEventHandle">提交</button>
  <h2>未完成事件</h2>
  <ul>
    <li v-for="(item,index) in notFinishedEventList">{{item.name}}
      <button @click="completedEventHandle(index)">已完成</button>
    </li>
  </ul>
  <h3 v-show="isNotFinished">当前暂无未完成事件</h3>
  <h2>已完成事件</h2>
  <ul>
    <li v-for="(item,index) in completedEventList">
      {{item.name}}
      <button @click="noFinishedEventHandle(index)">未完成</button>
    </li>
    <h3 v-show="isCompleted">当前暂无已完成事件</h3>
  </ul>
</div>
</template>

<script>
import { ref,effect,computed,reactive } from 'vue'
import {useEventList,useInputEventName} from './data'
import {trim} from 'lodash'
// 方便数据移动
Array.prototype.move = function (index,targetArray,targetArrayIndex = targetArray.length ) {
  const targetItem = this.splice(index,1)
  targetArray.splice(targetArrayIndex,0,...targetItem)
}
export default {
  setup() {
    const {notFinishedEventList,completedEventList,isCompleted,isNotFinished} = useEventList();
    const {eventName,resetEventName} = useInputEventName();
    // 添加
    const addEventHandle = ()=>{
      const beforeAddEventName = eventName.value
      if (trim(beforeAddEventName)==="") {
        return;
      }
      const addedEvent = Object.create({
        name:beforeAddEventName
      });
      notFinishedEventList.value.push(addedEvent)
      resetEventName.value();
    }
    // 已完成
    const completedEventHandle = (index)=>{
      notFinishedEventList.value.move(index,completedEventList.value)
    }
    // 未完成
    const noFinishedEventHandle = (index)=>{
      completedEventList.value.move(index,notFinishedEventList.value)
    }
    return {
      eventName,
      notFinishedEventList,
      addEventHandle,
      completedEventHandle,
      noFinishedEventHandle,
      completedEventList,
      isCompleted,
      isNotFinished
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
