const canvas = document.querySelector("#canvas");

const contexto = canvas.getContext("2d");

contexto.beginPath();
contexto.arc(250, 250, 50, 0, Math.PI * 2,true);
contexto.stroke();

contexto.moveTo(10, 0);

contexto.lineTo(50, 200);
contexto.lineTo(200, 230);
contexto.stroke();

contexto.fillRect(50, 50, 150, 100);

contexto.strokeRect(250, 50, 150, 100);

