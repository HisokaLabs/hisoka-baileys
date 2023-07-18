import config from "../config.js"

import axios from 'axios'
import FormData from 'form-data'


export default class API {
   constructor(name, options) {
      this.name = name
      this.URI = (name in config.APIs) ? config.APIs[name].baseURL : name

      this.create = axios.create({
         baseURL: this.URI,
         timeout: 60000,
         headers: options?.headers ? options.headers : {},
         ...options
      })
   }

   async get(path = '/', query = {}, apikey, options = {}) {
      try {
         const res = await this.create.get(path, {
            params: (query || apikey) ? new URLSearchParams(Object.entries({ ...query, ...(apikey ? { [apikey]: config.APIs[this.name].Key } : {}) })) : '',
            ...options
         })
   
         return res.data
      } catch {
         return { status: 400 }
      }
   }

   async post(path = '', data = {}, apikey, options = {}) {
      try {
         if (!!data) {
            const form = new FormData()
   
            for (let key in data) {
               let valueKey = data[key]
               form.append(key, valueKey)
            }
   
            const res = await this.create.post(path + new URLSearchParams(Object.entries({ ...(apikey ? { [apikey]: config.APIs[this.name].Key } : {}) })), form, { ...options })
   
            return res.data
         } else {
            return { status: 400 }
         }
      } catch {
         return { status: 400 }
      }
   }
}