FROM nginx:1.18
COPY /app/dist/data-management-frontend /usr/share/nginx/html
