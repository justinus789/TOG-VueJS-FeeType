/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import SignOutIcon from '@/Icon/SignOut.vue'
import ChangePasswordIcon from '@/Icon/ChangePasswordIcon.vue'
import MasterDataManagementIcon from '@/Icon/MasterDataManagementIcon.vue'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    aliases: {
      changePassword: ChangePasswordIcon,
      signOut: SignOutIcon,
      masterDataManagement: MasterDataManagementIcon,
    },
  },
})
