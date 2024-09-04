document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  const buttons = Array.from(document.getElementsByClassName('calculatorButtons'));

  let currentInput = '';
  let previousInput = '';
  let operation = '';

  buttons.map(button => {
      button.addEventListener('click', (e) => {
          const value = e.target.value;

          if (value === 'C') {
              // Limpa o display
              currentInput = '';
              previousInput = '';
              operation = '';
              display.value = '';
          } else if (value === 'CE') {
              // Deleta o último dígito
              currentInput = currentInput.slice(0, -1);
              display.value = currentInput;
          } else if (value === '=') {
              // Calcula o resultado
              if (currentInput && previousInput && operation) {
                  try {
                      display.value = eval(`${previousInput}${operation}${currentInput}`);
                      currentInput = display.value;
                      previousInput = '';
                      operation = '';
                  } catch (error) {
                      display.value = 'Error';
                  }
              }
          } else if (['/', '*', '-', '+'].includes(value)) {
              // Define a operação e armazena o número atual
              if (currentInput) {
                  previousInput = currentInput;
                  currentInput = '';
                  operation = value;
              }
          } else {
              // Adiciona números e ponto ao display
              currentInput += value;
              display.value = currentInput;
          }
      });
  });
});
