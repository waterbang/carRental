import API from '../config/api';
import {wxRequest} from '../utils/request'

//获取分类页面列表数据
const getTypeList = () => wxRequest(API.CLASSIFY_TYPE).then(res => {return res.data;})


//获取具体分类数据
const getTypeData = (id) => wxRequest(API.CLASSIFY_TYPE_DATA,{data: {id:id}}).then(res => {return res.data;})

module.exports = {
  getTypeList,
  getTypeData
}