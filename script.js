let screenNumberValue = ''
let operationsValueList = []
const operatorsSymbolList = ['x', '+', '-', '/']

const acceptedKeyboardKeyList = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '0', '.', '+',
    '-','*', '/','Backspace', 'Enter', 'Delete'
]

const handleScreenUpdate = (newValue) => {

    if (newValue == 'delete' && screenNumberValue != '') {
        screenNumberValue = screenNumberValue.slice(0, -1)
    }

    else if (newValue == 'delete' && screenNumberValue == '') {
        operationsValueList.pop()

        if (operationsValueList.at(-1) != undefined) {
            const currentValue = operationsValueList.at(-1)
            operationsValueList.pop()
            screenNumberValue = currentValue
        }
    }
    
    else if ((!operatorsSymbolList.includes(newValue) && operationsValueList.length == 0) 
    || 
    (!operatorsSymbolList.includes(newValue) &&
    operatorsSymbolList.includes(operationsValueList.at(-1)))) {
        if (screenNumberValue == '0') {
            screenNumberValue = newValue
        }

        else {
            screenNumberValue += newValue
        }
    }

    else if (operatorsSymbolList.includes(newValue) && screenNumberValue != '') {
        operationsValueList.push(screenNumberValue, newValue)
        screenNumberValue = ''  
    }

    else if (operatorsSymbolList.includes(newValue) && screenNumberValue == '') {
        operationsValueList.push(newValue)
    }

    screenEl.innerHTML = '<p>' + operationsValueList.join(' ') + ' ' + screenNumberValue + '</p>'
    screenEl.firstChild.scrollLeft = screenEl.firstChild.scrollWidth
}

const handleCalculation = () => {

    if (screenNumberValue != '') {
        operationsValueList.push(screenNumberValue)
    }

    let numberCount = 0
    let operatorCount = 0
    
    for (let value of operationsValueList) {
        if (operatorsSymbolList.includes(value)) {
            operatorCount++
        }
        
        else {
            numberCount++
        }
    }

    if (numberCount <= operatorCount) {
        screenNumberValue = ''
        operationsValueList = []
        screenEl.innerHTML = '<p></p>'

        return alert('SyntaxError : Impossible to make this calculation')
    }

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

    screenNumberValue = ''
    operationsValueList = []

    if (Number.isFinite(finalResult)) {
        handleScreenUpdate(finalResult.toString())
        screenEl.firstChild.scrollLeft = 0
    }

    else {
        screenEl.innerHTML = '<p></p>'
        return alert('SyntaxError : Impossible to do this calculation.')
    }
}

const handleKeyboardClick = (keyboardKey) => {
    if (acceptedKeyboardKeyList.includes(keyboardKey)) {
        
        switch (keyboardKey) {
            case ('*') : {
                handleScreenUpdate('x')
                break
            }

            case ('Enter') : {
                handleCalculation()
                break
            }

            case ('Delete') : {
                screenNumberValue = '';
                screenEl. innerHTML = '<p></p>'
                operationsValueList = [];
                break
            }

            case('Backspace') : {
                handleScreenUpdate('delete')
                break
            }

            default : {
                handleScreenUpdate(keyboardKey)
                break
            }
        }        
    }
}

const numberNode = document.querySelectorAll('.number')
numberNode.forEach(
    numberEl => {
        numberEl.addEventListener('click', 
        evt => handleScreenUpdate(evt.target.innerText))
    }    
)

const equalEl = document.getElementById('equal')
equalEl.addEventListener('click', handleCalculation)

const screenEl = document.querySelector('.screen')

const resetEl = document.getElementById('reset')
resetEl.addEventListener('click', evt => {
    screenNumberValue = '';
    screenEl.innerHTML = '<p></p>'
    operationsValueList = [];
})

const deleteEl = document.getElementById('delete')
deleteEl.addEventListener('click', (evt) => handleScreenUpdate('delete'))

document.addEventListener('keydown', (evt) => handleKeyboardClick(evt.key))

const inputIdList = ["theme-1", "theme-2", "theme-3"];

const inputElList = document.querySelectorAll("input")
inputElList.forEach( 
    inputEl => {
    inputEl.addEventListener('click', evt => {
    inputEl.parentNode.classList.remove(...inputIdList)
    inputEl.parentNode.classList.add(evt.target.id)

    const calcEl = document.querySelector('.calculator')
    calcEl.classList.remove(...inputIdList) 
    calcEl.classList.add(evt.target.id)
    })
})