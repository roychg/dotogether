import shortid from 'shortid'

export const getFirstLetter = value => value.substr(0,1).toUpperCase()
export const generateId = () => shortid.generate()


export const isEmpty = val => val.trim() === ''
const isChanged = (a,b) => a === b


export const isValid = (newValue, originalValue) => {
  let isValid = false

  if (!isEmpty(newValue) && !isChanged(newValue, originalValue)) {
    isValid = true;
  }

  return isValid
}