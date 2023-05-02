import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'apisauce';

export const baseUrl = `https://yeaksa.phsartech.com/api/supplier/`;
export const shortBaseUrl = 'https://yeaksa.phsartech.com/api/'
export const api = {
  Get: async (route_name: string) => {
    let token = await AsyncStorage.getItem('@token');
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    return new Promise(async (resolve, reject) => {
      try {
        apiSauce.get(route_name).then(response => {
          resolve(response.data);
        });
      } catch (error) {
        console.log(`Request URL : ${baseUrl}${route_name}`);
        reject(error);
        console.log('error=====', error);
      }
    });
  },
  POST: async (end_point: any, object?: any) => {
    let token = await AsyncStorage.getItem('@token');
    const apiSauce = create({
      baseURL: baseUrl,
      headers: {
        'Cache-Control': 'no-cache',
        Accept: 'application/json',
        // 'Content-Type':'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });
    return new Promise(async (resolve, reject) => {
      try {
        apiSauce.post(end_point, object).then((response: any) => {
          resolve(response.data);
        });
      } catch (error) {
        console.log(`Request URL : ${baseUrl}${end_point}`);
        console.log('error===', error);
        reject(error);
      }
    });
  },
};
