import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        services: resolve(__dirname, 'services/index.html'),
        servicesBuilding: resolve(__dirname, 'services/building/index.html'),
        servicesCivil: resolve(__dirname, 'services/civil/index.html'),
        servicesManagement: resolve(__dirname, 'services/management/index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        projectsRepresentative: resolve(__dirname, 'projects/representative/index.html'),
        projectsOngoing: resolve(__dirname, 'projects/ongoing/index.html'),
        projectsMap: resolve(__dirname, 'projects/map/index.html'),
        quality: resolve(__dirname, 'quality/index.html'),
        media: resolve(__dirname, 'media/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        careers: resolve(__dirname, 'careers/index.html'),
        employeeLogin: resolve(__dirname, 'employee-login/index.html'),
        projectDetail: resolve(__dirname, 'projects/detail.html')
      }
    },
    assetsDir: 'assets',
    copyPublicDir: true
  },
  publicDir: 'public'
});


