const createURL = (path) => {
  return window.location.origin + path
}
export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updateEntry = async (id, updates) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
