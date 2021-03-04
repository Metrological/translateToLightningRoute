export default steps => {
    return steps.reduce((promise, method) => {
      return promise.then(() => method())
    }, Promise.resolve(null))
  }
