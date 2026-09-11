const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');


contexto.strokeStyle = '#222';
contexto.lineWidth = 14;
contexto.lineCap = 'round';
contexto.lineJoin = 'round';


contexto.beginPath();
contexto.arc(280, 90, 28, 0, 2 * Math.PI);
contexto.stroke();


contexto.beginPath();
contexto.moveTo(280, 118);   
contexto.lineTo(270, 230);  
contexto.stroke();


contexto.beginPath();
contexto.moveTo(275, 140);  
contexto.lineTo(230, 160);   
contexto.lineTo(300, 200);  
contexto.stroke();


contexto.beginPath();
contexto.moveTo(280, 140);   
contexto.lineTo(320, 155);  
contexto.lineTo(360, 115);    
contexto.stroke();


contexto.beginPath();
contexto.moveTo(270, 230);   
contexto.lineTo(230,250);   
contexto.lineTo(215, 350);   
contexto.stroke();


contexto.beginPath();
contexto.moveTo(270, 230);  
contexto.lineTo(310, 250);     
contexto.lineTo(330, 360);   
contexto.stroke();
