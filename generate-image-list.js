// Primero importamos los módulos necesarios de Node.js
const fs = require('fs');
const path = require('path');

// Definimos las rutas
const imageDir = path.join(__dirname, 'src/assets/gallery');
const outputFile = path.join(__dirname, 'src/assets/images-list.json');

console.log('Escaneando directorio:', imageDir);

// Leemos el directorio de imágenes
fs.readdir(imageDir, (err, files) => {
  if (err) {
    console.error('Error al leer el directorio de imágenes:', err);
    return;
  }
  
  // Filtramos para obtener solo archivos de imagen
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
  );
  
  console.log(`Se encontraron ${imageFiles.length} imágenes`);
  
  // Creamos un array de objetos con información adicional
  const imagesData = imageFiles.map((file, index) => {
    // Aquí podemos añadir propiedades adicionales a cada imagen
    return {
      id: index + 1,
      filename: file,
      url: `assets/gallery/${file}`,
      title: file.split('.')[0].replace(/-/g, ' '), // Convertimos nombre-archivo.jpg a "nombre archivo"
      // Asignamos un tamaño aleatorio para el efecto bento
      span: Math.floor(Math.random() * 3) + 1 // 1, 2 o 3
    };
  });
  
  // Guardamos el resultado en un archivo JSON
  fs.writeFileSync(outputFile, JSON.stringify(imagesData, null, 2));
  console.log(`JSON generado en: ${outputFile}`);
});