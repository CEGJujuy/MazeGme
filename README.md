# Juego de Laberinto

Un juego interactivo de laberinto desarrollado con HTML5 Canvas, CSS3 y JavaScript vanilla. El jugador debe navegar a través de diferentes niveles de laberintos para alcanzar la meta, con contadores de pasos y tiempo.

## 🎮 Características

- **3 Niveles Progresivos**: Laberintos de complejidad creciente
- **Control Dual**: Compatible con teclado y pantallas táctiles
- **Estadísticas en Tiempo Real**: Contador de pasos y cronómetro
- **Diseño Responsivo**: Adaptable a dispositivos móviles y escritorio
- **Vista Cenital**: Interfaz limpia y clara con el jugador como círculo morado y la meta en verde
- **Sistema de Niveles**: Progresa a través de múltiples laberintos
- **Reinicio Rápido**: Botón para reintentar el nivel actual en cualquier momento

## 🕹️ Controles

### Teclado
- **Flechas direccionales**: ↑ ↓ ← →
- **Teclas WASD**: W (arriba), S (abajo), A (izquierda), D (derecha)

### Pantalla Táctil
- **Deslizar**: Arrastra el dedo en la dirección deseada para mover al jugador

## 🚀 Cómo Jugar

1. Abre el archivo `index.html` en tu navegador web
2. Usa los controles para mover el círculo morado (jugador)
3. Navega por el laberinto evitando las paredes negras
4. Alcanza el círculo verde (meta) para completar el nivel
5. Observa tus estadísticas de pasos y tiempo
6. Presiona "Siguiente Nivel" para continuar o "Reiniciar" para volver a intentarlo

## 📁 Estructura del Proyecto

```
project/
│
├── index.html      # Estructura HTML del juego
├── style.css       # Estilos y diseño responsivo
├── game.js         # Lógica del juego y mecánicas
└── README.md       # Documentación del proyecto
```

## 🎨 Características Técnicas

- **Canvas HTML5**: Renderizado eficiente del laberinto y elementos del juego
- **JavaScript ES6+**: Código modular orientado a objetos
- **CSS3**: Gradientes, animaciones y diseño responsivo
- **Touch Events**: Soporte completo para gestos táctiles
- **Responsive Design**: Adaptación automática al tamaño de pantalla

## 🎯 Mecánicas del Juego

- **Sistema de Movimiento**: El jugador se mueve celda por celda en cuatro direcciones
- **Detección de Colisiones**: Las paredes bloquean el movimiento del jugador
- **Contador de Pasos**: Registra cada movimiento válido
- **Cronómetro**: Mide el tiempo desde el inicio del nivel hasta completarlo
- **Progresión**: Al completar un nivel, se desbloquea el siguiente
- **Almacenamiento Local**: Todos los niveles están definidos en variables JavaScript

## 🌟 Niveles

1. **Nivel 1**: Laberinto de 10x10 - Introducción básica
2. **Nivel 2**: Laberinto de 12x11 - Dificultad intermedia
3. **Nivel 3**: Laberinto de 14x13 - Desafío avanzado

## 👨‍💻 Autor

**Analista en Sistemas**
**González César Eduardo**

📧 Email: gonzalezeduardo_31@hotmail.com
📱 Teléfono: +54 3884 858 907

## 📄 Licencia

Proyecto desarrollado con fines educativos y de demostración.

---

*Desarrollado con HTML5, CSS3 y JavaScript*
