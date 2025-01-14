
// Esperamos a que el DOM se haya cargado completamente antes de ejecutar el código

document.addEventListener('DOMContentLoaded', function() {

  // Obtener elementos del DOM
  const longitudSlider = document.getElementById('longitud');
  const longitudValue = document.getElementById('longitudValue');
  const mayusculascheckbox = document.getElementById('mayusculas');
  const minusculascheckbox = document.getElementById('minusculas');
  const numeroscheckbox = document.getElementById('numeros');
  const simboloscheckbox = document.getElementById('simbolos');
  const generarBoton = document.getElementById('generarBtn');
  const inputContraseña = document.getElementById('password');
  const copiarBoton = document.getElementById('copiarBtn');

  // Inicializamos ClipboardJS para copiar la contraseña al portapapeles
  const clipboard = new ClipboardJS('#copiarBtn', {
    text: function() {
      return inputContraseña.value;
    }
  });

  // Función para generar una contraseña aleatoria
  function generarContraseña() {
    // Obtener la longitud seleccionada del slider
    const longitud = parseInt(longitudSlider.value);
    // Obtener los valores de los checkboxes (si están marcados o no)
    const incluirMayusculas = mayusculascheckbox.checked;
    const incluirMinusculas = minusculascheckbox.checked;
    const incluirNumeros = numeroscheckbox.checked;
    const incluirSimbolos = simboloscheckbox.checked;

    // Definir los caracteres posibles para cada tipo de elemento
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMayusculas = letrasMinusculas.toLocaleUpperCase();
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?'

    // Crear una cadena de caracteres válidos según las opciones seleccionadas
    let caracteresValidos = "";
    if (incluirMinusculas) caracteresValidos += letrasMinusculas;
    if (incluirMayusculas) caracteresValidos += letrasMayusculas;
    if (incluirNumeros) caracteresValidos += numeros;
    if (incluirSimbolos) caracteresValidos += simbolos;

    // Generar la contraseña aleatoria
    let contraseña = "";

    for (let i = 0; i < longitud; i++) {
      const index = Math.floor(Math.random() * caracteresValidos.length);// Obtener un índice aleatorio
      contraseña += caracteresValidos[index]; // Añadir el carácter correspondiente al índice aleatorio
    }
    return contraseña;
  }

  // Función para actualizar el valor mostrado en el slider de longitud
  function actualizarValorLongitud() {
    longitudValue.textContent = longitudSlider.value;
  }

  // Evento para copiar la contraseña al portapapeles cuando se hace clic en el botón "Copiar"
  clipboard.on('success', function(e) {
    copiarBoton.innerHTML = '<i class="ri-checkbox-circle-fill"></i> Copiado!'
    setTimeout(function() {
      copiarBoton.innerHTML = '<i class="ri-clipboard-fill"></i> Copiar';
    }, 3000);
  });

  // Evento para generar una nueva contraseña al hacer clic en el botón "Generar Contraseña"
  generarBoton.addEventListener('click', function() {
    const contraseña = generarContraseña(); // Generar la contraseña
    inputContraseña.value = contraseña; // Mostrar la contraseña generada en el input
  })

  // Evento para actualizar el valor del slider cada vez que se mueve el slider
  longitudSlider.addEventListener('input', actualizarValorLongitud);

  // Llamar a la función para inicializar el valor mostrado del slider al cargar la página
  actualizarValorLongitud();
})