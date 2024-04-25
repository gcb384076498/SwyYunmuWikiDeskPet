(function() {
  if (!localStorage.getItem('test')) {
    console.log("非测试模式233")
    return;
  }
  console.log("测试模式233")
  var defaultModel = {
    type: 'spine',
    modelId: '150154_hg_axhb_xuyuan'
  }
  var lastModel;
  var lastModelLocal = localStorage.getItem('lastModel')
  if  (!lastModelLocal) {
    lastModel = defaultModel
  } else {
    lastModel = lastModelLocal
  }
  console.log("当前模型", lastModel)
})()
