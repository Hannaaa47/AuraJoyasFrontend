export async function enviarCorreoContacto({ nombre, correo, mensaje }) {
  const res = await fetch('https://aurajoyasbackend.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo, mensaje })
  })
  return await res.json()
}