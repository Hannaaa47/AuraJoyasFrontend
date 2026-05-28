import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
export const useSessionStore = defineStore('session', () =>{ 

    const nombreGuardado = localStorage.getItem('nombreUsuario')
    const planGuardado = localStorage.getItem('tipoPlan')
    const nombreUsuario = ref(nombreGuardado || 'Invitado')
    const autenticado = ref(sessionStorage.getItem('sesionActiva') === 'true')
    const tipoPlan = ref(planGuardado || 'Básico')

    const nombreBienvenida = computed(() => nombreUsuario.value)
    const esPremium = computed(() => tipoPlan.value === 'Premium')

    function iniciarSesion(nombre){
        nombreUsuario.value = nombre || 'Usuario'
        autenticado.value = true
        localStorage.setItem('nombreUsuario', nombreUsuario.value)
        sessionStorage.setItem('sesionActiva', 'true')
    }

    function cerrarSesion(){
        nombreUsuario.value = 'Invitado'
        autenticado.value = false
        localStorage.removeItem('nombreUsuario')
        sessionStorage.removeItem('sesionActiva')
    }

    function cambiarPlan(){
        tipoPlan.value = tipoPlan.value === 'Premium' ? 'Básico' : 'Premium'
        localStorage.setItem('tipoPlan', tipoPlan.value)
    }
    return {
        nombreUsuario, autenticado, tipoPlan, nombreBienvenida, esPremium, iniciarSesion, cerrarSesion, cambiarPlan
    }
})