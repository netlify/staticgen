async function access(pending, queue, resource, ...args) {
  try {
    const promise = resource(...args)
    pending.push(promise)
    await promise
    const idx = pending.indexOf(promise)
    pending.splice([idx, 1, ...(queue[0] ? [queue.shift()()] : [])])
    return promise
  } catch(err) {
    console.error(err)
    throw err
  }
}

function delay(boundAccess, queue, timeout, ...args) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject()
      const idx = queue.indexOf(resolve)
      queue.splice(idx, 1)
    }, timeout)
    const delayedResolve = async () => {
      clearTimeout(timeoutId)
      const resp = await boundAccess(...args)
      resolve(resp)
    }
    queue.push(delayedResolve)
  })
}

module.exports = function throttleConcurrency(resource, limit, timeout = 10000) {
  const pending = []
  const queue = []
  const boundAccess = access.bind(null, pending, queue, resource)
  const boundDelay = delay.bind(null, boundAccess, queue, timeout)
  return (...args) => ((pending.length < limit) ? boundAccess : boundDelay)(...args)
}
