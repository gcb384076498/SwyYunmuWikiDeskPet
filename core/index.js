(function() {
  if (!localStorage.getItem('test')) {
    return;
  }
  let defaultModel = {
    type: 'spine',
    modelId: 'test_model'
  }
  let lastModel = {}
  try {
    lastModel = JSON.parse(localStorage.getItem('lastModel'))
  } catch(e) {
    lastModel = defaultModel
  }
})()
