var BASE_URL = 'https://gcb384076498.github.io/SwyAssets'
var selector = document.getElementById("pets")
var changePet = document.getElementById("changePet")



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

function  createElement(tag, attrs, innerText) {
    var element = document.createElement(tag)
    for (var attr in attrs) {
        element.setAttribute(attr, attrs[attr])
    }
    element.innerText = innerText
    return element
}


function saveCurrentPet(config, modelName) {
    var configObj = {
        type: config["model_type"] === 1 ? "spine" : "live2d",
        modelId: modelName
    }
    localStorage.setItem('lastModel', JSON.stringify(configObj))
    console.log("保存成功", configObj)
    alert("保存成功")
}



(function() {

    if (!localStorage.getItem('test')) {
        console.log("非测试模式233")
        return;
    }
    console.log("测试模式233")

    var lastModel = localStorage.getItem('lastModel')
    console.log("lastModel", lastModel)
    listModel().then(function (data) {
        console.log("配置加载成功", data);
        var pets = Object.keys(data)
        var p = document.createElement('p')
        p.append(createElement('option', {
            value: null,
            selected: lastModel === null ? "selected" : null
        }, '--请选择--'))
        for (var i = 0; i < pets.length; i++) {
            p.append(createElement('option', {
                value: pets[i],
                selected: lastModel === JSON.stringify({
                    type: data[pets[i]]["model_type"] === 1 ? "spine" : "live2d",
                    modelId: pets[i]
                }) ? "selected" : null
            }, data[pets[i]]["name"]))
        }
        changePet.onclick = function() {
            var modelName = selector.value
            console.log("选择的模型是", modelName)
            if (modelName === '--请选择--') {
                return
            }
            if (data[modelName]) {
                saveCurrentPet(data[modelName], modelName)
                window.location.reload()
            }

        }
        selector.innerHTML = p.innerHTML
        // 加载场景
    }).catch(function (error) {
        console.log("加载配置失败", error)
    })


})()
