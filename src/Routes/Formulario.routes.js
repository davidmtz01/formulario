import { Router } from 'express';
import { getFormulario, saveFormulario, updateFormulario, deleteFormulario } from '../Controllers/FormularioController.js';

const rutas = Router();
const upload = multer();

router.post('/api/formulario', upload.none(), saveFormulario);

rutas.get('/formulario', getFormulario);
rutas.get('/formulario/:id', getFormulario);
//rutas.post('/formulario', saveFormulario);
rutas.put('/formulario/:id', updateFormulario);
rutas.delete('/formulario/:id', deleteFormulario);

export default rutas;
