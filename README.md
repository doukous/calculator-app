# Frontend Mentor - Calculator app solution

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- CSS Grid
- SCSS prepocessor
- Vanilla Javascript

### What I learned

I learn a lot about parsing algorithms while I'm trying to avoid using eval() javascript's function 

```css
.boutons {
  ...

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;

  ...
}
```
```js
const handleCalculation = () => {

  ...

  const resultList = []
  let operator = ''

  for (let value of operationsValueList) {
      if (['/', 'x'].includes(value)) {
          operator = value
      }

      else if (!['/', 'x'].includes(value) && operator !== '') {
          switch (operator) {
              case ('/') : {

                  if (value === '0') {
                      screenNumberValue = ''
                      operationsValueList = []
                      screenEl.innerHTML = '<p></p>'

                      return alert('MathError : Division By Zero')
                  }

                  resultList[resultList.length -1] = parseFloat(resultList.at(-1)) / 
                  parseFloat(value)
                  break 
              }

              case ('x') : {
                  resultList[resultList.length -1] = parseFloat(resultList.at(-1)) * 
                  parseFloat(value)
                  break
              }
          }

          operator = ''
      }

      else if (['+', '-'].includes(value)) {
          resultList.push(value)
      }

      else {
          resultList.push(parseFloat(value))
      }
  }

  let finalResult = 0

  for (let value of resultList) {
      if (['+', '-'].includes(value)) {
          operator = value
      }

      else if (!['+', '-'].includes(value) && operator !== '') {
          switch (operator) {
              case ('+') : {
                  finalResult += parseFloat(value)
                  break 
              }

              case ('-') : {
                  finalResult -= parseFloat(value)
                  break
              }
          }

          operator = ''
      }

      else {
          finalResult = value
      }
  }

  ...
}

```

### Continued development

I find that I am as comfortable that I thought for algorithms and Data Structures while building the calculator algorithm. I will definitely work on this. 

### Useful resources

- [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - This helped me for finding and understanding javascript functions I used.

## Author

- Frontend Mentor - [@doukouss](https://www.frontendmentor.io/profile/doukous)

