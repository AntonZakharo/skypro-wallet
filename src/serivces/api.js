import axios from 'axios'
const API_URL = 'https://wedev-api.sky.pro/api/transactions'
// Эта переменная содержит базовый URL для запросов к нашему серверу
async function fetchExpenses({ token }) {
  try {
    // Здесь начинается попытка сделать запрос
    const data = await axios.get(API_URL, {
      headers: {
        Authorization: token,
      },
    })

    return data.data
  } catch (error) {
    throw new Error(error)
  }
}
export const getExpenses = async (expenses) => {
  try {
    const data = await fetchExpenses({
      token: 'Bearer ' + localStorage.getItem('token'),
    })

    if (data) expenses.value = data
  } catch (err) {
    throw new Error(err)
  }
}
export async function postExpense(expense) {
  try {
    const data = await axios.post(API_URL, expense, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': '',
      },
    })
    return data.data.transactions
  } catch (error) {
    throw new Error(error)
  }
}

export async function editExpense(id, expense) {
  try {
    const data = await axios.patch(API_URL + id, expense, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': '',
      },
    })
    return data.data.words
  } catch (error) {
    throw new Error(error)
  }
}

export async function deleteTask(id) {
  try {
    const data = await axios.delete(API_URL + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': '',
      },
    })

    return data.data.words
  } catch (error) {
    throw new Error(error)
  }
}
