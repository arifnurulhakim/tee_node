# Menggunakan base image Node.js
FROM node:18

# Set working directory di dalam kontainer
WORKDIR /usr/src/app

# Menyalin dependency package.json ke dalam kontainer
COPY package*.json ./

# RUN npm update bcrypt

# RUN rm -rf node_modules
RUN npm install

# Menginstall dependency


# Menyalin seluruh file proyek ke dalam kontainer
COPY . .

# Menjalankan aplikasi pada port yang ditentukan
EXPOSE 3000

# Menjalankan perintah untuk menjalankan aplikasi saat kontainer dijalankan
CMD [ "node", "index.js" ]

# Batasi penggunaan memori kontainer menjadi 1GB
# CMD ["--memory=1g", "node", "app.js"]

# docker build -t templete_node:tag .

# docker run -p 3000:3000 -m 1g -d templete_node:tag
# docker run -p 3000:3000 templete_node
