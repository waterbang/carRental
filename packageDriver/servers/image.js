const chooseImage = (_this) => {
    let images = '';
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 指定只能为压缩图，首先进行一次默认压缩
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: photo => {
                //将tempFilePaths[0]加入到images数组 作为展示
                images = (photo.tempFilePaths[0])
                //-----返回选定照片的本地文件路径列表，获取照片信息-----------
                wx.getImageInfo({
                    src: photo.tempFilePaths[0],
                    success: res => {
                        //---------利用canvas压缩图片--------------
                        var ratio = 2;
                        var canvasWidth = res.width //图片原始长宽
                        var canvasHeight = res.height
                        while (canvasWidth > 400 || canvasHeight > 400) { // 保证宽高在400以内
                            canvasWidth = Math.trunc(res.width / ratio)
                            canvasHeight = Math.trunc(res.height / ratio)
                            ratio++;
                        }
                        _this.setData({
                            cWidth: canvasWidth,
                            cHeight: canvasHeight
                        })

                        //----------绘制图形并取出图片路径--------------
                        var ctx = wx.createCanvasContext('canvas')
                        ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight)
                        ctx.draw(false, setTimeout(function () {
                            wx.canvasToTempFilePath({
                                canvasId: 'canvas',
                                fileType: 'png',
                                destWidth: canvasWidth,
                                destHeight: canvasHeight,
                                success: res => {
                                    // console.log(res.tempFilePath) //最终图片路径
                                    let path = res.tempFilePath
                                    let arr = path.split('.');
                                    let list ='';
                                    //获取图片类型
                                    //list.imageType = '.' + arr[arr.length - 1];
                                    //对图片进行base64 获取base64Code
                                    list = wx.getFileSystemManager().readFileSync(path, 'base64');
                                    //将list加入到imageList数组中 作为后台接口参数
                                    resolve({images, base64Img:'data:image/jpeg;base64,'+list});
                                },
                                fail: res => {
                                    reject(res);
                                    console.log(res.errMsg)
                                }
                            })
                        }, 100))
                    }, //留一定的时间绘制canvas
                    fail: res => {
                        reject(res);
                        console.log(res.errMsg)
                    }
                })
            }
        })
    })
}

const Choose2DImage = (_this) => {
    return new Promise((resolve, reject) => {
        wx.getSystemInfo({
            success: res => {
                let windowWidth = res.windowWidth;
                // 获取图片信息
                wx.getImageInfo({
                    src: _this.data.imgPath,
                    success: res => {
                        // 比例
                        var scale = 1;
                        if (res.width > windowWidth) {
                            scale = windowWidth / res.width;
                        }
                        console.log(scale);
                        // 宽
                        let imgWidth = res.width * scale;
                        // 高
                        let imgHeight = res.height * scale;
                        //设置canvas标签宽高
                        _this.setData({
                            canvasWidth: imgWidth,
                            canvasHeight: imgHeight
                        })
                        //获取canvas-----------------------------------------
                        const query = wx.createSelectorQuery();
                        query.select('#canvas').fields({
                            node: true,
                            size: true
                        }).exec(async res => {
                            const canvas = res[0].node;
                            canvas.width = imgWidth;
                            canvas.height = imgHeight;
                            //2d画布
                            const ctx = canvas.getContext('2d');
                            //创建图片
                            const mainImg = canvas.createImage();
                            mainImg.src = _this.data.imgPath;
                            const mainImgs = await new Promise((resolve, reject) => {
                                mainImg.onload = () => resolve(mainImg);
                                mainImg.onerror = (e) => reject(e);
                            });
                            // 绘制图像到画布
                            ctx.drawImage(mainImgs, 0, 0, imgWidth, imgHeight);
                            let base64 = canvas.toDataURL('image/jpeg', 0.9).replace('data:image/jpeg;base64,', "");
                            resolve(base64);
                        })
                    },
                    fail: err => {
                       reject(err)
                    }
                })
            }
        })
        
    })
}

module.exports = {
    chooseImage,
    Choose2DImage
}