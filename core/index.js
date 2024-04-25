(function() {
  if (!localStorage.getItem('test')) {
    console.log("非测试模式")
    return;
  }
  console.log("测试模式")
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
