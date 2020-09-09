import API from '../config/api';
import {post} from '../utils/request'

//获取分类页面列表数据
const getTypeList = () => post(API.CLASSIFY_TYPE).then(res => {return res.data;}).catch(err => {return err})


//获取具体分类数据
const getTypeData = (id) => post(API.CLASSIFY_TYPE_DATA,{id}).then(res => {return res.data;}).catch(err => {return err})

module.exports = {
  getTypeList,
  getTypeData
}