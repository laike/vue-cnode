import { isObject } from 'util'

export function setLocalStorage(item, value) {
  if (isObject(value)) {
    // if is object use stringify parse object
    return localStorage.setItem(item, JSON.stringify(value))
  }
  return localStorage.setItem(item, value)
}

export function getLocalStorage(item) {
  // console.log(localStorage)
  // if is stringify parse is object return object
  if (isObject(JSON.parse(localStorage.getItem(item)))) {
    return JSON.parse(localStorage.getItem(item))
  }
  return localStorage.getItem(item)
}
