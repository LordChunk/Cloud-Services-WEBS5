FROM node:16  

# Copy shared files
WORKDIR /shared
COPY ./shared /shared
RUN npm i

# Copy project files
WORKDIR /app  
COPY ./challenger /app
RUN npm i

EXPOSE 3000  

CMD ["npm", "start"]
