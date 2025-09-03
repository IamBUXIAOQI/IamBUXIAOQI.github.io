document.addEventListener('contextmenu', function (event) { // 监听右键菜单事件
    event.preventDefault(); // 阻止默认右键菜单行为
});

function handlePress(event) { // 定义处理按压事件的函数
    this.classList.add('pressed'); // 给当前元素添加pressed类
}

function handleRelease(event) { // 定义处理释放事件的函数
    this.classList.remove('pressed'); // 移除当前元素的pressed类
}

function handleCancel(event) { // 定义处理取消事件的函数
    this.classList.remove('pressed'); // 移除当前元素的pressed类
}

var buttons = document.querySelectorAll('.projectItem'); // 获取所有项目项元素

buttons.forEach(function (button) { // 遍历每个项目项元素
    button.addEventListener('mousedown', handlePress); // 添加鼠标按下事件监听器
    button.addEventListener('mouseup', handleRelease); // 添加鼠标释放事件监听器
    button.addEventListener('mouseleave', handleCancel); // 添加鼠标离开事件监听器
    button.addEventListener('touchstart', handlePress); // 添加触摸开始事件监听器
    button.addEventListener('touchend', handleRelease); // 添加触摸结束事件监听器
    button.addEventListener('touchcancel', handleCancel); // 添加触摸取消事件监听器
});

function toggleClass(selector, className) { // 定义切换类的函数
    var elements = document.querySelectorAll(selector); // 获取所有匹配选择器的元素
    elements.forEach(function (element) { // 遍历每个元素
        element.classList.toggle(className); // 切换元素的指定类
    });
}

function pop(imageURL) { // 定义弹窗函数
    var tcMainElement = document.querySelector(".popup-img"); // 获取弹窗图片元素
    if (imageURL) { // 如果提供了图片URL
        tcMainElement.src = imageURL; // 设置弹窗图片的源
    }
    toggleClass(".popup-main", "active"); // 切换弹窗主体的active类
    toggleClass(".popup-container", "active"); // 切换弹窗容器的active类
}

var tc = document.getElementsByClassName('popup-container'); // 获取弹窗容器元素
var tc_main = document.getElementsByClassName('popup-main'); // 获取弹窗主体元素
tc[0].addEventListener('click', function (event) { // 为弹窗容器添加点击事件监听器
    pop(); // 调用弹窗函数（关闭弹窗）
});
tc_main[0].addEventListener('click', function (event) { // 为弹窗主体添加点击事件监听器
    event.stopPropagation(); // 阻止事件冒泡
});



function setCookie(name, value, days) { // 定义设置Cookie的函数
    var expires = ""; // 初始化过期时间字符串
    if (days) { // 如果提供了天数
        var date = new Date(); // 创建当前日期对象
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 设置过期时间
        expires = "; expires=" + date.toUTCString(); // 格式化过期时间字符串
    }
    document.cookie = name + "=" + value + expires + "; path=/"; // 设置Cookie
}

function getCookie(name) { // 定义获取Cookie的函数
    var nameEQ = name + "="; // 构造名称等式字符串
    var cookies = document.cookie.split(';'); // 分割Cookie字符串为数组
    for (var i = 0; i < cookies.length; i++) { // 遍历Cookie数组
        var cookie = cookies[i]; // 获取当前Cookie
        while (cookie.charAt(0) == ' ') { // 如果当前Cookie开头有空格
            cookie = cookie.substring(1, cookie.length); // 去除开头空格
        }
        if (cookie.indexOf(nameEQ) == 0) { // 如果当前Cookie包含指定名称
            return cookie.substring(nameEQ.length, cookie.length); // 返回Cookie值
        }
    }
    return null; // 如果未找到匹配的Cookie，返回null
}















document.addEventListener('DOMContentLoaded', function () { // DOM内容加载完成后执行的函数






    var html = document.querySelector('html'); // 获取HTML元素
    var themeState = getCookie("themeState") || "Light"; // 获取主题状态Cookie，如果不存在则默认为"Light"
    var snakeTheme = document.getElementById("snake-theme"); // 获取贪吃蛇图片元素




    function changeTheme(theme) { // 定义更改主题的函数
        snakeTheme.src = "./static/svg/snake-" + theme + ".svg"; // 更改贪吃蛇图片源
        html.dataset.theme = theme; // 设置HTML元素的data-theme属性
        setCookie("themeState", theme, 365); // 设置主题状态Cookie，有效期365天
        themeState = theme; // 更新主题状态变量
    }






    var Checkbox = document.getElementById('myonoffswitch') // 获取主题切换开关元素
    Checkbox.addEventListener('change', function () { // 为主题切换开关添加更改事件监听器
        if (themeState == "Dark") { // 如果当前主题是Dark
            changeTheme("Light"); // 切换到Light主题
        } else if (themeState == "Light") { // 如果当前主题是Light
            changeTheme("Dark"); // 切换到Dark主题
        } else { // 其他情况
            changeTheme("Dark"); // 切换到Dark主题
        }
    });



    if (themeState == "Dark") { // 如果主题状态是Dark
        Checkbox.checked = false; // 设置开关为未选中状态
    }

    changeTheme(themeState); // 应用当前主题









    var fpsElement = document.createElement('div'); // 创建FPS显示元素
    fpsElement.id = 'fps'; // 设置元素ID
    fpsElement.style.zIndex = '10000'; // 设置元素层级
    fpsElement.style.position = 'fixed'; // 设置元素定位方式
    fpsElement.style.left = '0'; // 设置元素左边距
    document.body.insertBefore(fpsElement, document.body.firstChild); // 将FPS元素插入到body的第一个子元素前

    var showFPS = (function () { // 定义显示FPS的函数（立即执行函数）
        var requestAnimationFrame = window.requestAnimationFrame || // 获取requestAnimationFrame函数
            window.webkitRequestAnimationFrame || // Webkit内核浏览器版本
            window.mozRequestAnimationFrame || // Mozilla浏览器版本
            window.oRequestAnimationFrame || // Opera浏览器版本
            window.msRequestAnimationFrame || // IE浏览器版本
            function (callback) { // 如果都不支持，则使用setTimeout
                window.setTimeout(callback, 1000 / 60); // 以60FPS的速度执行回调
            };

        var fps = 0, // 初始化FPS计数器
            last = Date.now(), // 获取初始时间
            offset, step, appendFps; // 声明其他变量

        step = function () { // 定义每一步的函数
            offset = Date.now() - last; // 计算时间差
            fps += 1; // FPS计数器加1

            if (offset >= 1000) { // 如果时间差大于等于1000毫秒（1秒）
                last += offset; // 更新上次时间
                appendFps(fps); // 显示FPS
                fps = 0; // 重置FPS计数器
            }

            requestAnimationFrame(step); // 请求下一帧动画
        };

        appendFps = function (fpsValue) { // 定义显示FPS值的函数
            fpsElement.textContent = 'FPS: ' + fpsValue; // 设置FPS元素的文本内容
        };

        step(); // 开始执行
    })();



    //pop('./static/img/tz.jpg') // 被注释掉的弹窗调用



});




var pageLoading = document.querySelector("#page-loading"); // 获取页面加载动画元素
window.addEventListener('load', function () { // 监听窗口加载事件
    setTimeout(function () { // 设置延迟
        pageLoading.style.opacity = '0'; // 将加载动画元素的不透明度设为0（淡出效果）
    }, 100); // 延迟100毫秒
});