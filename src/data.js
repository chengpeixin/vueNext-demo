import {reactive,toRefs,computed} from 'vue'
const defaultNoFinishedEventList = [
  {
    name:"写代码"
  },
  {
    name:"吃饭"
  },
  {
    name:"睡觉"
  }
]
const defaultCompletedEventList= [
  {
    name:"打一局游戏"
  }
]

export const useEventList = ()=>{
  const eventList = reactive({
    notFinishedEventList:defaultNoFinishedEventList,
    completedEventList:defaultCompletedEventList,
    isCompleted:computed(()=>!eventList.completedEventList.length),
    isNotFinished:computed(()=>!eventList.notFinishedEventList.length)
  })
  return toRefs(eventList)
}

export const useInputEventName = ()=>{
  let eventName = ""
  const inputEventName = reactive({
    eventName:eventName,
    resetEventName:()=>{
      inputEventName.eventName=""
    }
  })
  return toRefs(inputEventName);
}