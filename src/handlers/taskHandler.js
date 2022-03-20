import axios from 'axios'
import config from '../config'
import dateHandler from './dateHandler'

const serverURL = config.baseURL



const getHistory = async (token, date) => {

  const user = await axios.post(`${serverURL}find-by-token`, {
    token
  })

  const secondDate = new Date(date)
  const firstDate = new Date(new Date(secondDate).getTime()  - 1000 * 60 * 60 *24 * 60)

  console.log(dateHandler.dashDate(firstDate))
  console.log(dateHandler.dashDate(secondDate))

  const res = await axios.post(`${serverURL}get-task-during-period`, {
    firstDate: dateHandler.dashDate(firstDate),
    secondDate: dateHandler.dashDate(secondDate),
    userID: user.data.userID
  })



  return res.data.reverse()
}


const addTask = async (token, taskData) => {
  const user = await axios.post(`${serverURL}find-by-token`, {
    token
  })


  const res = await axios.post(`${serverURL}add-task`, {
    date: taskData.date,
    label: taskData.label,
    hours: taskData.hours,
    primordialHours: taskData.hours,
    userID: user.data.userID
  })


  return res.data
}


const deleteTask = async (token, taskID) => {
  const user = await axios.post(`${serverURL}find-by-token`, {
    token
  })


  const res = await axios.post(`${serverURL}delete-task`, {
    taskID,
    userID: user.data.userID
  })


  return res.data
}

const getTasks = async (token, date) => {
  const user = await axios.post(`${serverURL}find-by-token`, {
    token
  })

  const firstDate = new Date(date)
  const secondDate = new Date(new Date(firstDate).getTime()  + 1000 * 60 * 60 *24 * 14)

  console.log( dateHandler.dashDate(firstDate))

  const res = await axios.post(`${serverURL}get-task-during-period`, {
    userID: user.data.userID,
    firstDate: dateHandler.dashDate(firstDate),
    secondDate: dateHandler.dashDate(secondDate)
  })

  return res.data
}


export default {
  getHistory,
  addTask,
  getTasks,
  deleteTask
}
