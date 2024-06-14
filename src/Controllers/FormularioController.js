import mongoose from 'mongoose';
import multer from 'multer';

// Configura multer para manejar form-data
const upload = multer();

const formularioSchema = new mongoose.Schema({
    nombreCompleto: String,
    direccion: String,
    numeroTelefono: String,
    correoElectronico: String,
    edad: Number,
    estadoCivil: String,
    tipoVivienda: String,
    propietarioInquilino: String,
    tamanoVivienda: String,
    patioJardinSeguro: String,
    numeroPersonas: Number,
    edadesPersonas: String,
    otrosAnimales: String,
    alergiasMascotas: String,
    haTenidoMascotas: String,
    detallesMascotasAnteriores: String,
    cuidadoEntrenamiento: String,
    razonesAdopcion: String,
    expectativasMascota: String
}, { versionKey: false });

const FormularioModel = mongoose.model('Formulario', formularioSchema);

export const getFormulario = async (req, res) => {
    try {
        const formularios = await FormularioModel.find();
        return res.status(200).json({ status: true, data: formularios });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

export const saveFormulario = async (req, res) => {
    try {
        // Imprime el cuerpo de la solicitud para verificar los datos recibidos
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);

        // Extrae los campos del formulario de req.body
        const { 
            nombreCompleto, 
            direccion, 
            numeroTelefono, 
            correoElectronico, 
            edad, 
            estadoCivil, 
            tipoVivienda, 
            propietarioInquilino, 
            tamanoVivienda, 
            patioJardinSeguro, 
            numeroPersonas, 
            edadesPersonas, 
            otrosAnimales, 
            alergiasMascotas, 
            haTenidoMascotas, 
            detallesMascotasAnteriores, 
            cuidadoEntrenamiento, 
            razonesAdopcion, 
            expectativasMascota 
        } = req.body;

        // Verifica si todos los campos se recibieron correctamente
        console.log({
            nombreCompleto, 
            direccion, 
            numeroTelefono, 
            correoElectronico, 
            edad, 
            estadoCivil, 
            tipoVivienda, 
            propietarioInquilino, 
            tamanoVivienda, 
            patioJardinSeguro, 
            numeroPersonas, 
            edadesPersonas, 
            otrosAnimales, 
            alergiasMascotas, 
            haTenidoMascotas, 
            detallesMascotasAnteriores, 
            cuidadoEntrenamiento, 
            razonesAdopcion, 
            expectativasMascota 
        });

        // Crea un nuevo objeto con los datos del formulario
        const nuevoFormulario = new FormularioModel({
            nombreCompleto,
            direccion,
            numeroTelefono,
            correoElectronico,
            edad,
            estadoCivil,
            tipoVivienda,
            propietarioInquilino,
            tamanoVivienda,
            patioJardinSeguro,
            numeroPersonas,
            edadesPersonas,
            otrosAnimales,
            alergiasMascotas,
            haTenidoMascotas,
            detallesMascotasAnteriores,
            cuidadoEntrenamiento,
            razonesAdopcion,
            expectativasMascota
        });

        // Imprime el nuevo objeto para verificar los datos antes de guardarlos
        console.log('Nuevo formulario:', nuevoFormulario);

        // Guarda el formulario en la base de datos
        await nuevoFormulario.save();

        // Responde con un mensaje de éxito
        return res.status(200).json({ status: true, message: 'Datos guardados exitosamente' });
    } catch (error) {
        // Maneja cualquier error y responde con un mensaje de error
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};


export const updateFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCompleto, direccion, numeroTelefono, correoElectronico, edad, estadoCivil, tipoVivienda, propietarioInquilino, tamanoVivienda, patioJardinSeguro, numeroPersonas, edadesPersonas, otrosAnimales, alergiasMascotas, haTenidoMascotas, detallesMascotasAnteriores, cuidadoEntrenamiento, razonesAdopcion, expectativasMascota } = req.body;

        const formulario = await FormularioModel.findByIdAndUpdate(id, {
            nombreCompleto,
            direccion,
            numeroTelefono,
            correoElectronico,
            edad,
            estadoCivil,
            tipoVivienda,
            propietarioInquilino,
            tamanoVivienda,
            patioJardinSeguro,
            numeroPersonas,
            edadesPersonas,
            otrosAnimales,
            alergiasMascotas,
            haTenidoMascotas,
            detallesMascotasAnteriores,
            cuidadoEntrenamiento,
            razonesAdopcion,
            expectativasMascota
        });
        
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos actualizados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};


export const deleteFormulario = async (req, res) => {
    try {
        const { id } = req.params;

        const formulario = await FormularioModel.findByIdAndDelete(id);
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos eliminados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};



const validar = (formData) => {
    const errors = [];
    if (!formData.nombreCompleto) {
        errors.push('El nombre completo es requerido');
    }
    // Validar otros campos según sea necesario
    return errors;
};
