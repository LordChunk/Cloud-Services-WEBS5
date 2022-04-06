FROM node:16  

# Copy shared files
# COPY ./shared /shared
# WORKDIR /shared
# RUN npm i

# Copy project files
WORKDIR /app  
COPY . .  
RUN npm install

EXPOSE 3000  

CMD ["npm", "start"]
