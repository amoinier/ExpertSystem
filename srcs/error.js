module.exports = (message) => {
  console.log('error: ' + message)
  console.log('usage: node ' + path.basename(__filename) + " 'filepath'")
  return process.exit(0)
}
