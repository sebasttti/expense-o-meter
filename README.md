# 💰 Mis Gastos

Aplicación web sencilla para registrar y llevar trazabilidad de gastos personales.

La aplicación permite registrar gastos indicando la fecha, el valor y una observación. Los datos se almacenan localmente en el navegador mediante `localStorage`, por lo que no requiere un backend ni una base de datos.

## ✨ Características

* 📅 Registro de gastos por fecha.
* 💰 Registro del valor del gasto.
* 📝 Observación asociada a cada gasto.
* 📊 Visualización del total gastado.
* 🔢 Cantidad de gastos registrados.
* 📆 Visualización de los gastos correspondientes al mes actual.
* ↕️ Ordenamiento de los gastos del más reciente al más antiguo.
* 🗑️ Eliminación de gastos.
* 💾 Persistencia mediante `localStorage`.
* 🌙 Soporte para modo oscuro automático según la configuración del sistema.
* 📱 Diseño responsive.
* 🙏 Sección de agradecimientos mediante un modal.

## 🛠️ Tecnologías

El proyecto está construido utilizando tecnologías web estándar:

* HTML5
* JavaScript
* Tailwind CSS
* Alpine.js
* LocalStorage

No requiere instalación de dependencias ni servidor para funcionar.

## 📂 Estructura

```text
mis-gastos/
│
├── index.html
├── favicon.png
└── README.md
```

## 🚀 Uso

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresa al directorio:

```bash
cd mis-gastos
```

Abre `index.html` directamente en el navegador.

También puedes utilizar cualquier servidor HTTP local.

Por ejemplo, utilizando PHP:

```bash
php -S localhost:8000
```

Y posteriormente acceder a:

```text
http://localhost:8000
```

## 💾 Almacenamiento

Los gastos se almacenan utilizando `localStorage`.

Esto significa que:

* Los datos permanecen guardados después de cerrar el navegador.
* No se requiere conexión con un servidor.
* Los datos pertenecen al navegador y dispositivo donde fueron registrados.
* Si se limpia el almacenamiento del navegador, los gastos pueden perderse.
* Los gastos no se sincronizan automáticamente entre dispositivos.

Los registros se almacenan bajo la clave:

```javascript
expenses
```

Cada gasto tiene una estructura similar a:

```json
{
    "id": 1756650000000,
    "date": "2026-08-31",
    "amount": 25000,
    "observation": "Almuerzo"
}
```

## 📆 Gastos del mes actual

La aplicación filtra automáticamente los gastos para mostrar únicamente los correspondientes al mes y año actuales.

Por ejemplo, durante agosto de 2026 se mostrarán registros como:

```text
2026-08-01
2026-08-15
2026-08-31
```

Mientras que registros de julio o septiembre no aparecerán en la vista actual.

Los gastos históricos permanecen almacenados en `localStorage`.

## 🌙 Modo oscuro

La aplicación utiliza la preferencia de apariencia configurada en el sistema operativo mediante:

```css
@media (prefers-color-scheme: dark)
```

El usuario no necesita activar manualmente el modo oscuro.

## 🔐 Seguridad

Actualmente la aplicación funciona completamente en el navegador.

No existe autenticación ni servidor, por lo que los datos no se envían a ningún servicio externo.

La aplicación está pensada inicialmente como una herramienta personal de control de gastos.

## 🔮 Próximas mejoras

Algunas funcionalidades que podrían incorporarse posteriormente:

* [ ] Categorías de gastos.
* [ ] Filtros por rango de fechas.
* [ ] Presupuesto mensual.
* [ ] Comparación entre meses.
* [ ] Gráficos de gastos.
* [ ] Exportación a CSV.
* [ ] Exportación a Excel.
* [ ] Importación de gastos.
* [ ] Gastos recurrentes.
* [ ] Resumen mensual.
* [ ] Instalación como PWA.
* [ ] Backend y base de datos.
* [ ] Sincronización entre dispositivos.
* [ ] Autenticación de usuarios.

## 🙏 Créditos

Diseño y recursos utilizados en el proyecto:

**designed by juicy_fish - Magnific.com**

## 📄 Licencia

Este proyecto es de uso personal y experimental.
