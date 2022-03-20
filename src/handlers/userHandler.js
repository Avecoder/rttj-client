import axios from 'axios'
import config from '../config'
import dateHandler from './dateHandler'

const serverURL = config.baseURL



const getTasksWeek = async (token, date) => {
  try {
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })
    const secondDate = new Date(date)
    const firstDate = new Date(new Date(secondDate).getTime()  - 1000 * 60 * 60 *24 * 7)


    const data = await axios.post(`${serverURL}data`, {
      firstDate: dateHandler.dashDate(firstDate),
      secondDate: dateHandler.dashDate(secondDate),
      userID: userInfo.data.userID
    })



    let userData = data.data


    userData.forEach((item, i) => {
      if(item.date === userData[i - 1]?.date) {
        item.hours += userData[i - 1]?.hours
        userData.splice(i - 1, 1)
      }
    })

    return data.data
  } catch(e) {
    console.log(`getTasksWeek: ${e}`)
  }
}

const getTasksPeriod = async (token, date) => {
  try{
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })

    const secondDate = new Date(date)
    const firstDate = new Date(new Date(secondDate).getTime()  - 1000 * 60 * 60 *24 * 7)

    const data = await axios.post(`${serverURL}get-task-during-period`, {
      firstDate: dateHandler.dashDate(firstDate),
      secondDate: dateHandler.dashDate(secondDate),
      userID: userInfo.data.userID
    })

    return data.data
  } catch(e) {
    console.log(`getTasksPeriod - ${e}`)
  }
}


const getUser = async token => {
  try {
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })
    return userInfo.data
  } catch(e) {
    console.log(`getUser - ${e}`)
    return 'UNAUTH'
  }
}

const getAllStatic = async (token, date) => {
  try {
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })

    const secondDate = new Date(date)
    const firstDate = new Date(new Date(secondDate).getTime()  - 1000 * 60 * 60 *24 * 14)

    const dataAll = await axios.post(`${serverURL}data-all`, {
      userID: userInfo.data.userID,
      firstDate: dateHandler.dashDate(firstDate),
      secondDate: dateHandler.dashDate(secondDate),
    })


    return dataAll.data
  } catch (e) {
    console.log(`getAllStatic - ${e}`)
  }
}


const getFriends = async token => {
  try {
    const user = await axios.post(`${serverURL}find-by-token`, {
      token
    })

    return user.data.friendsList
  } catch(e) {
    console.log(`getFriends - ${e}`)
  }
}

const seacrhUsers = async username => {
  try {
    const usersList = await axios.get(`${serverURL}info-by-username/${username}`)
    return usersList.data
  } catch(e) {
    console.log(`seacrhUsers - ${e}`)
  }
}

const addFriend = async (token, friendID) => {
  try {
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })

    const addUser = await axios.post(`${serverURL}request-friend`, {
      userID: userInfo.data.userID,
      friendID
    })
    return addUser.data
  } catch(e) {
    console.log(`addFriend - ${e}`)
  }
}

const removeFriend = async (token, friendID) => {
  try {
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })

    const removeUser = await axios.post(`${serverURL}delete-friend`, {
      userID: userInfo.data.userID,
      friendID
    })
    return removeUser.data
  } catch(e) {
    console.log(`removeFriend - ${e}`)
  }
}


const getUsersByIDs = async friendsID => {
  try {
    const friends = await axios.post(`${serverURL}users-by-id`, {
      usersID: friendsID
    })

    return friends.data.usersList
  } catch(e) {
    console.log(`getUsersByIDs - ${e}`)
  }
}

const updateUser = async (token, username, avatar) => {
  try {
    const userInfo = await axios.post(`${serverURL}find-by-token`, {
      token
    })

    const image = await fetch(avatar).then(res => res.blob())
    const formData = new FormData()
    formData.append('img', image)
    formData.append('userID', userInfo.data.userID)
    formData.append('username', username)
    const data = await axios.post(`${serverURL}/change-user-inf`, formData, {
      token,
      username
    })
    return data.data
  } catch(e) {
    console.log(`updateUser - ${e}`)
  }
}

export default {
  getTasksWeek,
  getFriends,
  getTasksPeriod,
  getUser,
  getAllStatic,
  seacrhUsers,
  addFriend,
  removeFriend,
  getUsersByIDs,
  updateUser
}
