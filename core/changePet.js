(function() {
    var BASE_URL = 'https://gcb384076498.github.io/SwyYunmuWikiDeskPet'



    function listModel() {
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
                resolve(Object.keys(dataJson))
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

    if (!localStorage.getItem('test')) {
        console.log("非测试模式233")
        return;
    }
    console.log("测试模式233")


    listModel().then(function (data) {
        console.log("配置加载成功", data);
        var p = document.createElement('p')
        p.append(createElement('option', {
            value: '--请选择--',
            selected: 'selected'
        }))
        for (var i = 0; i < data.length; i++) {
            p.append(createElement('option', {
                value: data[i],
                selected: 'selected'
            }))
        }


        // 加载场景
    }).catch(function (error) {
        console.log("加载配置失败", error)
    })
})()
