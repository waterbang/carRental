import API from '../config/api';
import {wxRequest} from '../utils/request'

// 获取推荐的车
const getRecommend = () => wxRequest(API.INDEX_RECOMMEND).then(res => {return res})

//获取推荐的二手🚗
const getUsedCar = () => wxRequest(API.INDEX_SECOND_HAND).then(res => {return res})