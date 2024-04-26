// window = global;
// if (localStorage === undefined) {
//   var localStorage = {
//     data: {},
//     getItem: function(sKey) {
//       return this.data[sKey];
//     },
//     setItem: function(sKey, sValue) {
//       return this.data[sKey] = JSON.stringify(sValue);
//     },
//     length: {
//       get: function() {
//         return Object.keys(this.data).length;
//       }
//     },
//     removeItem: function(sKey) {
//       return delete this.data[sKey];
//     },
//     clear: function() {
//       for (var i in this.data) {
//         delete this.data[i];
//       }
//       return this.length = 0;
//     }
//   };
//   window.localStorage = localStorage;
// }
//
(function() {
  var BASE_URL = 'https://gcb384076498.github.io/SwyYunmuWikiDeskPet'
  function initialModel() {
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
    return lastModel
  }

  function loadConfig(lastModel) {
    return new Promise(function(resolve, reject) {
      fetch(BASE_URL+"/assets/index.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
        return response.text()
      }).then(function(data) {
        var dataJson = JSON.parse(data)
        resolve(dataJson[lastModel])
      }).catch(function (error) {
        console.log("加载配置失败", error)
        reject()
      })
    })
  }


  if (!localStorage.getItem('test')) {
    console.log("非测试模式233")
    return;
  }
  console.log("测试模式233")
  var lastModel = initialModel()


  loadConfig(lastModel).then(function (data) {
    console.log("配置加载成功", data)
      // 加载场景
  })
})()
