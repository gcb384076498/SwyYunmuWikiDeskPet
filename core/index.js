(function() {
  if (!localStorage.getItem('test')) {
    console.log("非测试模式233")
    return;
  }
  console.log("测试模式233")
  var defaultModel = {
    type: 'spine',
    modelId: 'test_model'
  }
  var lastModel;
  try {
    lastModel = JSON.parse(localStorage.getItem('lastModel'))
  } catch(e) {
    lastModel = defaultModel
    console.log(e)
  }
  console.log("当前模型", lastModel["modelId"], lastModel["type"])
})()
