document.addEventListener('DOMContentLoaded', function() {
  const longitudSlider = document.getElementById('longitud');
  const longitudValue = document.getElementById('longitudValue');
  const mayusculascheckbox = document.getElementById('mayusculas');
  const minusculascheckbox = document.getElementById('minusculas');
  const numeroscheckbox = document.getElementById('numeros');
  const simboloscheckbox = document.getElementById('simbolos');
  const generarBoton = document.getElementById('generarBtn');
  const inputContraseña = document.getElementById('password');
  const copiarBoton = document.getElementById('copiarBtn');

  const clipboard = new ClipboardJS('#copiarBtn', {
    text: function() {
      return inputContraseña.value;
    }
  });

  function generarContraseña() {
    const longitud = parseInt(longitudSlider.value);
    const incluirMayusculas = mayusculascheckbox.checked;
    const incluirMinusculas = minusculascheckbox.checked;
    const incluirNumeros = numeroscheckbox.checked;
    const incluirSimbolos = simboloscheckbox.checked;

    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMayusculas = letrasMinusculas.toLocaleUpperCase();
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?'

    let caracteresValidos = "";
    if (incluirMinusculas) caracteresValidos += letrasMinusculas;
    if (incluirMayusculas) caracteresValidos += letrasMayusculas;
    if (incluirNumeros) caracteresValidos += numeros;
    if (incluirSimbolos) caracteresValidos += simbolos;

    let contraseña = "";

    for (let i = 0; i < longitud; i++) {
      const index = Math.floor(Math.random() * caracteresValidos.length);
      contraseña += caracteresValidos[index];
    }
    return contraseña;
  }
  function actualizarValorLongitud() {
    longitudValue.textContent = longitudSlider.value;
  }

  clipboard.on('success', function(e) {
    copiarBoton.innerHTML = '<i class="ri-checkbox-circle-fill"></i> Copiado!'
    setTimeout(function() {
      copiarBoton.innerHTML = '<i class="ri-clipboard-fill"></i> Copiar';
    }, 3000);
  });

  generarBoton.addEventListener('click', function() {
    const contraseña = generarContraseña();
    inputContraseña.value = contraseña;
  })

  longitudSlider.addEventListener('input', actualizarValorLongitud);

  actualizarValorLongitud()
})