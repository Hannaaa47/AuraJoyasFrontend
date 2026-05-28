import LandingView from '@/modules/public/submodules/home/views/LandingView.vue';
import CatalogoView from '@/modules/public/submodules/catalogo/views/Catalogo.vue';
import AccountView from '@/modules/public/submodules/profiles/views/AccountView.vue';
import RecordsView from '@/modules/public/views/RecordsView.vue';

const PublicRoutes = [
    {path: '/', name: 'home', component: LandingView},
    {path: '/perfil', name: 'perfil', component: AccountView},
    {path: '/catalogo', name: 'catalogo', component: CatalogoView},
    {path: '/registros', name: 'registros', component: RecordsView},
]

export default PublicRoutes