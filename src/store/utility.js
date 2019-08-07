export const updatedObject = (object, updatedProps) => {
  return {
    ...object,
    ...updatedProps
  }
}