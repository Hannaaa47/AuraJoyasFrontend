export async function enviarCorreoContacto({ nombre, correo, mensaje }) {
  const res = await fetch('http://127.0.0.1:5000/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, mensaje })
  })
  return await res.json()
}