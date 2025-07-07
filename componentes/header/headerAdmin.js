function  cargarHeaderAdmin() {
    
    let header = document.createElement('div');
    header.className = "header";

    let img_header = document.createElement('img');
    img_header.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-nqwS5G2tvPr5nXbz9fsC646akdRq0T_8BCLqaQyzqVe7EpuFJafFHY7wgKsyv-lUnU&usqp=CAU";
    img_header.className = "img-header";
    header.appendChild(img_header);

    let title = document.createElement('h1');
    title.textContent = "Asistencia Alumnos SCL";
    header.appendChild(title);


    return header;

}

export {cargarHeaderAdmin}