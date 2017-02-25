module.exports = {
  import: require('./import.service.js'),
  hide: require('./hide.service.js'),
  unhide: require('./unhide.service.js'),
  getRepo: require('./get-repo.service.js'),
  getAllActive: require('./get-all-active.service.js'),
  getUserReposFull: require('./get-user-repos-full.service.js'),
  getUserReposImported: require('./get-user-repos-imported.service.js'),
  toggleTrainingCenterStatus: require('./toggle-training-center-status.service.js'),
  TrainingCenter: require('./training-center')
}