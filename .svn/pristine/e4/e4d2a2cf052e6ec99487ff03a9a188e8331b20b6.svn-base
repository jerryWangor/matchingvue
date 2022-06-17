
export default () => {
	let token = localStorage.getItem("token"); // JWT token
    let socketUrl = "ws://10.0.17.46:20002/ws?token=" + token; // 连接地址
    let socket = null; // websocket实例
    let lockReconnect = false; // 重连锁
    let timerId = null;  // 定时函数ID
	let onMessageList = new Map(); // 注入的消息回调列表

    const createSocket = () => {
        try {
			if(token == null) {
				console.log("websokcet连接失败，请先登录！")
				return 
			}
			if(socket != null) {
				console.log("WebSocket:已连接");
				return socket;
			}
            socket = new WebSocket(socketUrl);
            init();
        } catch (e) {
            console.log("catch" + e)
            reconnect()
        }

		return socket;
    }

    const reconnect = () => {
        if (lockReconnect) return;
        lockReconnect = true;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            createSocket();
        }, 4000);
    }

    const init = () => {

		socket.reconnect  = function (event) {
            reconnect()
        };

        socket.onopen = function (event) {
            console.log("WebSocket:已连接");
            //心跳检测重置
            // heartCheck.reset().start();
        };

        //接收到消息的回调方法
        socket.onmessage = function (event) {

            let msg = null;
            try {
                msg = JSON.parse(event.data);
            } catch (error) {
                console.log("onmessage", error);
                return false;
            }

            // 判断是否是心跳
            // const isHeart = /pong/.test(event.data)
			// if(isHeart) {
			// 	return
			// }

            let uuid = msg.uuid;
            if (uuid && onMessageList.has(uuid)) {
                onMessageList.get(uuid)(msg);
                onMessageList.delete(uuid);
            }

            // 如果没有回调函数就打印返回消息
            console.log("返回消息", msg)
			
			// 循环所有注入的消息列表
			// onMessageList.forEach(f => {
			// 	f.call(null, event);
			// })

            // 开启心跳检测
            // heartCheck.reset().start();
        };

		// 发送消息
		socket.sendCustomMsg = function (msg, callback) {
            
            if(socket == null) return false
            try {
                let message = '';
                if (typeof msg == 'object') {
                    if (!msg.hasOwnProperty('uuid')) {
                        msg.uuid = GetUUID();
                    }
                    message = JSON.stringify(msg);
                }
                callback && typeof (callback) == 'function' && onMessageList.set(msg.uuid, callback);
                console.log("发送消息：", message)
                socket.send(message);
            } catch (error) {
                console.log("消息发送失败", error);
            }
		}

        //连接发生错误的回调方法
        socket.onerror = function (event) {
            console.log("WebSocket:发生错误");
			socket = null;
            reconnect();
        };

        //连接关闭的回调方法
        socket.onclose = function (event) {
            console.log("WebSocket:已关闭");
			socket = null;
            // heartCheck.reset();//心跳检测
            reconnect();
        };

		// // 注入消息
		// socket.addMessageList = (key, messageFunc) => {
		// 	if(socket == null) return false
		// 	// 判断是否在消息函数中
		// 	if(onMessageList.has(key)) {
		// 		console.log(key + "消息函数已经注入了")
		// 	} else {
		// 		onMessageList.set(key, messageFunc)
		// 		console.log(key + "消息函数注入成功")
		// 		console.log(onMessageList)
		// 	}
		// };

		// // 移除消息
		// socket.removeMessageList = (key) => {
		// 	if(socket == null) return false
		// 	if(onMessageList.has(key)) {
		// 		console.log(key + "消息函数删除成功")
		// 		return onMessageList.delete(key)
		// 	} else {
		// 		console.log(key + "消息函数为找到")
		// 	}
		// };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            socket.close();
        };
    }

    const heartCheck = {
        timeout: 5000,
        timeoutObj: setTimeout(() => { }),
        serverTimeoutObj: setInterval(() => { }),
        reset: function () {
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function () {
            var self = this;
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            this.timeoutObj = setTimeout(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                socket.send(JSON.stringify({
                    "action": "ping"
                }));
                console.log('ping');
                self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
                    console.log('关闭服务');
                    socket.close();//如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        }
    };

    const GetUUID = () => {
        let str = 'xxxxx-xxxx-xxxx-yxxx-xxxxxxx';
        return str.replace(/[xy]/g, item => {
            let r = Math.random() * 0x10 | 0;
            let v = item === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(0x10);
        });
    };

    return createSocket();
}
