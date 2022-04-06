FROM node:16  

# Copy shared files
WORKDIR /shared
COPY ./shared /shared
RUN npm i

# Copy project files
WORKDIR /app  
COPY ./auth /app
RUN npm i

EXPOSE 3000  

CMD ["npm", "start"]
