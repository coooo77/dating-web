const photoWidth = 350, photoHeight = 100

/**
* @param  {Number} num query param
* @return {String} photo URL
* @public
**/

function getRandomPhoto(num) {
  return `https://picsum.photos/${photoWidth}/${photoHeight}?random=${num}`
}

export default getRandomPhoto