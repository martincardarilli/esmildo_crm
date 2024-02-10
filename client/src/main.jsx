import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'regenerator-runtime/runtime';

ReactDOM.createRoot(document.getElementById('root')).render(
 /* <React.StrictMode> */
    <App />
/*  </React.StrictMode> 

¿Qué hace el Modo Estricto de React?
Duplica los Ciclos de Vida: En el modo de desarrollo, el modo estricto puede hacer que ciertos métodos de ciclo de vida se llamen dos veces. Esto está diseñado para ayudar a encontrar efectos secundarios inesperados (por ejemplo, en componentDidMount y componentWillUnmount).

Duplica las Llamadas a Funciones de Estado y Efectos: Similar a lo anterior, las llamadas a useState y useEffect también pueden ejecutarse más de una vez para identificar problemas potenciales.

¿Qué Hacer al Respecto?
Entender su Propósito: Recuerda que el modo estricto está ahí para ayudarte durante el desarrollo. No tiene impacto en el comportamiento de tu aplicación en producción.

Desactivar Temporalmente para Pruebas: Si las solicitudes duplicadas están dificultando tu trabajo o causando confusión, puedes desactivar temporalmente el modo estricto quitando el componente <React.StrictMode> de tu código. Sin embargo, es aconsejable usarlo durante el desarrollo para aprovechar sus beneficios.

Verificar Comportamiento en Producción: Si deseas confirmar que el problema es específico del modo de desarrollo, puedes construir y ejecutar tu aplicación en el modo de producción para ver si el comportamiento persiste.

Revisar tu Código: Aprovecha esta oportunidad para revisar tu código y asegurarte de que no hay efectos secundarios no deseados o dependencias innecesarias en tus hooks y componentes.


*/
)
