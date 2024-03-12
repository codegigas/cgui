import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
    console.log(`Vite configuration prepared for mode: ${mode}`);
    
    return {
        build: {
            outDir: resolve(__dirname, "build")
        },
        css: {
            devSourcemap: true
        },
        envDir: resolve(__dirname, "./src/environments"),
        plugins: [react()],
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src"),
                "@core": resolve(__dirname, "./src/app/core"),
                "@modules": resolve(__dirname, "./src/app/modules"),
                "@shared": resolve(__dirname, "./src/app/shared")
            }
        },
        root: resolve(__dirname, ""),
        server: {
            port: 3000
        }
    }
});