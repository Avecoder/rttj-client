import axios from 'redaxios'
import config from '../config'

const serverURL = config.baseURL






const getStatus = async token => {
  const user = await axios.post(`${serverURL}find-by-token`, {
    token
  })
  return user.data
}

const getUsersList = async (status, count) => {
  const usersList = await axios.post(`${serverURL}users-list`, {
    status,
    count
  })

  return usersList.data.users.filter(item => item.status !== 'ADMIN')
}

const changeStatusUser = async (status, userID, substatus) => {


  const data = await axios.post(`${serverURL}change-user-status`, {
    userID,
    substatus,
    status
  })

  return data.data
}

const findUsersByUsername = async (status, username) => {
  const data = await axios.post(`${serverURL}find-users-username`, {
      status,
      username
  })

  return data.data
}

const unBannedUser = async (status, userID) => {
  const data = await axios.post(`${serverURL}unbanned`, {
      status,
      userID
  })

  return data.data
}


const bannedUser = async (status, userID) => {
  const data = await axios.post(`${serverURL}banned`, {
      status,
      userID
  })

  return data.data
}




export default {
  getStatus,
  getUsersList,
  changeStatusUser,
  findUsersByUsername,
  unBannedUser,
  bannedUser
}
