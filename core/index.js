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
  var BASE_URL = 'https://gcb384076498.github.io/SwyAssets'

  var spineMotion = {
    "bath": "洗澡",
    "defy": "挑衅",
    "die": "死亡",
    "dizzy": "晕眩",
    "hello": "问候",
    "hit": "被击中",
    "idle": "站立",
    "idle1": "站立1",
    "idle2": "站立2",
    "idle3": "站立3",
    "jump": "跳跃",
    "lie": "躺下",
    "pull": "拉起",
    "run": "跑动",
    "sit": "坐下",
    "skill1": "一技能",
    "skill2": "二技能",
    "skill3": "三技能",
    "walk": "行走",
    "win": "胜利",
    "work": "工作"
  }
  var lastFrameTime = Date.now() / 1000;
  var canvas;
  var shader;
  var batcher;
  var gl;
  var mvp = new spine.webgl.Matrix4();
  var assetManager;
  var skeletonRenderer;
  var debugRenderer;
  var shapes;
  var skeletons = {};
  var activeSkeleton;
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



  function resize() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var bounds = skeletons[activeSkeleton].bounds;
    if (canvas.width != w || canvas.height != h) {
      canvas.width = w;
      canvas.height = h;
    }

    // magic
    var centerX = bounds.offset.x + bounds.size.x / 2;
    var centerY = bounds.offset.y + bounds.size.y / 2;
    var scaleX = bounds.size.x / canvas.width;
    var scaleY = bounds.size.y / canvas.height;
    var scale = Math.max(scaleX, scaleY) * 1.2;
    scale += 1;
    scale += -0 * 2;
    var width = canvas.width * scale;
    var height = canvas.height * scale;
    canvas.width = width
    canvas.height = height

    mvp.ortho2d(centerX - width / 2, centerY - height / 2, width, height);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function loadConfig(lastModel) {
    return new Promise(function(resolve, reject) {
      fetch(BASE_URL+"/index.json", {
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
        reject(error)
      })
    })
  }
  function initSpine(modelData) {
    /*
    基于食之契约B站wiki桌宠代码修改
     */

  }
  function initLive2d(modelData) {
    /*
    基于食之契约B站wiki桌宠代码修改
     */

  }

  if (!localStorage.getItem('test')) {
    console.log("非测试模式233")
    return;
  }
  console.log("测试模式233")
  var lastModel = initialModel()


  loadConfig(lastModel["modelId"]).then(function (data) {
    console.log("配置加载成功", data)
    if  (data["model_type"] === 1) {
      initSpine(data)
    } else if (data["model_type"] === 2 || data["model_type"] === 3) {
      initLive2d(data)
    }
      // 加载场景
  }).catch(function (error) {
    console.log("加载配置失败", error)
  })
})()
