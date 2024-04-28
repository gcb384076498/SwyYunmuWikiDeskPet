(function() {
    var BASE_URL = 'https://gcb384076498.github.io/SwyAssets'



    function listModel() {
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
                resolve(dataJson)
            }).catch(function (error) {
                reject(error)
            })
        })
    }

    function  createElement(tag, attrs) {
        var element = document.createElement(tag)
        for (var attr in attrs) {
            element.setAttribute(attr, attrs[attr])
        }
        return element
    }


    function saveCurrentPet(config, modelName) {
        var configObj = {
            type: config["model_type"] === 1 ? "spine" : "live2d",
            modelId: modelName
        }
        localStorage.setItem('lastModel', JSON.stringify(configObj))
    }

    if (!localStorage.getItem('test')) {
        console.log("非测试模式233")
        return;
    }
    console.log("测试模式233")


    listModel().then(function (data) {
        console.log("配置加载成功", data);
        var pets = Object.keys(data)
        var p = document.createElement('p')
        p.append(createElement('option', {
            value: '--请选择--',
            selected: localStorage.getItem('lastModel') === null
        }))
        for (var i = 0; i < pets.length; i++) {
            p.append(createElement('option', {
                value: pets[i],
                selected: localStorage.getItem('lastModel') === JSON.stringify({
                    type: pets[i]["model_type"] === 1 ? "spine" : "live2d",
                    modelId: pets[i]
                })
            }))
        }
        var selector = document.getElementById("pets")
        selector.innerHTML = p.innerHTML
        selector.addEventListener('change', function (e) {
            var modelName = e.target.value
            if (modelName === '--请选择--') {
                return
            }
            if (pets[modelName]) {
                saveCurrentPet(pets[modelName], modelName)
                window.location.reload()
            }
        })
        // 加载场景
    }).catch(function (error) {
        console.log("加载配置失败", error)
    })
})()
