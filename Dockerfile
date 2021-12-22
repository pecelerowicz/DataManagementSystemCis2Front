FROM node:12.19.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm audit fix
RUN ngcc --properties es2015 browser module main --async false
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/data-management-frontend /usr/share/nginx/html

EXPOSE 81
