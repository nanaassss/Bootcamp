# Imagem base: servidor web leve, ideal para servir arquivos estáticos
FROM nginx:alpine

# Copia os arquivos da aplicação para a pasta padrão do Nginx
COPY index.html style.css script.js /usr/share/nginx/html/

# Porta padrão do Nginx
EXPOSE 80
